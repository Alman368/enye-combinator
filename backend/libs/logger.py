import hashlib
import json
import logging
import os
from logging.handlers import RotatingFileHandler, SMTPHandler
from pathlib import Path
from typing import Optional


class HashChainHandler(logging.Handler):
    """
    A logging handler that creates a tamper-evident hash chain.
    Each log entry includes a hash of the previous log entry.
    """

    def __init__(self, log_dir: str = "logs", chain_file: str = "hash_chain.json"):
        super().__init__()
        self.log_dir = Path(log_dir)
        self.log_dir.mkdir(exist_ok=True)
        self.chain_file = self.log_dir / chain_file
        self.previous_hash: Optional[str] = None
        self.chain_index = 0
        self._load_chain_state()

    def _load_chain_state(self):
        """Load the last hash from the chain file if it exists."""
        if self.chain_file.exists():
            try:
                with open(self.chain_file, 'r') as f:
                    data = json.load(f)
                    self.previous_hash = data.get('last_hash')
                    self.chain_index = data.get('index', 0)
            except (json.JSONDecodeError, IOError):
                # If file is corrupted, start fresh
                self.previous_hash = None
                self.chain_index = 0

    def _save_chain_state(self, current_hash: str):
        """Save the current hash to the chain file."""
        try:
            with open(self.chain_file, 'w') as f:
                json.dump({
                    'last_hash': current_hash,
                    'index': self.chain_index
                }, f)
        except IOError:
            pass  # Silent fail, but log will still be created

    def _calculate_hash(self, log_entry: str, previous_hash: Optional[str]) -> str:
        """Calculate SHA-256 hash of the log entry combined with previous hash."""
        hash_input = f"{previous_hash or 'GENESIS'}|{log_entry}|{self.chain_index}"
        return hashlib.sha256(hash_input.encode('utf-8')).hexdigest()

    def emit(self, record):
        """Emit a log record with hash chain."""
        try:
            # Format the original log message
            log_entry = self.format(record)

            # Calculate hash for this entry
            current_hash = self._calculate_hash(log_entry, self.previous_hash)

            # Create the hash chain entry
            hash_chain_entry = {
                'index': self.chain_index,
                'timestamp': record.created,
                'level': record.levelname,
                'message': record.getMessage(),
                'previous_hash': self.previous_hash or 'GENESIS',
                'current_hash': current_hash
            }

            # Write to hash chain log file
            chain_log_file = self.log_dir / 'hash_chain.log'
            with open(chain_log_file, 'a') as f:
                f.write(json.dumps(hash_chain_entry) + '\n')

            # Update state
            self.previous_hash = current_hash
            self.chain_index += 1
            self._save_chain_state(current_hash)

        except Exception:
            self.handleError(record)

    def verify_chain(self, chain_log_path: Optional[str] = None) -> tuple[bool, list[str]]:
        """
        Verify the integrity of the hash chain.
        Returns (is_valid, errors_list)
        """
        if chain_log_path is None:
            chain_log_path = self.log_dir / 'hash_chain.log'

        errors = []
        previous_hash = None

        try:
            with open(chain_log_path, 'r') as f:
                for line_num, line in enumerate(f, 1):
                    try:
                        entry = json.loads(line.strip())

                        # Check if previous hash matches
                        expected_prev = previous_hash or 'GENESIS'
                        if entry['previous_hash'] != expected_prev:
                            errors.append(
                                f"Line {line_num}: Hash chain broken! "
                                f"Expected previous hash: {expected_prev}, "
                                f"Got: {entry['previous_hash']}"
                            )

                        # Recalculate hash to verify integrity
                        hash_input = f"{entry['previous_hash']}|{entry['message']}|{entry['index']}"
                        recalculated_hash = hashlib.sha256(hash_input.encode('utf-8')).hexdigest()

                        if recalculated_hash != entry['current_hash']:
                            errors.append(
                                f"Line {line_num}: Log entry tampered! "
                                f"Hash mismatch at index {entry['index']}"
                            )

                        previous_hash = entry['current_hash']

                    except json.JSONDecodeError:
                        errors.append(f"Line {line_num}: Invalid JSON")

            return (len(errors) == 0, errors)

        except FileNotFoundError:
            return (True, ["No hash chain log file found"])


class ColoredFormatter(logging.Formatter):
    COLORS = {
        logging.DEBUG: "\033[34m",     # blue
        logging.INFO: "\033[32m",      # green
        logging.WARNING: "\033[33m",   # yellow
        logging.ERROR: "\033[31m",     # red
        logging.CRITICAL: "\033[35m",  # magenta
    }

    RESET = "\033[0m"

    def format(self, record):
        color = self.COLORS.get(record.levelno, self.RESET)
        # Format the message using the parent formatter
        message = super().format(record)
        # Apply color to each line of the message
        colored_lines = [f"{color}{line}{self.RESET}" for line in message.splitlines()]
        return "\n".join(colored_lines)


def setup_logger(log_name: str = "app") -> logging.Logger:
    logger = logging.getLogger(log_name)

    file_formatter = logging.Formatter(
        fmt="[%(asctime)s] [%(levelname)s] %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    )

    file_handler = RotatingFileHandler(
        f"logs/{log_name}.log", maxBytes=10 * 1024 * 1024, backupCount=3
    )
    file_handler.setFormatter(file_formatter)

    colored_formatter = ColoredFormatter("[%(asctime)s] [%(levelname)s] %(message)s")

    console_handler = logging.StreamHandler()
    console_handler.setFormatter(colored_formatter)

    # Add hash chain handler for tamper-evident logging
    hash_chain_handler = HashChainHandler(log_dir="logs")
    hash_chain_handler.setFormatter(file_formatter)

    logger.setLevel(logging.DEBUG)
    logger.addHandler(file_handler)
    logger.addHandler(console_handler)
    logger.addHandler(hash_chain_handler)

    # ---------------- SMTP for critical logs in production ---------------- #
    class CustomSubjectSMTPHandler(SMTPHandler):
        def getSubject(self, record):
            msg = str(record.getMessage())
            short_msg = msg[:30] + ("..." if len(msg) > 30 else "")
            return f"{record.levelname}: {short_msg}"

    log_emails = os.environ.get('LOG_EMAILS', 'false').lower() == 'true'
    if log_emails:
        GMAIL_USER = os.environ.get('LOGGER_GMAIL_USER')
        GMAIL_PASSWORD = os.environ.get('LOGGER_GMAIL_PASSWORD')
        recipients = []
        if os.environ.get('EMAIL_RECIPIENTS'):
            recipients = os.environ.get('EMAIL_RECIPIENTS').split(',')

        mail_handler = CustomSubjectSMTPHandler(
            mailhost=('smtp.gmail.com', 587),
            fromaddr=GMAIL_USER,
            toaddrs=recipients,
            subject="This will be overridden",
            credentials=(GMAIL_USER, GMAIL_PASSWORD),
            secure=()
        )
        mail_handler.setLevel(logging.ERROR)
        mail_formatter = logging.Formatter(
            fmt="[%(asctime)s]\n\n[%(levelname)s]\n\n%(message)s",
            datefmt="%Y-%m-%d %H:%M:%S",
        )
        mail_handler.setFormatter(mail_formatter)
        logger.addHandler(mail_handler)

    logger.propagate = False

    return logger


def get_logger() -> logging.Logger:
    return logging.getLogger("app")


def verify_log_chain(log_dir: str = "logs") -> tuple[bool, list[str]]:
    """
    Verify the integrity of the log hash chain.

    Args:
        log_dir: Directory containing the hash chain logs

    Returns:
        Tuple of (is_valid, errors_list)
        - is_valid: True if chain is intact, False if tampered
        - errors_list: List of error messages if any issues found

    Example:
        >>> is_valid, errors = verify_log_chain()
        >>> if is_valid:
        >>>     print("Log chain is intact!")
        >>> else:
        >>>     for error in errors:
        >>>         print(error)
    """
    handler = HashChainHandler(log_dir=log_dir)
    return handler.verify_chain()

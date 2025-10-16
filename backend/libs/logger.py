import logging
import os
from logging.handlers import RotatingFileHandler, SMTPHandler


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

    logger.setLevel(logging.DEBUG)
    logger.addHandler(file_handler)
    logger.addHandler(console_handler)

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

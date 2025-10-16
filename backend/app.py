import os

from flask import Flask, jsonify
from flask_cors import CORS
from libs.logger import setup_logger, verify_log_chain

app = Flask(__name__)
CORS(app)
logger = setup_logger('combinator-backend')
logger.info('Flask application started with hash chain logging enabled')


@app.route('/health', methods=['GET'])
def health():
    return {
        'status': 'healthy',
        'service': 'combinator-backend'
    }


@app.route('/', methods=['GET'])
def index():
    return {
        'message': 'Welcome to Combinator API',
        'domain': os.getenv('DNS_DOMAIN', 'Not set')
    }


@app.route('/verify-logs', methods=['GET'])
def verify_logs():
    """
    Verify the integrity of the log hash chain.
    Returns whether the logs are intact or have been tampered with.
    """
    logger.info('Log chain verification requested')
    is_valid, errors = verify_log_chain()

    return jsonify({
        'valid': is_valid,
        'message': 'Log chain is intact' if is_valid else 'Log chain has been tampered with',
        'errors': errors if not is_valid else [],
        'timestamp': __import__('datetime').datetime.now().isoformat()
    }), 200 if is_valid else 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

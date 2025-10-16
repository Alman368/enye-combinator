import os

from flask import Flask
from flask_cors import CORS
from libs.logger import get_logger

app = Flask(__name__)
CORS(app)
logger = get_logger()


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


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

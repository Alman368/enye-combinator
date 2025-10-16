from flask import Flask, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy',
        'service': 'combinator-backend'
    }), 200

@app.route('/', methods=['GET'])
def index():
    return jsonify({
        'message': 'Welcome to Combinator API',
        'domain': os.getenv('DNS_DOMAIN', 'Not set')
    }), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)


#!/usr/bin/env python3

from flask import Flask, jsonify
from flask_cors import CORS
import os
import logging

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.route("/")
def hello():
    logger.info("Root endpoint accessed")
    return jsonify({"message": "Hello, World!"})

if __name__ == "__main__":
    host = os.getenv("FLASK_RUN_HOST", "0.0.0.0")
    port = int(os.getenv("FLASK_RUN_PORT", 5000))
    app.run(host=host, port=port, debug=True)

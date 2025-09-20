from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import sys

# Add the project root to Python path
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, project_root)

from legal_backend.agent.legal_agent import process_query

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": ["http://localhost:3000"]}})

@app.route("/api/query", methods=["POST"])
def query():
    try:
        data = request.get_json()
        if not data or "query" not in data:
            return jsonify({"error": "Missing 'query' field"}), 400

        user_query = data["query"]
        result = process_query(user_query)

        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/contact", methods=["POST"])
def contact():
    try:
        data = request.get_json()
        required_fields = ["name", "email", "inquiryType", "message"]
        
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400

        # Here you would typically send an email or store in database
        # For now, we'll just return success
        return jsonify({
            "success": True,
            "message": "Contact form submitted successfully"
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    # Run API server
    app.run(host="0.0.0.0", port=5000, debug=True)

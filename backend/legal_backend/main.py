from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import sys
import tempfile

# Add the project root to Python path
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, project_root)

from legal_backend.agent.legal_agent import process_query
from legal_backend.utils.input_router import input_router

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": ["http://localhost:3000"]}})

UPLOAD_FOLDER = os.path.join(project_root, 'uploads')
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

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

@app.route("/api/upload", methods=["POST"])
def upload_file():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file part"}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400

        if file:
            # Create a temporary file to store the uploaded content
            with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.filename)[1]) as tmp_file:
                file.save(tmp_file.name)
                
                # Process the file using input_router
                result = input_router(tmp_file.name)
                
                # Clean up the temporary file
                os.unlink(tmp_file.name)
                
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

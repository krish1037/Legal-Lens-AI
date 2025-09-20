import os
import sys

# Add the current directory to Python path
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, current_dir)

from legal_backend.main import app

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
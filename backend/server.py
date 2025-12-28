"""
Luxora Environmental - Python Image Server
This server can work standalone or forward images to the Node.js backend.
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend access

# Configuration
PHOTOS_DIR = "photos"
NODEJS_BACKEND_URL = os.getenv("NODEJS_BACKEND_URL", "http://localhost:4000")
FORWARD_TO_NODEJS = os.getenv("FORWARD_TO_NODEJS", "true").lower() == "true"

# Create folder if not exists
if not os.path.exists(PHOTOS_DIR):
    os.makedirs(PHOTOS_DIR)
    print(f"✅ Created photos directory: {PHOTOS_DIR}")

# Store last image in memory for quick access
last_image = None
last_image_filename = None


@app.route("/upload", methods=["POST"])
def upload_image():
    """Upload image from ESP32 camera"""
    global last_image, last_image_filename

    try:
        # Get raw binary data from ESP32
        img_bytes = request.data
        
        if not img_bytes or len(img_bytes) == 0:
            return jsonify({"status": "ERROR", "error": "No image data provided"}), 400

        # Save to folder with timestamp
        filename = f"photo_{datetime.now().strftime('%Y%m%d_%H%M%S')}.jpg"
        filepath = os.path.join(PHOTOS_DIR, filename)

        # Save locally
        with open(filepath, "wb") as f:
            f.write(img_bytes)
        
        # Store in memory
        last_image = img_bytes
        last_image_filename = filename

        print(f"✅ Image saved locally: {filepath} ({len(img_bytes)} bytes)")

        # Forward to Node.js backend if enabled
        if FORWARD_TO_NODEJS:
            try:
                nodejs_url = f"{NODEJS_BACKEND_URL}/api/images/upload"
                response = requests.post(
                    nodejs_url,
                    data=img_bytes,
                    headers={"Content-Type": "image/jpeg"},
                    timeout=5
                )
                if response.status_code == 200:
                    print(f"✅ Image forwarded to Node.js backend: {nodejs_url}")
                else:
                    print(f"⚠️  Node.js backend returned status {response.status_code}")
            except requests.exceptions.RequestException as e:
                print(f"⚠️  Failed to forward to Node.js backend: {e}")
                print("   Image saved locally only")

        return jsonify({
            "status": "OK",
            "file": filename,
            "size": len(img_bytes),
            "forwarded": FORWARD_TO_NODEJS
        })
    
    except Exception as e:
        print(f"❌ Upload error: {e}")
        return jsonify({"status": "ERROR", "error": str(e)}), 500


@app.route("/last", methods=["GET"])
def get_last_image():
    """Get the latest uploaded image"""
    if last_image is None:
        return jsonify({"error": "No image yet"}), 404
    
    return last_image, 200, {"Content-Type": "image/jpeg"}


@app.route("/health", methods=["GET"])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "OK",
        "service": "Python Image Server",
        "photos_dir": PHOTOS_DIR,
        "nodejs_forwarding": FORWARD_TO_NODEJS,
        "nodejs_url": NODEJS_BACKEND_URL if FORWARD_TO_NODEJS else None
    })


@app.route("/images", methods=["GET"])
def list_images():
    """List all uploaded images (compatible with Node.js API)"""
    try:
        if not os.path.exists(PHOTOS_DIR):
            return jsonify({"images": [], "count": 0})
        
        files = [f for f in os.listdir(PHOTOS_DIR) 
                if f.lower().endswith(('.jpg', '.jpeg'))]
        
        image_files = [
            {
                "filename": file,
                "url": f"/images/{file}",
                "uploadedAt": file.replace("photo_", "").replace(".jpg", "")
            }
            for file in sorted(files, reverse=True)  # Newest first
        ]
        
        return jsonify({
            "images": image_files,
            "count": len(image_files)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/images/<filename>", methods=["GET"])
def get_image(filename):
    """Get specific image by filename"""
    # Security: prevent directory traversal
    if ".." in filename or "/" in filename or "\\" in filename:
        return jsonify({"error": "Invalid filename"}), 400
    
    filepath = os.path.join(PHOTOS_DIR, filename)
    
    if not os.path.exists(filepath):
        return jsonify({"error": "Image not found"}), 404
    
    try:
        with open(filepath, "rb") as f:
            image_data = f.read()
        return image_data, 200, {"Content-Type": "image/jpeg"}
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    print("\n" + "="*50)
    print("🚀 Luxora Environmental - Python Image Server")
    print("="*50)
    print(f"📁 Photos directory: {PHOTOS_DIR}")
    print(f"🔄 Forwarding to Node.js: {FORWARD_TO_NODEJS}")
    if FORWARD_TO_NODEJS:
        print(f"🔗 Node.js URL: {NODEJS_BACKEND_URL}")
    print(f"🌐 Server running on http://0.0.0.0:5000")
    print("="*50 + "\n")
    
    app.run(host="0.0.0.0", port=5000, debug=True)

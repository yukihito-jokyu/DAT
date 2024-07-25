import os
import shutil
from flask import request, jsonify

from read_CSV import read

from flask_cors import CORS
import google.generativeai as genai

from dotenv import load_dotenv

# 環境変数を読み込む
load_dotenv()

# APIキーを設定
GENAI_API_KEY = os.getenv('GENAI_API_KEY')
genai.configure(api_key=GENAI_API_KEY)
model = genai.GenerativeModel('gemini-pro')

def setup_routes(app):
    @app.route('/', methods=['GET'])
    def index():
        return {'message': True}

    @app.route('/upload', methods=['POST'])
    def upload_file():
        UPLOAD_FOLDER = './uploads'
        if not os.path.exists(UPLOAD_FOLDER):
            os.makedirs(UPLOAD_FOLDER)
        
        if 'file' not in request.files:
            return jsonify({"error": "No file part"}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400
        
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(file_path)
        return jsonify({"message": f"File {file.filename} uploaded successfully"}), 200

    @app.route('/clear-uploads', methods=['POST'])
    def clear_uploads():
        UPLOAD_FOLDER = './uploads'
        if os.path.exists(UPLOAD_FOLDER):
            shutil.rmtree(UPLOAD_FOLDER)
        os.makedirs(UPLOAD_FOLDER)
        return jsonify({"message": "Uploads directory cleared"}), 200

    @app.route('/read-csv', methods=['GET'])
    def read_csv():
        read()
        return jsonify({"message": "read csv"}), 200
            
    @app.route('/api/chat', methods=['POST'])
    def chat():
        data = request.json
        message = data.get('message')
        if not message:
            return jsonify({'reply': 'メッセージが空です。'}), 400
        try:
            reply = model.generate_content(message)
            return jsonify({'reply': reply.text})
        except Exception as e:
            return jsonify({'reply': f'エラーが発生しました: {str(e)}'}), 500

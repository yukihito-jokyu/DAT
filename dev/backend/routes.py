import os
import shutil
from flask import request, jsonify, send_file
from data_plt import *

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
    

    @app.route('/get_quantitative', methods=['POST'])
    def get_quantitative():
        quantitative_list = read_quantitative()
        print(quantitative_list)
        return jsonify({'quantitative_variables': quantitative_list})
    
    @app.route('/get_qualitative', methods=['GET'])
    def get_qualitative():
        qualitative_list = read_qualitative()
        return jsonify({'qualitative_variables': qualitative_list})


    @app.route('/scatter', methods=['POST'])
    def make_scatter():
        data = request.get_json()
        print('data', data)
        image_data = plot_scatter(data)
        return jsonify({'image_data': image_data})
    
    @app.route('/hist', methods=['POST'])
    def make_hist():
        data = request.get_json()
        print('data', data)
        image_data = plot_hist(data)
        return jsonify({'image_data': image_data})
    
    @app.route('/box', methods=['POST'])
    def make_box():
        data = request.get_json()
        print('data', data)
        image_data = plot_box(data)
        return jsonify({'image_data': image_data})
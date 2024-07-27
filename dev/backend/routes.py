import os
import shutil
from flask import request, jsonify, send_file
from data_plt import *
from data_utils import get_data_info, get_miss_columns, change_umeric_to_categorical, make_pie, make_feature_value, feature_value_analysis, impute_numeric, impute_categorical

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

    
    # 質的変数のカラムをリストで取得
    @app.route('/get_quantitative', methods=['POST'])
    def get_quantitative():
        quantitative_list = read_quantitative()
        print(quantitative_list)
        return jsonify({'quantitative_variables': quantitative_list})
    
    # 量的変数のカラムをリストで取得
    @app.route('/get_qualitative', methods=['GET'])
    def get_qualitative():
        qualitative_list = read_qualitative()
        return jsonify({'qualitative_variables': qualitative_list})

    # 散布図
    @app.route('/scatter', methods=['POST'])
    def make_scatter():
        data = request.get_json()
        print('data', data)
        image_data = plot_scatter(data)
        return jsonify({'image_data': image_data})
    
    # ヒストグラム
    @app.route('/hist', methods=['POST'])
    def make_hist():
        data = request.get_json()
        print('data', data)
        image_data = plot_hist(data)
        return jsonify({'image_data': image_data})
    
    # 箱ひげ図
    @app.route('/box', methods=['POST'])
    def make_box():
        data = request.get_json()
        print('data', data)
        image_data = plot_box(data)
        return jsonify({'image_data': image_data})
    
    # データの基本情報の取得
    @app.route('/get_data_info', methods=['GET'])
    def get_data():
        send_data = get_data_info()
        return jsonify(send_data)
    
    # 欠損値があるカラムを取得
    @app.route('/get_miss_columns', methods=['GET'])
    def get_miss():
        send_data = get_miss_columns()
        return jsonify(send_data)
    
    # カテゴリカルデータへ変換
    @app.route('/change_numeric_to_categorical', methods=['POST'])
    def change_to_categorical():
        data = request.get_json()
        change_umeric_to_categorical(data)
        return jsonify({'message': 'change successfully'})
    
    # 円グラフの取得
    @app.route('/get_pie', methods=['POST'])
    def get_pie():
        data = request.get_json()
        image_data = make_pie(data)
        return jsonify({'image_data': image_data})

    # CSVファイルの読み込み
    @app.route('/read-csv', methods=['GET'])
    def read_csv():
        read()
        return jsonify({"message": "read csv"}), 200
    
    # チャット機能
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


    # 特徴量の作成
    @app.route('/make_feature', methods=['POST'])
    def make_feature():
        data = request.get_json()
        make_feature_value(data)
        return jsonify({'message': 'make successfully'})
    
    # 特定の特徴量についての分析
    @app.route('/feature_analysis', methods=['POST'])
    def feature_analysis():
        data = request.get_json()
        image_data = feature_value_analysis(data)
        return jsonify({'image_data': image_data})
    
    # 数値データの欠損値の補完
    @app.route('/complement/numeric', methods=['POST'])
    def complement_numeric():
        data = request.get_json()
        column = data['column_name']
        methods = data['complementary_methods']
        impute_numeric(column, methods)
        return jsonify({'message': 'complement numeric successfully'})

    # カテゴリカルデータの欠損値の補完
    @app.route('/complement/categorical', methods=['POST'])
    def complement_categorical():
        data = request.get_json()
        column = data['column_name']
        methods = data['complementary_methods']
        impute_categorical(column, methods)
        return jsonify({'message': 'complement categorical successfully'})
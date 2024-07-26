import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
import io
import seaborn as sns
import base64
import matplotlib
matplotlib.use('Agg')

def format_value(value):
    if isinstance(value, float):
        if abs(value) >= 10:
            return int(value)
        return round(value, 3)
    return value

def convert_to_serializable(obj):
    if isinstance(obj, (np.integer, np.floating)):
        return format_value(obj.item())
    elif isinstance(obj, (np.ndarray, pd.Series)):
        return obj.tolist()
    elif pd.isna(obj):
        return None
    return obj


def get_df():
    return pd.read_csv('./uploads/demo.csv')

def entropy(series):
    value_counts = series.value_counts(normalize=True)
    return -(value_counts * np.log2(value_counts)).sum()

# データの詳細情報の取得
def get_data_info():
    df = get_df()
    qualitative_list = []
    quantitative_list = []

    for col in df.columns:
        common_info = {
            'データ型': str(df[col].dtype),
            'ユニークな値の数': convert_to_serializable(df[col].nunique()),
            '欠損値の数': convert_to_serializable(df[col].isnull().sum()),
            '欠損値の割合': format_value(convert_to_serializable(df[col].isnull().sum() / len(df)))
        }

        if df[col].dtype == 'int64' or df[col].dtype == 'float64':
            quantitative_info = {
                '平均値': format_value(convert_to_serializable(df[col].mean())),
                '中央値': format_value(convert_to_serializable(df[col].median())),
                '標準偏差': format_value(convert_to_serializable(df[col].std())),
                '最小値': format_value(convert_to_serializable(df[col].min())),
                '最大値': format_value(convert_to_serializable(df[col].max())),
                '第1四分位数': format_value(convert_to_serializable(df[col].quantile(0.25))),
                '第3四分位数': format_value(convert_to_serializable(df[col].quantile(0.75))),
                '歪度': format_value(convert_to_serializable(df[col].skew())),
                '尖度': format_value(convert_to_serializable(df[col].kurtosis())),
                '変動係数': format_value(convert_to_serializable(df[col].std() / df[col].mean() if df[col].mean() != 0 else np.nan))
            }
            quantitative_list.append({'column_name': col, 'common': common_info, 'data': quantitative_info})
        else:
            qualitative_info = {
                '最頻値': convert_to_serializable(df[col].mode().iloc[0] if not df[col].mode().empty else np.nan),
                '最頻値の出現回数': convert_to_serializable(df[col].value_counts().iloc[0] if not df[col].value_counts().empty else np.nan),
                '最頻値の割合': format_value(convert_to_serializable(df[col].value_counts().iloc[0] / len(df) if not df[col].value_counts().empty else np.nan)),
                'カテゴリ数': convert_to_serializable(df[col].nunique()),
                'エントロピー': format_value(convert_to_serializable(entropy(df[col])))
            }
            qualitative_list.append({'column_name': col, 'common': common_info, 'data': qualitative_info})
    
    send_data = {
        "qualitative": qualitative_list,
        "quantitative": quantitative_list
    }

    return send_data


# 欠損値があるカラムを取得
def get_miss_columns():
    df = get_df()
    miss_columns = df.columns[df.isnull().any()].to_list()

    send_data = {
        "column_name": miss_columns
    }

    return send_data


# 数値データからカテゴリカルデータへ変換
def change_umeric_to_categorical(data):
    column = data['column_name']
    df = get_df()
    df[column] = df[column].astype(str)
    df.to_csv('./uploads/demo.csv', index=False)


# 円グラフの可視化
def make_pie(data):
    # 初期化
    plt.clf()
    column = data['column_name']
    df = get_df()
    value_counts = df[column].value_counts()
    percentages = value_counts / len(df) * 100

    colors = sns.color_palette('pastel', n_colors=len(value_counts))

    # グラフの作成
    fig, (ax1, ax2) = plt.subplots(1, 2, gridspec_kw={'width_ratios': [3, 1]})

    # 円グラフの描画
    ax1.pie(value_counts.values, labels=value_counts.index, colors=colors, startangle=90)
    ax1.axis('equal')  # 円を真円に
    
    # パーセンテージの表示
    ax2.axis('off')
    for i, (index, percentage) in enumerate(percentages.items()):
        ax2.text(0, 1-i*0.1, f'{index}: {percentage:.1f}%', fontsize=10, 
                  verticalalignment='top')
        
    # タイトルの表示
    title = f'Distribution of {column}'
    fig.suptitle(title, fontsize=16)
    plt.tight_layout()
    # バイナリデータにエンコード
    buf = io.BytesIO()
    plt.savefig(buf,format="png")
    buf.seek(0)
    plot_url = base64.b64encode(buf.getvalue()).decode()
    return plot_url

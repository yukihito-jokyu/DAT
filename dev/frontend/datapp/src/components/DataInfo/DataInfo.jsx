import React, { useEffect, useState } from 'react';
import TableComponent from './TableComponet';

function DataInfo() {
    const [data, setData] = useState({ qualitative: [], quantitative: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/get_data_info');
                if (!response.ok) {
                    throw new Error('データの取得に失敗しました');
                }
                const result = await response.json();
                setData(result);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>ロード中...</div>;
    }

    if (error) {
        return <div>エラー: {error}</div>;
    }

    return (
        <div>
            <TableComponent title="質的データ" data={data.qualitative} />
            <TableComponent title="量的データ" data={data.quantitative} />
        </div>
    );
}

export default DataInfo;

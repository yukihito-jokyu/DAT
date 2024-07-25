import React, { useEffect, useState } from 'react';

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
            <h2>質的データ</h2>
            <table>
                <thead>
                    <tr>
                        {data.qualitative.length > 0 && Object.keys(data.qualitative[0]).map((key, idx) => (
                            <th key={idx}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.qualitative.map((row, idx) => (
                        <tr key={idx}>
                            {Object.values(row).map((value, idx2) => (
                                <td key={idx2}>{value}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>量的データ</h2>
            <table>
                <thead>
                    <tr>
                        {data.quantitative.length > 0 && Object.keys(data.quantitative[0]).map((key, idx) => (
                            <th key={idx}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.quantitative.map((row, idx) => (
                        <tr key={idx}>
                            {Object.values(row).map((value, idx2) => (
                                <td key={idx2}>{value}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DataInfo;

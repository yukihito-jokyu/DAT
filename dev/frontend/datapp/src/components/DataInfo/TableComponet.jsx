import React from 'react';

function TableComponent({ title, data }) {
    if (data.length === 0) {
        return null;
    }

    const commonKeys = Object.keys(data[0].common);
    const specificKeys = Object.keys(data[0].data);

    return (
        <div>
            <h2>{title}</h2>
            <table>
                <thead>
                    <tr>
                        <th>カラム名</th>
                        {commonKeys.map((key, idx) => (
                            <th key={idx}>{key}</th>
                        ))}
                        {specificKeys.map((key, idx) => (
                            <th key={idx}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, idx) => (
                        <tr key={idx}>
                            <td>{row.column_name}</td>
                            {commonKeys.map((key, idx2) => (
                                <td key={idx2}>{row.common[key]}</td>
                            ))}
                            {specificKeys.map((key, idx2) => (
                                <td key={idx2}>{row.data[key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableComponent;

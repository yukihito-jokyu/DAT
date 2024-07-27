import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography, Grid } from '@mui/material';
import TableComponent from './TableComponent';

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
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Typography color="error">エラー: {error}</Typography>
            </Box>
        );
    }

    return (
        <Box p={3}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TableComponent title="質的データ" data={data.qualitative} />
                </Grid>
                <Grid item xs={12}>
                    <TableComponent title="量的データ" data={data.quantitative} />
                </Grid>
            </Grid>
        </Box>
    );
}

export default DataInfo;

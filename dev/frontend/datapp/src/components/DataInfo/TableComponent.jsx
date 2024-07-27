import React from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function TableComponent({ title, data }) {
    if (data.length === 0) {
        return null;
    }

    const commonKeys = Object.keys(data[0].common);
    const specificKeys = Object.keys(data[0].data);

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {title}
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>カラム名</TableCell>
                                {commonKeys.map((key, idx) => (
                                    <TableCell key={idx} align="right">{key}</TableCell>
                                ))}
                                {specificKeys.map((key, idx) => (
                                    <TableCell key={idx} align="right">{key}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>{row.column_name}</TableCell>
                                    {commonKeys.map((key, idx2) => (
                                        <TableCell key={idx2} align="right">{row.common[key]}</TableCell>
                                    ))}
                                    {specificKeys.map((key, idx2) => (
                                        <TableCell key={idx2} align="right">{row.data[key]}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
}

export default TableComponent;

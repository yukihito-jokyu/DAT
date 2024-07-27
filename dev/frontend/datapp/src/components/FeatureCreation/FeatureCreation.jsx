import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Typography, Select, MenuItem, TextField, Card, CardContent, Grid } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import Swal from 'sweetalert2';

const FeatureCreation = () => {
    const [quantitativeColumns, setQuantitativeColumns] = useState([]);
    const [currentColumn, setCurrentColumn] = useState('');
    const [currentOperation, setCurrentOperation] = useState('addition');
    const [currentNumber, setCurrentNumber] = useState(0);
    const [formula, setFormula] = useState([]);
    const [newColumnName, setNewColumnName] = useState('');
    const [preview, setPreview] = useState('');

    useEffect(() => {
        const fetchQuantitativeColumns = async () => {
            try {
                const response = await axios.post('http://127.0.0.1:5000/get_quantitative');
                setQuantitativeColumns(response.data.quantitative_variables);
                setCurrentColumn(response.data.quantitative_variables[0]);
            } catch (error) {
                console.error('Failed to fetch quantitative columns:', error);
            }
        };

        fetchQuantitativeColumns();
    }, []);

    useEffect(() => {
        const operatorMap = {
            addition: '+',
            subtraction: '-',
            multiplication: '*',
            division: '/'
        };

        const formulaPreview = formula.map(item => {
            if (item.type === 'operation') {
                return operatorMap[item.value];
            }
            return item.value;
        }).join(' ');

        setPreview(formulaPreview);
    }, [formula]);

    const handleAddColumn = () => {
        if (formula.length === 0 || formula[formula.length - 1].type === 'operation') {
            setFormula([...formula, { type: 'column', value: currentColumn }]);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'エラー',
                text: '演算子を追加してください',
            });
        }
    };

    const handleAddOperation = () => {
        if (formula.length > 0 && formula[formula.length - 1].type !== 'operation') {
            if (currentOperation === 'division' && formula[formula.length - 1].value === 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'エラー',
                    text: '0で割ることはできません',
                });
            } else {
                setFormula([...formula, { type: 'operation', value: currentOperation }]);
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'エラー',
                text: '数値またはカラムを追加してください',
            });
        }
    };

    const handleAddNumber = () => {
        if (formula.length === 0 || formula[formula.length - 1].type === 'operation') {
            setFormula([...formula, { type: 'number', value: currentNumber }]);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'エラー',
                text: '演算子を追加してください',
            });
        }
    };

    const handleRemoveLastItem = () => {
        const newFormula = [...formula];
        newFormula.pop();
        setFormula(newFormula);
    };

    const handleSubmit = async () => {
        if (!newColumnName) {
            Swal.fire({
                icon: 'error',
                title: 'エラー',
                text: '新しいカラム名を入力してください',
            });
            return;
        }

        if (formula.length === 0 || formula[formula.length - 1].type === 'operation') {
            Swal.fire({
                icon: 'error',
                title: 'エラー',
                text: '最後に数値またはカラムを追加してください',
            });
            return;
        }

        try {
            await axios.post('http://127.0.0.1:5000/make_feature', {
                formula: formula.map(item => item.value),
                new_column_name: newColumnName
            });
            Swal.fire({
                icon: 'success',
                title: '成功',
                text: '特徴量が作成されました',
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'エラー',
                text: '特徴量の作成に失敗しました',
            });
            console.error('Failed to create feature:', error);
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Card sx={{ width: 600, p: 2 }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>特徴量の作成</Typography>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h5">{preview}</Typography>
                    </Box>
                    <Grid sx={{ mt: 2 }} container spacing={2} alignItems="center">
                        <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                            <Select
                                value={currentColumn}
                                onChange={(e) => setCurrentColumn(e.target.value)}
                                fullWidth
                            >
                                {quantitativeColumns.map((col, idx) => (
                                    <MenuItem key={idx} value={col}>{col}</MenuItem>
                                ))}
                            </Select>
                            <Button
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={handleAddColumn}
                                sx={{ mt: 1 }}
                                fullWidth
                            >
                                カラム追加
                            </Button>
                        </Grid>
                        <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                            <Select
                                value={currentOperation}
                                onChange={(e) => setCurrentOperation(e.target.value)}
                                fullWidth
                            >
                                <MenuItem value="addition">足し算</MenuItem>
                                <MenuItem value="subtraction">引き算</MenuItem>
                                <MenuItem value="multiplication">掛け算</MenuItem>
                                <MenuItem value="division">割り算</MenuItem>
                            </Select>
                            <Button
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={handleAddOperation}
                                sx={{ mt: 1 }}
                                fullWidth
                            >
                                演算追加
                            </Button>
                        </Grid>
                        <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                            <TextField
                                type="number"
                                value={currentNumber}
                                onChange={(e) => setCurrentNumber(Number(e.target.value))}
                                fullWidth
                            />
                            <Button
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={handleAddNumber}
                                sx={{ mt: 1 }}
                                fullWidth
                            >
                                数値追加
                            </Button>
                        </Grid>
                    </Grid>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleRemoveLastItem}
                        sx={{ mt: 2, width: '100%' }}
                    >
                        最後の項目を削除
                    </Button>
                    <Box sx={{ mt: 2 }}>
                        <TextField
                            label="新しいカラム名"
                            value={newColumnName}
                            onChange={(e) => setNewColumnName(e.target.value)}
                            fullWidth
                        />
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        sx={{ mt: 2, width: '100%' }}
                    >
                        決定
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
};

export default FeatureCreation;

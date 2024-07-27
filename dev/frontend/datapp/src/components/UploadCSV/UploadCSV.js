import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from './Modal';
import WarningModal from './WarningModal';
import { Box, Button, Typography, Paper, List, ListItem, Card, CardContent } from '@mui/material';

const UploadCSV = () => {
    const [messages, setMessages] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showWarningModal, setShowWarningModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();

    // アップロードディレクトリをクリアする非同期関数
    useEffect(() => {
        const clearUploads = async () => {
            try {
                await axios.post('http://localhost:5000/clear-uploads');
            } catch (error) {
                console.error('Failed to clear uploads directory:', error);
            }
        };
        clearUploads();
    }, []);

    // ファイルが選択された時の処理
    const handleFiles = (files) => {
        const newFileNames = [];
        Array.from(files).forEach((file) => {
            newFileNames.push(file.name);
        });
        setSelectedFile(files[0]);
        setShowModal(true);
    };

    // ファイルをアップロードする非同期関数
    const uploadFile = async (file, newMessages) => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            newMessages.push(response.data.message);
        } catch (error) {
            newMessages.push(`ファイル ${file.name} のアップロードに失敗しました。`);
        }
        setMessages([...messages, ...newMessages]);
    };

    // ファイルドロップイベントの処理
    const handleDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFiles(files);
        }
    };

    // モーダルを閉じる処理
    const handleCloseModal = () => {
        setShowModal(false);
    };

    // モーダルの確認ボタンがクリックされた時の処理
    const handleConfirmModal = () => {
        setShowModal(false);
        const newMessages = [];
        if (selectedFile) {
            uploadFile(selectedFile, newMessages);
        }
    };

    // "次へ"ボタンのクリック処理
    const handleNext = () => {
        if (selectedFile) {
            navigate('/data-info');
        } else {
            setShowWarningModal(true);
        }
    };

    const handleCloseWarningModal = () => {
        setShowWarningModal(false);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Card sx={{ width: 600, p: 2 }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        CSVファイルをアップロード
                    </Typography>
                    <Paper
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                        sx={{
                            border: '2px dashed #ccc',
                            p: 4,
                            textAlign: 'center',
                            mb: 4,
                        }}
                    >
                        ここにCSVファイルをドラッグアンドドロップ
                    </Paper>
                    {messages.length > 0 && (
                        <Box>
                            <Typography variant="h6">アップロードメッセージ:</Typography>
                            <List>
                                {messages.map((message, index) => (
                                    <ListItem key={index}>{message}</ListItem>
                                ))}
                            </List>
                        </Box>
                    )}
                    <Modal
                        show={showModal}
                        onClose={handleCloseModal}
                        onConfirm={handleConfirmModal}
                        fileName={selectedFile ? selectedFile.name : ''}
                    />
                    <Button variant="contained" color="primary" onClick={handleNext} sx={{ mt: 2, width: '100%' }}>
                        次へ
                    </Button>
                    <WarningModal
                        show={showWarningModal}
                        onClose={handleCloseWarningModal}
                    />
                </CardContent>
            </Card>
        </Box>
    );
};

export default UploadCSV;

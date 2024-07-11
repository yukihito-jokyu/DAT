import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from './Modal';

const UploadCSV = () => {
    const [messages, setMessages] = useState([]);
    const [showModal, setShowModal] = useState(false);
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
        navigate('/config');
    };

    return (
        <>
            <h2>CSVファイルをアップロード</h2>
            <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                style={{
                    border: '2px dashed #ccc',
                    padding: '20px',
                    textAlign: 'center',
                    marginBottom: '20px',
                }}
            >
                ここにCSVファイルをドラッグアンドドロップ
            </div>
            {messages.length > 0 && (
                <div>
                    <h3>アップロードメッセージ:</h3>
                    <ul>
                        {messages.map((message, index) => (
                            <li key={index}>{message}</li>
                        ))}
                    </ul>
                </div>
            )}
            <Modal
                show={showModal}
                onClose={handleCloseModal}
                onConfirm={handleConfirmModal}
                fileName={selectedFile ? selectedFile.name : ''}
            />
            <button onClick={handleNext}>次へ</button>
        </>
    );
};

export default UploadCSV;

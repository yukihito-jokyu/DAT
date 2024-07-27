import React from 'react';
import { Box, Typography, Button, Modal } from '@mui/material';

const WarningModal = ({ show, onClose }) => {
    return (
        <Modal open={show} onClose={onClose}>
            <Box sx={{ p: 2, backgroundColor: 'white', margin: 'auto', mt: 5, width: 300 }}>
                <Typography variant="h6" gutterBottom>
                    CSVファイルがアップロードされていません
                </Typography>
                <Button variant="contained" onClick={onClose}>
                    閉じる
                </Button>
            </Box>
        </Modal>
    );
};

export default WarningModal;

import React, { useState } from 'react';
import { Button, Dialog, DialogContent, DialogContentText, DialogActions, Box, TextField } from '@mui/material';

interface Props {
    onAdd: (name: string) => void;
}

const FormDialog: React.FC<Props> = ({ onAdd }) => {
    const [open, setOpen] = useState(false);
    const [companyName, setCompanyName] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCompanyName(e.target.value);
    };

    const handleSubscribe = () => {
        if (companyName.trim() !== '') {
            onAdd(companyName);
            setCompanyName(''); // reset the input field
            handleClose();
        }
    };

    return (
        <>
            <Button variant="contained" color="primary" fullWidth onClick={handleClickOpen}>
                회사추가
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <DialogContentText>
                      추가할 회사를 입력해주세요.
                    </DialogContentText>
                    <Box mt={2}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="회사를 입력하세요"
                            type="text"
                            fullWidth
                            value={companyName}
                            onChange={handleInputChange}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubscribe}>Subscribe</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default FormDialog;

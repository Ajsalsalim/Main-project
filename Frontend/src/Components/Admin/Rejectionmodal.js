
import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import { Button, TextField,Box } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const Rejectionmodal = ({isOpen,onClose,onReject}) => {
    const [reason, setReason] = useState('');

    const handleReject = () => {
      onReject(reason);
      onClose();
    };
    
  return (
    <Modal open={isOpen} onClose={onClose}
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    closeAfterTransition
    slots={{ backdrop: Backdrop }}
    slotProps={{
      backdrop: {
        timeout: 500,
      },
    }}
    
    
    >
        <Box sx={style}>
        <div>
          <h6>REASON</h6>
      <TextField
        label="Rejection Reason"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />
      <Button sx={{marginTop:"20px",marginLeft:"125px",width:"50px",height:"30px"}}  variant="contained" color="error" onClick={handleReject}>
        Reject
      </Button>
    </div>


        </Box>
 
  </Modal>
  )
}

export default Rejectionmodal

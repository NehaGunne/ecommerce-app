import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function SignupDialog(props) {
    const open = props.state;
    let code=null;
    return (
        <div>
            <Dialog open={open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">OTP</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                       To create an account,Please enter the OTP that we have sent to the 
                       registered mobile number. 
            </DialogContentText>
                    <TextField onChange={(e)=>{code=e.target.value}}
                        autoFocus
                        margin="dense"
                        id="otp"
                        label="Enter OTP"
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>props.register(code)} color="primary">
                        Submit
                    </Button>
                    <Button onClick={props.handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default SignupDialog;
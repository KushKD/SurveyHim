import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Fragment } from "react";

export default function ConfirmDialogEdit({
  open,
  handleConfirm,
  handleCancel,
  memberObject,
}) {
  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Edit Member"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to edit the details of{" "}
            <Typography variant="subtitle1">
              <strong>{memberObject.memberName}</strong>
            </Typography>
            with Aadhaar Number XXXX-XXXX-
            <Typography variant="subtitle1">
              <strong>{memberObject.aadhaarNumber.toString().slice(-4)}</strong>
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>No</Button>
          <Button onClick={() => handleConfirm()} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

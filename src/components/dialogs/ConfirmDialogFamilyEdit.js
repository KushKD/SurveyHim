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

export default function ConfirmDialogFamilyEdit({
  open,
  handleConfirm,
  handleCancel,
  editableFamilyObject,
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
            Are you sure you want to edit the Family residing in
            <Typography variant="subtitle1">
              <strong>
                District: {editableFamilyObject?.districtName} &nbsp;
              </strong>
              <br></br>
              <strong>
                MC/NP: {editableFamilyObject?.municipalName} &nbsp;
              </strong>
              <br></br>
              <strong>
                Ward Name: {editableFamilyObject?.wardName} &nbsp;
              </strong>
              <br></br>
            </Typography>
            with Where Head of Family is :
            <strong>{editableFamilyObject?.headOfFamily}</strong>
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

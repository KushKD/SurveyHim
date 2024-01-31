import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Close, ErrorOutline } from "@mui/icons-material";

const ShowMessageRevoke = ({
  open,
  message,
  onClose,
  onProceed,
  himParivarId,
}) => {
  return (
    <Dialog open={open} onClose={onClose} onProceed={onProceed}>
      <DialogTitle
        sx={{
          backgroundColor: "#074465",
          color: "white",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box display="flex" alignItems="center">
          <ErrorOutline fontSize="large" sx={{ marginRight: "8px" }} />
          <Typography variant="h6">{message.title}</Typography>
        </Box>
      </DialogTitle>
      <DialogContent
        sx={{ textAlign: "center", padding: "16px", margin: "30px" }}
      >
        <Box display="flex" alignItems="center">
          <Typography variant="heading1" sx={{ marginRight: "8px" }}>
            {message.content}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", paddingBottom: "16px" }}>
        <Button
          variant="contained"
          onClick={onClose}
          color="error"
          startIcon={<Close />}
        >
          Close
        </Button>
        {/* Add more buttons if needed */}
        <Button
          variant="contained"
          onClick={onProceed} // Handle the action for the "Proceed" button
          color="success"
        >
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShowMessageRevoke;

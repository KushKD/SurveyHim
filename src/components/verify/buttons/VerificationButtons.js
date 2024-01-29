import React, { useState } from "react";
import { Button, Grid, Menu, MenuItem, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Select, FormControl, InputLabel, ButtonGroup } from "@mui/material";
import { BackHand, Error, RampRight, Verified } from "@mui/icons-material";


const reasonsList = [
    { id: 0, reason: "--Select--" },
    { id: 1, reason: "Family Already Registered in rural Area" },
    { id: 2, reason: "Duplicate Entry" },
    { id: 3, reason: "Survey Not Correct/Incomplete Data" },
    { id: 4, reason: "Family is of Outside Himachal" },
  ];


const VerificationButtons = ({ onVerify, onFamilyNotVerified }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState(reasonsList[0]); // Set to the default option object




  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFamilyNotVerified = () => {
    setDialogOpen(true);
    handleClose();
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleProceed = () => {
    if (selectedReason) {
      onFamilyNotVerified(selectedReason);
      handleDialogClose();
    } else {
      // Handle the case where no reason is selected
      alert("Please select a reason before proceeding.");
    }
  };

  return (
    <div>
      
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Button
             startIcon={<Verified />}
            style={{ backgroundColor: "green", color: "white" }}
            onClick={onVerify}
          >
            Verify Family
          </Button>
        </Grid>
        <Grid item>
          <Button
             startIcon={<Error />}
            style={{ backgroundColor: "red", color: "white" }}
            onClick={handleFamilyNotVerified}
          >
            Family not Verified
          </Button>
        </Grid>
        <Grid item>
          <Button
            startIcon={<BackHand />}
            style={{ backgroundColor: "#396984", color: "white" }}
            onClick={() => alert("Back Button clicked")}
          >
            Cancel/Back
          </Button>
        </Grid>
      </Grid>

      {/* Dialog for Family not Verified */}
      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="md" fullWidth>
  <DialogTitle>
    <Typography variant="h6" color="primary">
    Select Reasons form marking the Family as not verified 
    </Typography>
  </DialogTitle>
  <DialogContent>
    <FormControl fullWidth>
    <Select
  value={selectedReason ? selectedReason.reason : ""}
  onChange={(e) => {
    const selectedValue = e.target.value;
    setSelectedReason(
      selectedValue
        ? reasonsList.find((item) => item.reason === selectedValue)
        : null
    );
  }}
>
  {reasonsList.map((reasonItem) => (
    <MenuItem key={reasonItem.id} value={reasonItem.reason}>
      {reasonItem.reason}
    </MenuItem>
  ))}
</Select>
    </FormControl>
  </DialogContent>
  <DialogActions style={{ textAlign: 'center' }}>
  <ButtonGroup style={{ justifyContent: 'center', padding: '16px' }}>
    <Button variant="contained" onClick={handleProceed} color="success">
      Proceed
    </Button>
    <Button variant="contained" onClick={handleDialogClose} color="error">
      Cancel
    </Button>
  </ButtonGroup>
</DialogActions>

</Dialog>

    </div>
  );
};

export default VerificationButtons;

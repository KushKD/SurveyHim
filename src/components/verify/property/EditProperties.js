import React, { useState } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import {
  Close,
  Delete,
  DoneAll,
  Edit,
  EditAttributes,
  EditAttributesOutlined,
  EditAttributesRounded,
  EditAttributesTwoTone,
  Error,
  ExpandMore,
  More,
  RemoveRedEye,
  Save,
  Update,
  Visibility,
} from "@mui/icons-material";
import ConfirmDialogEdit from "../ConfirmDialogEdit";

export default function EditProperties({ selectedFamily }) {
  console.log("Edit Page Here I come EditProperties", selectedFamily);

  const extractedPropertyData = {
    propertyId: selectedFamily?.propertyDetail?.propertyId,
    propertyDetails: selectedFamily?.propertyDetail?.propertyDetails,
    rentGivenTo: selectedFamily?.propertyDetail?.rentGivenTo,
    electricityConsumerNo:
      selectedFamily?.propertyDetail?.electricityConsumerNo,
    waterConnectionNumber:
      selectedFamily?.propertyDetail?.waterConnectionNumber,
  };

  console.log("extractedPropertyData", extractedPropertyData);

  const [expanded, setExpanded] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableSelectedFamily, setEditableSelectedFamily] = useState({
    extractedPropertyData,
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState(null);

  const handleViewOrCloseClick = () => {
    setExpanded(!expanded);
    setIsEditMode(false);
  };

  const handleEditClick = () => {
    //setMemberToEdit(extractedPropertyData);
    setOpenDialog(true);
  };

  const handleConfirmEdit = () => {
    setOpenDialog(false);
    setExpanded(true);
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setOpenDialog(false);
    setEditableSelectedFamily(extractedPropertyData);
  };

  const handleCloseClick = () => {
    setIsEditMode(false);
    setExpanded(false); // Optionally, collapse the accordion here
  };

  // Function to render member fields
  const renderMemberFields = () => {
    return Object.entries(setEditableSelectedFamily).map(([key, value]) => {
      if (isEditMode) {
        return (
          <TextField
            key={key}
            label={key}
            value={value || ""}
            onChange={(e) =>
              setEditableMemberObject({
                ...editableSelectedFamily,
                [key]: e.target.value,
              })
            }
          />
        );
      } else {
        return <Typography key={key}>{`${key}: ${value}`}</Typography>;
      }
    });
  };

  return (
    <>
      <div>
        <Accordion expanded={expanded}>
          <Box display="flex" alignItems="center" width="100%">
            <Box flexBasis="80%">
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
                style={{
                  backgroundColor: "#FFF",
                  color: "#074465",
                  borderRadius: 5,
                }}
              >
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(4, 1fr)"
                  width="100%"
                  gap={1}
                >
                  <Box style={{ textAlign: "center" }}>
                    <Typography variant="subtitle1">
                      {selectedFamily?.propertyDetail?.propertyDetails}
                    </Typography>
                  </Box>
                  <Box style={{ textAlign: "center" }}>
                    <Typography variant="subtitle1">
                      {selectedFamily?.propertyDetail?.electricityConsumerNo}
                    </Typography>
                  </Box>
                  <Box style={{ textAlign: "center" }}>
                    <Typography variant="subtitle1">
                      {selectedFamily?.propertyDetail?.waterConnectionNumber}
                    </Typography>
                  </Box>
                  <Box style={{ textAlign: "center" }}>
                    <Typography variant="subtitle1">
                      {selectedFamily?.propertyDetail?.propertyId}
                    </Typography>
                  </Box>
                </Box>
              </AccordionSummary>
            </Box>
            <Box
              flexBasis="20%"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {!expanded && !isEditMode && (
                <>
                  <Button
                    color="error"
                    startIcon={<More />}
                    onClick={handleViewOrCloseClick}
                  >
                    More
                  </Button>
                  <Button
                    style={{ color: "#42a5f5" }}
                    startIcon={<Update />}
                    onClick={() => {
                      handleEditClick(memberObject);
                    }}
                  >
                    Edit
                  </Button>
                </>
              )}
              {expanded && !isEditMode && (
                <>
                  <Button
                    onClick={handleViewOrCloseClick}
                    style={{ color: "#A04040" }}
                    endIcon={<Close />}
                  >
                    Close
                  </Button>
                  <Button
                    style={{ color: "#42a5f5" }}
                    startIcon={<Update />}
                    onClick={handleEditClick}
                  >
                    Edit
                  </Button>
                </>
              )}
              {isEditMode && (
                <>
                  <Button startIcon={<Save />} style={{ color: "#28a745" }}>
                    Save
                  </Button>
                  <Button
                    // onClick={handleCloseClick}
                    style={{ color: "#A04040" }}
                    startIcon={<Delete />}
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={handleCloseClick}
                    style={{ color: "#A04040" }}
                    startIcon={<Close />}
                  >
                    Close
                  </Button>
                </>
              )}
            </Box>
          </Box>

          <AccordionDetails>
            <Box
              display="grid"
              gridTemplateColumns="repeat(3, 1fr)"
              gap={2}
              style={{
                borderTop: "2px dashed #ccc",
                padding: "10px",
              }}
            >
              {Object.entries(extractedPropertyData).map(([key, value]) => {
                //if (key === "himMemberId") return null; // Skip rendering for "himMemberId"

                return (
                  <Box
                    gridColumn="span 1"
                    key={key}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      wordWrap: "break-word",
                      padding: "5px",
                    }}
                  >
                    <Box
                      style={{
                        flex: 1,
                        textAlign: "right",
                        paddingRight: "5px",
                        fontWeight: "bold",
                        color: "#396984",
                      }}
                    >
                      {key
                        .replace(/([A-Z])/g, " $1")
                        .trim()
                        .charAt(0)
                        .toUpperCase() +
                        key
                          .replace(/([A-Z])/g, " $1")
                          .trim()
                          .slice(1)}
                      :
                    </Box>
                    <Box
                      style={{
                        flex: 1,
                        textAlign: "left",
                        fontWeight: "bold",
                        paddingLeft: "5px",
                        color: "#555",
                      }}
                    >
                      {isEditMode ? (
                        <TextField
                          fullWidth
                          size="small"
                          value={value || ""}
                          onChange={(e) =>
                            setEditableMemberObject({
                              ...editableMemberObject,
                              [key]: e.target.value,
                            })
                          }
                        />
                      ) : (
                        value?.toString()
                      )}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </AccordionDetails>
        </Accordion>
      </div>

      {/* <ConfirmDialogEdit
        open={openDialog}
        handleConfirm={handleConfirmEdit}
        handleCancel={handleCancelEdit}
        memberObject={memberObject}
        sx={{ width: "50%", maxWidth: "600px", mx: "auto" }}
      /> */}
    </>
  );
}

import React, { useState } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
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
import dayjs from "dayjs";
import { DatePicker, Space } from "antd";

export default function EditMembers({ memberObject }) {
  const [expanded, setExpanded] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableMemberObject, setEditableMemberObject] = useState({
    memberObject,
  });
  const [selectedGenderName, setSelectedGenderName] = useState(
    memberObject.gender
  ); // Initialize with a default value

  const [openDialog, setOpenDialog] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState(null);
  const [changedValues, setChangedValues] = useState({});

  console.log("Gender", memberObject.gender);
  /**
   * Handle Save
   * Save the Edited Data to Service
   */
  const handleSaveChanges = () => {
    console.log("Saved changes:", changedValues);
    // Here you can also merge the changes into memberData or send to a server

    if (Object.keys(changedValues).length === 0) {
      alert("No changes detected");
      return;
    }

    const updatedMemberData = { ...memberObject, ...changedValues };
    //setMemberData(updatedMemberData);
    console.log("Updated Member Data:", updatedMemberData);

    // Optionally reset changedValues or handle further actions
    setChangedValues({});
  };

  const handleViewOrCloseClick = () => {
    setExpanded(!expanded);
    setIsEditMode(false);
  };

  const handleEditClick = () => {
    setMemberToEdit(memberObject);
    setOpenDialog(true);
  };

  const handleConfirmEdit = ({ editableMemberObject }) => {
    //console.log("Edit Object", editableMemberObject);
    setOpenDialog(false);
    setExpanded(true);
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setOpenDialog(false);
    setEditableMemberObject(memberObject);
  };

  const handleCloseClick = () => {
    setIsEditMode(false);
    setExpanded(false); // Optionally, collapse the accordion here
    setChangedValues({});
  };

  // Function to render member fields
  const renderMemberFields = (key, value) => {
    // Use the value from changedValues if it exists, otherwise use the initialValue
    const currentValue =
      changedValues[key] !== undefined ? changedValues[key] : value;

    if (isEditMode) {
      if (key === "dateOfBirth") {
        return (
          <>
            <Space direction="vertical">
              <DatePicker
                key={key}
                label={key}
                //value={value ? moment(value, "DD-MM-YYYY") : null}
                defaultValue={value ? dayjs(value, "DD-MM-YYYY") : null}
                format="DD-MM-YYYY"
                //disable future dates
                disabledDate={(current) => {
                  // Disable dates after today
                  return current && current > dayjs().endOf("day");
                }}
                onChange={(date, dateString) => {
                  console.log("Selected Date: ", date);
                  console.log("Formatted Date String: ", dateString);
                  if (date) {
                    setChangedValues((prevValues) => ({
                      ...prevValues,
                      [key]: dateString, // Use dateString directly
                    }));
                  } else {
                    setChangedValues((prevValues) => ({
                      ...prevValues,
                      [key]: null,
                    }));
                  }
                }}
              />
            </Space>
          </>
        );
      } else if (key === "gender") {
        // Define options for each select field
        const options = {
          gender: [
            { id: 0, genderName: "-" },
            { id: 1, genderName: "Male" },
            { id: 2, genderName: "Female" },
            { id: 3, genderName: "Others" },
          ],
        };

        return (
          <FormControl fullWidth>
            <InputLabel>{key}</InputLabel>
            <Select
              value={selectedGenderName}
              label={key}
              onChange={(e) => {
                const newName = e.target.value;
                setSelectedGenderName(newName); // Update the state variable when a new selection is made

                const newId =
                  options.gender.find((option) => option.genderName === newName)
                    ?.id || null;
                setChangedValues((prevValues) => ({
                  ...prevValues,
                  [key]: { id: newId, genderName: newName },
                }));
              }}
            >
              {options.gender.map((option) => (
                <MenuItem key={option.id} value={option.genderName}>
                  {option.genderName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      } else {
        return (
          <TextField
            key={key}
            label={key}
            value={currentValue}
            onChange={(e) => {
              const newValue = e.target.value;
              setChangedValues((prevValues) => ({
                ...prevValues,
                [key]: e.target.value,
              }));
            }}
          />
        );
      }
    } else {
      return <Typography key={key}>{`${key}: ${initialValue}`}</Typography>;
    }
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
                      {memberObject.memberName}
                    </Typography>
                  </Box>
                  <Box style={{ textAlign: "center" }}>
                    <Typography variant="subtitle1">
                      {memberObject.dateOfBirth}
                    </Typography>
                  </Box>
                  <Box style={{ textAlign: "center" }}>
                    <Typography variant="subtitle1">
                      {`XXXX-XXXX-${memberObject.aadhaarNumber
                        .toString()
                        .slice(-4)}`}
                    </Typography>
                  </Box>
                  <Box style={{ textAlign: "center" }}>
                    {memberObject.isEkycVerfied ? (
                      <Chip
                        icon={<DoneAll fontSize="small" color="success" />}
                        label="Verified"
                        style={{ height: 20 }}
                      />
                    ) : (
                      <Chip
                        icon={<Error color="error" fontSize="small" />}
                        label="Not Verified"
                        style={{ height: 20 }}
                      />
                    )}
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
                  <Button
                    onClick={handleSaveChanges}
                    startIcon={<Save />}
                    style={{ color: "#28a745" }}
                  >
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
              {Object.entries(memberObject).map(([key, value]) => {
                if (key === "himMemberId") return null; // Skip rendering for "himMemberId"

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
                        renderMemberFields(key, value?.toString())
                      ) : key === "aadhaarNumber" ? (
                        `XXXX-XXXX-${value.toString().slice(-4)}`
                      ) : typeof value === "boolean" ? (
                        value ? (
                          <Chip
                            icon={<DoneAll fontSize="small" color="success" />}
                            label="Verified"
                            style={{ height: 20 }}
                          />
                        ) : (
                          <Chip
                            icon={<Error color="error" fontSize="small" />}
                            label="Not Verified"
                            style={{ height: 20 }}
                          />
                        )
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

      <ConfirmDialogEdit
        open={openDialog}
        handleConfirm={() => handleConfirmEdit(editableMemberObject)}
        handleCancel={handleCancelEdit}
        memberObject={memberObject}
        sx={{ width: "50%", maxWidth: "600px", mx: "auto" }}
      />
    </>
  );
}

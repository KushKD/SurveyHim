import {
  Close,
  Delete,
  DoneAll,
  Error,
  More,
  RemoveRedEye,
  Save,
  Update,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Chip } from "@mui/material";
import ConfirmDialogEdit from "../ConfirmDialogEdit";
import { useEffect, useState } from "react";
import ConfirmDialogFamilyEdit from "../../dialogs/ConfirmDialogFamilyEdit";
import { DatePicker, Space } from "antd";

export default function EditFamily({ selectedFamily }) {
  const [expanded, setExpanded] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableFamilyObject, setEditableFamilyObject] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState(null);
  const [changedValues, setChangedValues] = useState({});

  useEffect(() => {
    const extractedFamilyData = {
      districtName: selectedFamily.districtName,
      wardName: selectedFamily.wardName,
      houseAddress: selectedFamily.houseAddress,
      rationCardNo: selectedFamily.rationCardNo,
      economicStatus: selectedFamily.economicStatus,
      socialCategory: selectedFamily.socialCategory,
      religion: selectedFamily.religion,
      residentStatus: selectedFamily.residentStatus,
      headOfFamily: selectedFamily.headOfFamily,
      municipalName: selectedFamily.municipalName,
    };
    setEditableFamilyObject(extractedFamilyData);
  }, [selectedFamily]);

  const handleViewOrCloseClick = () => {
    setExpanded(!expanded);
    setIsEditMode(false);
  };

  const handleEditClick = () => {
    setOpenDialog(true);
  };

  const handleConfirmEdit = (editableFamilyObject) => {
    console.log("Edit Family", editableFamilyObject);
    setOpenDialog(false);
    setExpanded(true);
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setOpenDialog(false);
    //setEditableMemberObject(editableFamilyObject);
  };

  const handleCloseClick = () => {
    setIsEditMode(false);
    setExpanded(false); // Optionally, collapse the accordion here
  };

  const renderFamilyFields = (key, value, options = {}) => {
    // Use the value from changedValues if it exists, otherwise use the value
    const currentValue =
      changedValues[key] !== undefined ? changedValues[key] : value;

    if (isEditMode) {
      switch (key) {
        case "dateOfBirth":
          return (
            <>
              <Space direction="vertical">
                <DatePicker
                  key={key}
                  label={key}
                  defaultValue={value ? dayjs(value, "DD-MM-YYYY") : null}
                  format="DD-MM-YYYY"
                  disabledDate={(current) => {
                    return current && current > dayjs().endOf("day");
                  }}
                  onChange={(date, dateString) => {
                    if (date) {
                      setChangedValues((prevValues) => ({
                        ...prevValues,
                        [key]: dateString,
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

        case "districtName":
          //console.log("List", genderList);
          return (
            <FormControl fullWidth>
              <InputLabel>{key}</InputLabel>
              <Select
                value={selectedGenderName}
                label={key}
                onChange={(e) => {
                  const newName = e.target.value;
                  setSelectedGenderName(newName);

                  const newId =
                    options.gender.find(
                      (option) => option.genderName === newName
                    )?.id || null;
                  setChangedValues((prevValues) => ({
                    ...prevValues,
                    [key]: { id: newId, genderName: newName },
                  }));
                }}
              >
                {genderList.map((option) => (
                  <MenuItem key={option.id} value={option.genderName}>
                    {option.genderName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );

        case "aadhaarNumber":
          return (
            <TextField
              key={key}
              label={key}
              disabled={true}
              value={currentValue}
              onChange={(e) => {
                // Limit input to 10 characters
                if (e.target.value.length <= 12) {
                  setChangedValues((prevValues) => ({
                    ...prevValues,
                    [key]: e.target.value,
                  }));
                }
              }}
            />
          );

        case "wardName":
          // console.log("List", relationsList);
          return (
            <FormControl fullWidth>
              <InputLabel>{key}</InputLabel>
              <Select
                value={selectedRelationName}
                label={key}
                onChange={(e) => {
                  const newName = e.target.value;
                  setSelectedRelationName(newName);

                  const newId =
                    options.relation.find(
                      (option) => option.relationNameEnglish === newName
                    )?.id || null;
                  setChangedValues((prevValues) => ({
                    ...prevValues,
                    [key]: { id: newId, relationNameEnglish: newName },
                  }));
                }}
              >
                {relationsList.map((option) => (
                  <MenuItem key={option.id} value={option.relationNameEnglish}>
                    {option.relationNameEnglish}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        case "economicStatus":
          //console.log("List", qualificationList);
          return (
            <FormControl fullWidth>
              <InputLabel>{key}</InputLabel>
              <Select
                value={selectedQualification}
                label={key}
                onChange={(e) => {
                  const newName = e.target.value;
                  setSelectedQualification(newName);

                  const newId =
                    options.educationQualification.find(
                      (option) =>
                        option.educationQualificationEnglish === newName
                    )?.id || null;
                  setChangedValues((prevValues) => ({
                    ...prevValues,
                    [key]: {
                      id: newId,
                      educationQualificationEnglish: newName,
                    },
                  }));
                }}
              >
                {qualificationList.map((option) => (
                  <MenuItem
                    key={option.id}
                    value={option.educationQualificationEnglish}
                  >
                    {option.educationQualificationEnglish}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        case "socialCategory":
          // console.log("List", occupationList);
          return (
            <FormControl fullWidth>
              <InputLabel>{key}</InputLabel>
              <Select
                value={selectedOccupation}
                label={key}
                onChange={(e) => {
                  const newName = e.target.value;
                  setSelectedOccupation(newName);

                  const newId =
                    options.occupation.find(
                      (option) => option.professionName === newName
                    )?.id || null;
                  setChangedValues((prevValues) => ({
                    ...prevValues,
                    [key]: {
                      id: newId,
                      professionName: newName,
                    },
                  }));
                }}
              >
                {occupationList.map((option) => (
                  <MenuItem key={option.id} value={option.professionName}>
                    {option.professionName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        case "municipalName":
          // console.log("List", occupationList);
          return (
            <FormControl fullWidth>
              <InputLabel>{key}</InputLabel>
              <Select
                value={selectedOccupation}
                label={key}
                onChange={(e) => {
                  const newName = e.target.value;
                  setSelectedOccupation(newName);

                  const newId =
                    options.occupation.find(
                      (option) => option.professionName === newName
                    )?.id || null;
                  setChangedValues((prevValues) => ({
                    ...prevValues,
                    [key]: {
                      id: newId,
                      professionName: newName,
                    },
                  }));
                }}
              >
                {occupationList.map((option) => (
                  <MenuItem key={option.id} value={option.professionName}>
                    {option.professionName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        case "residentStatus":
          // console.log("List", occupationList);
          return (
            <FormControl fullWidth>
              <InputLabel>{key}</InputLabel>
              <Select
                value={selectedOccupation}
                label={key}
                onChange={(e) => {
                  const newName = e.target.value;
                  setSelectedOccupation(newName);

                  const newId =
                    options.occupation.find(
                      (option) => option.professionName === newName
                    )?.id || null;
                  setChangedValues((prevValues) => ({
                    ...prevValues,
                    [key]: {
                      id: newId,
                      professionName: newName,
                    },
                  }));
                }}
              >
                {occupationList.map((option) => (
                  <MenuItem key={option.id} value={option.professionName}>
                    {option.professionName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        case "religion":
          // console.log("List", occupationList);
          return (
            <FormControl fullWidth>
              <InputLabel>{key}</InputLabel>
              <Select
                value={selectedOccupation}
                label={key}
                onChange={(e) => {
                  const newName = e.target.value;
                  setSelectedOccupation(newName);

                  const newId =
                    options.occupation.find(
                      (option) => option.professionName === newName
                    )?.id || null;
                  setChangedValues((prevValues) => ({
                    ...prevValues,
                    [key]: {
                      id: newId,
                      professionName: newName,
                    },
                  }));
                }}
              >
                {occupationList.map((option) => (
                  <MenuItem key={option.id} value={option.professionName}>
                    {option.professionName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        default:
          return (
            <TextField
              key={key}
              label={key}
              value={currentValue}
              onChange={(e) => {
                setChangedValues((prevValues) => ({
                  ...prevValues,
                  [key]: e.target.value,
                }));
              }}
            />
          );
      }
    } else {
      return <Typography key={key}>{`${key}: ${value}`}</Typography>;
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
                      {editableFamilyObject.headOfFamily}
                    </Typography>
                  </Box>
                  <Box style={{ textAlign: "center" }}>
                    <Typography variant="subtitle1">
                      {editableFamilyObject.rationCardNo}
                    </Typography>
                  </Box>
                  <Box style={{ textAlign: "center" }}>
                    <Typography variant="subtitle1">
                      {editableFamilyObject.economicStatus}
                    </Typography>
                  </Box>
                  <Box style={{ textAlign: "center" }}>
                    <Typography variant="subtitle1">
                      {editableFamilyObject.socialCategory}
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
                      handleEditClick(editableFamilyObject);
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
                    // onClick={handleEditClick}
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
              {Object.entries(editableFamilyObject).map(([key, value]) => {
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
                      {isEditMode
                        ? renderFamilyFields(key, value?.toString())
                        : value?.toString()}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </AccordionDetails>
        </Accordion>
      </div>

      <ConfirmDialogFamilyEdit
        open={openDialog}
        handleConfirm={() => handleConfirmEdit(editableFamilyObject)}
        handleCancel={handleCancelEdit}
        editableFamilyObject={editableFamilyObject}
        sx={{ width: "50%", maxWidth: "600px", mx: "auto" }}
      />
    </>
  );
}

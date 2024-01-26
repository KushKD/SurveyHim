import React, { useEffect, useState } from "react";

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
import { useDispatch, useSelector } from "react-redux";
import { onGenderList } from "../../../network/actions/genders";
import { onRelationList } from "../../../network/actions/relations";
import { onQualificationsList } from "../../../network/actions/qualifications";
import { onOccupationList } from "../../../network/actions/occupations";

export default function EditMembers({ memberObject }) {
  const [expanded, setExpanded] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableMemberObject, setEditableMemberObject] = useState({});

  const [genderList, setGenderList] = useState([]);
  const gender_reducer = useSelector((state) => state.gender);
  const [selectedGenderName, setSelectedGenderName] = useState();

  const [relationsList, setRelationsList] = useState([]);
  const relations_reducer = useSelector((state) => state.relations);
  const [selectedRelationName, setSelectedRelationName] = useState();

  const [qualificationList, setQualificationList] = useState([]);
  const qualifications_reducer = useSelector((state) => state.qualifications);
  const [selectedQualification, setSelectedQualification] = useState();

  const [occupationList, setOccupationList] = useState([]);
  const occupation_reducer = useSelector((state) => state.occupations);
  const [selectedOccupation, setSelectedOccupation] = useState();

  useEffect(() => {
    setEditableMemberObject({ memberObject });
    setSelectedGenderName(memberObject.gender);
    setSelectedRelationName(memberObject.relation);
    setSelectedQualification(memberObject.educationQualification);
    setSelectedOccupation(memberObject.occupation);
  }, [memberObject]);

  const [openDialog, setOpenDialog] = useState(false);
  const [changedValues, setChangedValues] = useState({});

  const dispatch = useDispatch();
  /**
   * Gender List
   */
  useEffect(() => {
    let genderList = [];
    if (gender_reducer?.data) {
      const { data, status, message } = gender_reducer.data || {};
      // setdistrictCalled(false);

      if (status === "OK" && message === "SUCCESS") {
        for (let i = 0; i < data.length; i++) {
          let object = {
            id: data[i].id,
            genderName: data[i].genderName,
          };
          // console.log("object", object);
          genderList.push(object);
        }
        setGenderList(genderList);
      }
    }
  }, [gender_reducer]);

  /**
   * Relations List
   */
  useEffect(() => {
    let relationList = [];

    if (relations_reducer?.data) {
      const { data, status, message } = relations_reducer.data || {};
      // setdistrictCalled(false);

      if (status === "OK" && message === "SUCCESS") {
        for (let i = 0; i < data.length; i++) {
          let object = {
            id: data[i].id,
            relationNameEnglish: data[i].relationNameEnglish,
          };
          //console.log("object", object);
          relationList.push(object);
        }
        setRelationsList(relationList);
      }
    }
  }, [relations_reducer]);

  /**
   * onQualificationsList
   * Qualifications
   */
  useEffect(() => {
    let qualificationList = [];

    if (qualifications_reducer?.data) {
      const { data, status, message } = qualifications_reducer.data || {};
      // setdistrictCalled(false);

      if (status === "OK" && message === "SUCCESS") {
        for (let i = 0; i < data.length; i++) {
          let object = {
            id: data[i].id,
            educationQualificationEnglish:
              data[i].educationQualificationEnglish,
          };
          // console.log("object", object);
          qualificationList.push(object);
        }
        setQualificationList(qualificationList);
      }
    }
  }, [qualifications_reducer]);

  /**
   * Occupation List
   */
  useEffect(() => {
    let occupationList = [];

    if (occupation_reducer?.data) {
      const { data, status, message } = occupation_reducer.data || {};
      // setdistrictCalled(false);

      if (status === "OK" && message === "SUCCESS") {
        for (let i = 0; i < data.length; i++) {
          let object = {
            id: data[i].id,
            professionName: data[i].professionName,
          };
          // console.log("object", object);
          occupationList.push(object);
        }
        setOccupationList(occupationList);
      }
    }
  }, [occupation_reducer]);

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
    console.log("Updated Member Data:", updatedMemberData);
    setChangedValues({});
  };

  const handleViewOrCloseClick = () => {
    setExpanded(!expanded);
    setIsEditMode(false);
  };

  const handleEditClick = () => {
    setOpenDialog(true);
  };
  const handleConfirmEdit = (editableMemberObject) => {
    console.log("Edit Object", editableMemberObject);
    setOpenDialog(false);
    setExpanded(true);
    setIsEditMode(true);
    dispatch(onGenderList());
    dispatch(onRelationList());
    dispatch(onQualificationsList());
    dispatch(onOccupationList());
  };

  const handleCancelEdit = () => {
    setOpenDialog(false);
  };

  const handleCloseClick = () => {
    setIsEditMode(false);
    setExpanded(false); // Optionally, collapse the accordion here

    //Clear List Dropdown
    setGenderList([]);
    setRelationsList([]);
    setQualificationList([]);
    setOccupationList([]);

    //Clear Changed Values
    setChangedValues({});
  };

  const renderMemberFields = (key, value, options = {}) => {
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

        case "gender":
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

        case "relation":
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
        case "educationQualification":
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
        case "occupation":
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
        case "mobileNumber":
          // console.log("List", occupationList);
          return (
            <TextField
              key={key}
              label={key}
              type="number"
              value={currentValue}
              onChange={(e) => {
                // Limit input to 10 characters
                if (e.target.value.length <= 10) {
                  setChangedValues((prevValues) => ({
                    ...prevValues,
                    [key]: e.target.value,
                  }));
                }
              }}
            />
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
                        renderMemberFields(key, value?.toString(), {
                          gender: genderList,
                          relation: relationsList,
                          occupation: occupationList,
                          educationQualification: qualificationList,
                        })
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
        handleConfirm={() =>
          handleConfirmEdit(editableMemberObject.memberObject)
        }
        handleCancel={handleCancelEdit}
        memberObject={memberObject}
        sx={{ width: "50%", maxWidth: "600px", mx: "auto" }}
      />
    </>
  );
}

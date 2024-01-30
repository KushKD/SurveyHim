"use client";
import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "../components/Container";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import withAuth from "../utils/withAuth";
import { onDashboard } from "../network/actions/dashboard";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/dashboard/layout";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Grid, Paper } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import Pagination from "@mui/material/Pagination";

import TableRow from "@mui/material/TableRow";

import { getToken, removeToken } from "../utils/cookie";
import { useRouter } from "next/router";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import Filters from "../components/dashboard/filters";
import { onDashboarFilters } from "../network/actions/dashboardFilter";
import {
  CollectionsBookmark,
  Edit,
  Feedback,
  Help,
  PermMedia,
  UploadFile,
  Work,
} from "@mui/icons-material";
import { onSummaryReport } from "../network/actions/summaryReport";

const drawWidth = 220;

const SurveySummary = () => {
  /**Handle Filters and Call the External Service */
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedMunicipality, setSelectedMunicipality] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);

  const [tableData, setTableData] = useState({
    filteredHeaders: [],
    rowData: [],
  });

  const dispatch = useDispatch();
  const summaryReportDashboard = useSelector(
    (state) => state.surveySummaryRedux
  );

  const handleFilterChange = ({ district, municipal, ward }) => {
    setSelectedDistrict(district);
    setSelectedMunicipality(municipal);
    setSelectedWard(ward);

    if (district || municipal || ward) {
      const queryParams = createQueryParams(district, municipal, ward);
      dispatch(onDashboarFilters(queryParams));
    }
  };

  const createQueryParams = (
    selectedDistrict,
    selectedMunicipality,
    selectedWard
  ) => {
    const queryParams = {};

    if (selectedDistrict) queryParams.districtId = selectedDistrict.code;
    if (selectedMunicipality)
      queryParams.municipalId = selectedMunicipality.value;
    if (selectedWard) queryParams.wardId = selectedWard.value;
    return queryParams;
  };

  const createQueryParamsDefault = (
    selectedDistrict,
    selectedMunicipality,
    selectedWard
  ) => {
    const queryParams = {};

    if (selectedDistrict) queryParams.districtId = selectedDistrict;
    if (selectedMunicipality) queryParams.municipalId = selectedMunicipality;
    if (selectedWard) queryParams.wardId = selectedWard;

    return queryParams;
  };

  /**
   * Calling the Use Effect with Default Ward ID, Municipality Id and District ID
   * Getting the Values from Global User
   * createQueryParamsDefault function is used to create parameters
   */

  useEffect(() => {
    try {
      const globalUser = JSON.parse(getToken());
      const { districtDetail, municipalityDetail, ulb, roles } =
        globalUser || {};
      const queryParams = createQueryParamsDefault(
        districtDetail?.districtCode,
        municipalityDetail?.municipalId,
        ulb?.id
      );
      dispatch(onSummaryReport(queryParams));
      // console.log(districtDetail, municipalityDetail, "jnkdajdakdjkad");
    } catch (e) {}
  }, []);

  /**
   * Calling the Use Effect with On Onchange event of District, Municipality and Ward
   * Getting the Values from Global User
   * createQueryParams function is used
   */

  useEffect(() => {
    if (selectedDistrict || selectedMunicipality || selectedWard) {
      const queryParams = createQueryParams(
        selectedDistrict,
        selectedMunicipality,
        selectedWard
      );
      dispatch(onSummaryReport(queryParams));
    }
  }, [dispatch, selectedDistrict, selectedMunicipality, selectedWard]);

  /**
   * Effect for logging or reacting to state changes
   * dispatch(onDashboarFilters(queryParams)); Redux
   */

  useEffect(() => {
    if (summaryReportDashboard?.data) {
      const { data, status, message } = summaryReportDashboard.data || {};
      if (status === "OK" && message === "SUCCESS") {
        if (data.jurisdictionReport) {
          const filteredHeaders = data.jurisdictionReport.headers.filter(
            (header) => header !== "Municipality Id" && header !== "Ward Id"
          );
          console.log("filteredHeaders", filteredHeaders);
          const containsDistrict = filteredHeaders.includes("District");

          const rowData = Object.entries(data.jurisdictionReport.data).map(
            ([municipalityName, info]) => {
              // Here the if-else block is used correctly
              if (containsDistrict) {
                // Return object with a certain structure if the condition is true
                return {
                  municipalityName,
                  district: info.district,
                  familyCount: info.familyCount,
                  memberCount: info.memberCount,
                };
              } else {
                return {
                  municipalityName,
                  familyCount: info.familyCount,
                  memberCount: info.memberCount,
                };
              }
            }
          );

          // console.log("rowData Data", rowData);
          setTableData({ filteredHeaders, rowData });
        } else {
          console.log("Unable to read Data");
        }
      } else {
        console.log("No data in dashboardFilterState");
      }
    } else {
      console.log("No data in dashboardFilterState");
    }
  }, [summaryReportDashboard]);

  console.log("Table Data", tableData);

  return (
    <Layout>
      <Filters onChange={handleFilterChange} />
      <TableData tableData={tableData} />
    </Layout>
  );
};

const TableData = (tableData) => {
  return (
    <>
      <Box
        style={{
          background: "#074465",
          color: "#FFF",
          borderRadius: 6,
          marginLeft: 20,
          marginRight: 20,
        }}
      >
        <Typography
          fontSize={20}
          fontStyle={700}
          textAlign={"center"}
          style={{ paddingLeft: 10 }}
        >
          Summary Report
        </Typography>
      </Box>

      <Grid
        container
        sx={{
          flex: 1,
          background: "#FFF",
          borderRadius: 6,
          marginLeft: 3,
          marginRight: 3,
        }}
      >
        <Grid
          item={true}
          xs={12}
          md={12}
          lg={12}
          sx={{ background: "#FFF", borderRadius: 6 }}
        >
          <div
            style={{
              display: "table",
              tableLayout: "fixed",
              width: "97%",
              maxHeight: "400px",
            }}
          >
            <Paper sx={{ width: "100%", overflow: "hidden", marginTop: 3 }}>
              <TableContainer
                sx={{
                  height: '70vh', 
                  border: 1,
                  borderColor: "gray",
                }}
              >
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {tableData.tableData.filteredHeaders.map(
                        (column, index) => (
                          <TableCell
                            key={column.id}
                            align={"left"}
                            style={{
                              minWidth: column.minWidth,
                              background: "#565656",
                              color: "#FFF",
                              borderBottom: 1,
                              fontStyle: "Bold",
                            }}
                          >
                            <Typography style={{ fontWeight: 600 }}>
                              {column}
                            </Typography>
                          </TableCell>
                        )
                      )}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {tableData.tableData.rowData.map((row) => (
                      <TableRow
                        key={row.municipalityName}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.2)", // Change this to your desired hover color
                          },
                        }}
                      >
                        {Object.values(row).map((value, index) => (
                          <TableCell key={index}>
                            <Typography
                              style={{
                                fontWeight: 700,
                                color: index === 0 ? "#074465" : "#000", // First element black, others red
                              }}
                            >
                              {value}
                            </Typography>
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default withAuth(SurveySummary);

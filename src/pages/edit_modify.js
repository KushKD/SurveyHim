import { useRouter } from "next/router";
import Layout from "../components/dashboard/layout";
import { useDispatch, useSelector } from "react-redux";
import { onFamiliesDetailApi } from "../network/actions/familyDetailApi";
import { Fragment, useEffect, useState } from "react";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";

import EditMembers from "../components/verify/members/EditMembers";
import FamilyDetails from "../components/verify/family/FamilyDetails";
import EditFamily from "../components/verify/family/EditFamily";
import MemberDetailsHeader from "../components/verify/members/MemberDetailsHeader";
import FamilyDetailsHeader from "../components/verify/family/FamilyDetailsHeader";
import PropertyDetailsHeader from "../components/verify/property/PropertyDetailsHeader";
import EditProperties from "../components/verify/property/EditProperties";
import ConsentHeader from "../components/verify/consent/ConsentHeader";
import ConsentDetailsHeader from "../components/verify/consent/ConsentDetailsHeader";

const EditModify = ({ himMemberID }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [detailCalled, setdetailCalled] = useState(false);
  const [selectedFamily, setselectedFamily] = useState({});

  const familiesDetailApi = useSelector((state) => state.familiesDetailApi);

  useEffect(() => {
    const { himParivarId, RationCard } = router.query;
    dispatch(onFamiliesDetailApi(himParivarId, RationCard));
  }, [router.query]);

  useEffect(() => {
    setdetailCalled(false);
    if (familiesDetailApi?.data) {
      const { data, status, propertyDetail, members } = familiesDetailApi.data;
      setselectedFamily(familiesDetailApi.data);
      console.log("Selected Family", selectedFamily);
    }
  }, [familiesDetailApi, selectedFamily]);

  return (
    <>
      <Layout>
        <main className="p-6 space-y-6">
          <Paper
            elevation={3}
            variant="elevation"
            style={{ marginBottom: 16, backgroundColor: "#FFF" }}
          >
            <div className="p-4 flex-grow">
              <Box>
                <div style={{}}>
                  {/* //Family Details */}
                  <Grid container>
                    <Grid item={true} xs={12}>
                      <FamilyDetailsHeader />
                    </Grid>
                  </Grid>

                  <Paper elevation={3} variant="elevation">
                    {selectedFamily && (
                      <EditFamily selectedFamily={selectedFamily} />
                    )}
                  </Paper>
                  <Divider>&nbsp; &nbsp;</Divider>

                  {/* Member Details */}
                  <Grid container>
                    <Grid item={true} xs={12}>
                      <MemberDetailsHeader />
                    </Grid>
                  </Grid>

                  {selectedFamily?.members &&
                    selectedFamily?.members.map((memberObject, index) => (
                      <Paper
                        elevation={3}
                        variant="elevation"
                        style={{ marginBottom: 8 }}
                        key={index}
                      >
                        <EditMembers memberObject={memberObject} />
                      </Paper>
                    ))}
                  <Divider>&nbsp; &nbsp;</Divider>

                  {/* Property Details */}
                  <Grid container>
                    <Grid item={true} xs={12}>
                      <PropertyDetailsHeader />
                    </Grid>
                  </Grid>

                  <Paper elevation={3} variant="elevation">
                    {selectedFamily && (
                      <EditProperties selectedFamily={selectedFamily} />
                    )}
                  </Paper>
                  <Divider>&nbsp; &nbsp;</Divider>

                  {/* Consent Image */}
                  <Grid container>
                    <Grid item={true} xs={12}>
                      <ConsentDetailsHeader />
                    </Grid>
                  </Grid>
                  <Paper elevation={3} variant="elevation">
                    {selectedFamily && (
                      <ConsentHeader selectedFamily={selectedFamily} />
                    )}
                  </Paper>
                  <Divider>&nbsp; &nbsp;</Divider>
                </div>
              </Box>
            </div>
          </Paper>
        </main>
      </Layout>
    </>
  );
};

export default EditModify;

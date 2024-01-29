import { useRouter } from "next/router";
import Layout from "../components/dashboard/layout";
import { useDispatch, useSelector } from "react-redux";
import { onFamiliesDetailApi } from "../network/actions/familyDetailApi";
import { Fragment, useEffect, useState } from "react";
import {
  Box,
  Divider,
  Grid,
  Paper,
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
import VerificationButtons from "../components/verify/buttons/VerificationButtons";
import VerificationHeader from "../components/verify/buttons/VerificationHeader";

const EditModify = ({ himMemberID }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedFamily, setselectedFamily] = useState({});
  const familiesDetailApi = useSelector((state) => state.familiesDetailApi);

  useEffect(() => {
    const { himParivarId, RationCard } = router.query;
    if (himParivarId && RationCard) {
      dispatch(onFamiliesDetailApi(himParivarId, RationCard));
    }
  }, [router.query]);

  useEffect(() => {
    if (familiesDetailApi?.data) {
      const { data, status, propertyDetail, members } = familiesDetailApi.data;
      setselectedFamily(familiesDetailApi.data);
    }
  }, [familiesDetailApi]);


  /**
   * Verification Buttons
   */
  const handleVerify = () => {
    // Add your logic for Verify Family button click
    console.log("Verify Family clicked");
    const isAnyMemberNotVerified = selectedFamily?.members.some(
      (member) => !member.isEkycVerified
    );

    if (isAnyMemberNotVerified) {
      // Display alert if any member's eKYC is not verified
      alert("Verification not done. Aadhaar eKYC is not conducted for all family members ❗");
    } else {
      // Proceed with the verification logic if all members have eKYC verified
      console.log("Verify Family clicked");
      // Add your logic for Verify Family button click
    }
  };

  const handleFamilyNotVerified = (remarks) => {
    // Add your logic for Family not Verified button click with remarks
    console.log("Family not Verified clicked with remarks:", remarks);
  };

  return (
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
                <Grid container>
                  <Grid item xs={12}>
                    <FamilyDetailsHeader />
                  </Grid>
                </Grid>

                <Paper elevation={3} variant="elevation">
                  {selectedFamily && <EditFamily selectedFamily={selectedFamily} />}
                </Paper>
                <Divider>&nbsp; &nbsp;</Divider>

                <Grid container>
                  <Grid item xs={12}>
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

                <Grid container>
                  <Grid item xs={12}>
                    <PropertyDetailsHeader />
                  </Grid>
                </Grid>

                <Paper elevation={3} variant="elevation">
                  {selectedFamily && <EditProperties selectedFamily={selectedFamily} />}
                </Paper>
                <Divider>&nbsp; &nbsp;</Divider>

                <Grid container>
                  <Grid item xs={12}>
                    <ConsentDetailsHeader />
                  </Grid>
                </Grid>

                <Paper elevation={3} variant="elevation">
                  {selectedFamily && <ConsentHeader selectedFamily={selectedFamily} />}
                </Paper>
                <Divider>&nbsp; &nbsp;</Divider>

                <Paper elevation={3} variant="elevation">
                <VerificationHeader />
                 <VerificationButtons
                    onVerify={handleVerify}
                    onFamilyNotVerified={handleFamilyNotVerified}
                  />
                </Paper>
                <Divider>&nbsp; &nbsp;</Divider>

               
              </div>
            </Box>
          </div>
        </Paper>
      </main>
    </Layout>
  );
};

export default EditModify;

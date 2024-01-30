import { useRouter } from "next/router";
import Layout from "../components/dashboard/layout";
import { useDispatch, useSelector } from "react-redux";
import { onFamiliesDetailApi } from "../network/actions/familyDetailApi";
import { Fragment, useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
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
import { getUserID } from "../utils/cookie";
import { onVerification } from "../network/actions/verification";
import Backdrop from '@mui/material/Backdrop';



const EditModify = ({ himMemberID }) => {

  const verificationObject = {
    remarks_id: null,
    verification_status_id: null,
    him_parivar_id: null,
    user_id:null
  };

  const [loading, setLoading] = useState(false); // Loading state

  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedFamily, setselectedFamily] = useState({});
  const familiesDetailApi = useSelector((state) => state.familiesDetailApi);

  const verification_post = useSelector((state) => state.verification_reducer);

  // State variable using the initialData object
  const [verificationObj, setVerificationObj] = useState(verificationObject);

  useEffect(() => {
    const { himParivarId, RationCard } = router.query;
    if (himParivarId && RationCard) {
      dispatch(onFamiliesDetailApi(himParivarId, RationCard));
    }
  }, [router.query]);


/**
 * Verification Post
 */

  useEffect(() => {
    console.log("verification_post?.data", verification_post?.data);
    const { data, status, message } = verification_post?.data || {};
    if (verification_post?.data) {
      
      if (status === "OK" && message === "SUCCESS") {
        // if (data.jurisdictionReport) {
        //   const filteredHeaders = data.jurisdictionReport.headers.filter(
        //     (header) => header !== "Municipality Id" && header !== "Ward Id"
        //   );
        //   console.log("filteredHeaders", filteredHeaders);
        //   const containsDistrict = filteredHeaders.includes("District");

        //   const rowData = Object.entries(data.jurisdictionReport.data).map(
        //     ([municipalityName, info]) => {
        //       // Here the if-else block is used correctly
        //       if (containsDistrict) {
        //         // Return object with a certain structure if the condition is true
        //         return {
        //           municipalityName,
        //           district: info.district,
        //           familyCount: info.familyCount,
        //           memberCount: info.memberCount,
        //         };
        //       } else {
        //         return {
        //           municipalityName,
        //           familyCount: info.familyCount,
        //           memberCount: info.memberCount,
        //         };
        //       }
        //     }
        //   );

        //   // console.log("rowData Data", rowData);
        //   setTableData({ filteredHeaders, rowData });
        // } else {
        //   console.log("Unable to read Data");
        // }
      } else {
        console.log("message",message);
      }
    } else {
      console.log("message",message);
    }
  }, [verification_post]);


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
    setLoading(true);

    setVerificationObj((prevVerificationObj) => ({
      ...prevVerificationObj,
      remarks_id: null, // Family Not Verified Reason
      verification_status_id: 2, // Family Not Verified
      him_parivar_id: selectedFamily.himParivarId, // himParivarID
      user_id: getUserID()
    }));

    


    // const isAnyMemberNotVerified = selectedFamily?.members.some(
    //   (member) => !member.isEkycVerified
    // );

    // if (isAnyMemberNotVerified) {
    //   // Display alert if any member's eKYC is not verified
    //   alert("Verification not done. Aadhaar eKYC is not conducted for all family members ❗");
    // } else {
    //   // Proceed with the verification logic if all members have eKYC verified
    //   console.log("Verify Family clicked");
    //   // Add your logic for Verify Family button click
    // }
  };

  const handleFamilyNotVerified = (remarks) => {
    setLoading(true);
    setVerificationObj((prevVerificationObj) => ({
      ...prevVerificationObj,
      remarks_id: remarks.id, // Family Not Verified Reason
      verification_status_id: 3, // Family Not Verified
      him_parivar_id: selectedFamily.himParivarId, // himParivarID
      user_id: getUserID()
    }));

    dispatch(onVerification(verificationObj));
    setLoading(true);


  };

  useEffect(() => {
    console.log("setVerificationObj", verificationObj);
  }, [verificationObj]);

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

                <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        invisible={false}
        // onClick={()=>setLoading(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      

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

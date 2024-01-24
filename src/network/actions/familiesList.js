// actions/someActions.js
import axios from "../api";

import { FAMILIES_LIST_SUCCESS, FAMILIES_LIST_FALIURE } from "../action_types";
// Action Creators
export const fetchFamiliesListSuccess = (data) => ({
  type: FAMILIES_LIST_SUCCESS,
  payload: data,
});

export const fetchFamiliesListFailure = (error) => ({
  type: FAMILIES_LIST_FALIURE,
  payload: error,
});

// const response = await axios.get(`/report/survey`, {
//   params: queryParams,
// });
// Async Action to Fetch Data
// export const onFamiliesList = (pageNo, wardId, municipalId, districtCode) => {
//   return async (dispatch) => {
//     try {
//       //222 , 22 ,
//       // const response = await axios.get(
//       //   `familyList?page=${pageNo}&size=10&wardId=${wardId}&muncipalId=${municipalId}&districtCode=${districtCode}`,
//       //   {}
//       // );
//       const response = await axios.get(
//         `familyList?page=${pageNo}&size=10&wardId=${wardId}&muncipalId=${municipalId}&districtCode=${districtCode}`,
//         {}
//       );
//       console.log(response, "Family response");
//       dispatch(fetchFamiliesListSuccess(response.data));
//     } catch (error) {
//       console.log(error, "Family response");
//       dispatch(fetchFamiliesListFailure(error));
//     }
//   };
// };

export const onFamiliesList = (queryParams) => {
  return async (dispatch) => {
    try {
      //222 , 22 ,
      // const response = await axios.get(
      //   `familyList?page=${pageNo}&size=10&wardId=${wardId}&muncipalId=${municipalId}&districtCode=${districtCode}`,
      //   {}
      // );
      const response = await axios.get(`/familyList`, {
        params: queryParams,
      });
      console.log("Family response");
      dispatch(fetchFamiliesListSuccess(response.data));
    } catch (error) {
      console.log(error, "Family response");
      dispatch(fetchFamiliesListFailure(error));
    }
  };
};

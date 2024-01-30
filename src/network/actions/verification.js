
import axios from "../api";

import { VERIFICATION_SUCCESS, VERIFICATION_FALIURE } from "../action_types";
export const fetchVerificationSuccess = (data) => ({
  type: VERIFICATION_SUCCESS,
  payload: data,
});

export const fetchVerificationFaliure = (error) => ({
  type: VERIFICATION_FALIURE,
  payload: error,
});

export const onVerification = (verificationObject) => {
    console.log("verificationObject", verificationObject);
    console.log(" JSON.stringify verificationObject",  JSON.stringify(verificationObject));
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "/signIn",
        JSON.stringify(verificationObject)
      );
      dispatch(fetchVerificationSuccess(response.data));
    } catch (error) {
      dispatch(fetchVerificationFaliure(error));
    }
  };
};

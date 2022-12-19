import { asyncKey } from "../../constant/keys";
import { server } from "../../constant/server";
import asyncHelper from "../../helper/async";
import { getUserToken, makeAPIRequest } from "../../helper/globle";
import { DOMAIN, HTTP_DOMAIN } from "@env";
import UUIDGenerator from "react-native-uuid-generator";
import { GET_ALL_COUNTRIES } from "./types";
import urlHelper from "../../helper/url";
import { Platform } from "react-native";

export const loginUser = (data) => async (dispatch) => {
  const uid = await UUIDGenerator.getRandomUUID();
  return makeAPIRequest({
    method: "POST",
    url: server.authToken,
    data: {
      userName: data?.email,
      password: data?.password,
      privateToken: uid,
      accountName: "",
      validity: "Default",
      domain: DOMAIN,
    },
    headers: { "X-LC-Token": "dGFyZ2V0PW1vYmlsZV9hcHA=" },
  })
    .then((res) => {
      console.log("login response :: ", res);
      asyncHelper.setAsyncValues(
        asyncKey.USER_TOKEN_DATA,
        JSON.stringify(res?.data)
      );
      asyncHelper.setAsyncValues(
        asyncKey.USER_TOKEN,
        JSON.stringify(res?.data?.access_token)
      );
      asyncHelper.setAsyncValues(
        asyncKey.CLIENT_SECRET,
        JSON.stringify(res?.data?.client_secret)
      );
      return res;
    })
    .catch((e) => {
      console.log("failed to get token :: ", e.response);
      throw e;
    });
};

export const getAllCountriesList = () => async (dispatch) => {
  return makeAPIRequest({
    method: "GET",
    url: server.allCountries,
  })
    .then((res) => {
      if (res?.data?.length > 0) {
        dispatch({ type: GET_ALL_COUNTRIES, payload: res?.data });
        return res?.data;
      } else {
        dispatch({ type: GET_ALL_COUNTRIES, payload: [] });
        return [];
      }
    })
    .catch((e) => {
      console.log("failed to get all countries :: ", e.response);
      throw e;
    });
};

export const getMyAccount = (data) => async (dispatch) => {
  const token = await getUserToken();
  return makeAPIRequest({
    method: "GET",
    headers: { Authorization: token },
    url: `${server.getMyAccount}?${urlHelper.serializeURL(data)}`,
  })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.log("failed to get my account :: ", e.response);
      throw e;
    });
};

export const getAboutUs = () => async (dispatch) => {
  const token = await getUserToken();
  return makeAPIRequest({
    method: "GET",
    headers: { Authorization: token },
    url: server.getAboutUs,
  })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.log("failed to get abotu us :: ", e.response);
      throw e;
    });
};

export const sendVerificationCode = (data) => async (dispatch) => {
  const token = await getUserToken();
  return makeAPIRequest({
    method: "POST",
    url: `${server.mobile}/${data?.countryCode}/${data?.mobileNumber}/${data?.fullName}/${server.sendVerificationCode}`,
    headers: { Authorization: token },
  })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.log("failed to send verification code :: ", e.response);
      throw e;
    });
};

export const verifyPhoneNumber = (data) => async (dispatch) => {
  const token = await getUserToken();
  return makeAPIRequest({
    method: "POST",
    url: `${server.mobile}/${server.verifyPhoneNumber}?deviceType=${
      Platform.OS == "ios" ? "IOS" : "Android"
    }`,
    data,
    headers: { Authorization: token },
  })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.log("failed to verify phone number :: ", e.response);
      throw e;
    });
};

export const deleteAccount = (data) => async (dispatch) => {
  const token = await getUserToken();
  return makeAPIRequest({
    method: "DELETE",
    url: `${server.deleteAccount}?${urlHelper.serializeURL(data)}`,
    headers: { Authorization: token },
  })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.log("failed to delete account :: ", e.response);
      throw e;
    });
};

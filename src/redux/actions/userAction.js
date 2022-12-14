import { asyncKey } from "../../constant/keys";
import { server } from "../../constant/server";
import { getUserToken, makeAPIRequest } from "../../helper/globle";
import { HTTP_DOMAIN } from "@env";
import asyncHelper from "../../helper/async";
import urlHelper from "../../helper/url";

export const getUserDetails = () => async (dispatch) => {
  const token = await getUserToken();
  return makeAPIRequest({
    method: "GET",
    url: server.userProfile,
    headers: {
      Authorization: token,
      Referer: HTTP_DOMAIN,
    },
  })
    .then((res) => {
      console.log("user profile response :: ", res);
      asyncHelper.setAsyncValues(
        asyncKey.USER_DETAILS,
        JSON.stringify(res?.data)
      );
    })
    .catch((e) => {
      console.log("failed to user Details :: ", e.response);
    });
};

export const updateUserName = (data) => async (dispatch) => {
  const token = await getUserToken();
  return makeAPIRequest({
    method: "POST",
    url: `${server.updateFirstname}?${urlHelper.serializeURL(data)}`,
    headers: {
      Authorization: token,
      Referer: HTTP_DOMAIN,
    },
  })
    .then((res) => {
      console.log("user profile update response :: ", res);
    })
    .catch((e) => {
      console.log("failed to user update Details :: ", e.response);
    });
};

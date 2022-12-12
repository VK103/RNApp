import { asyncKey } from "../../constant/keys";
import { server } from "../../constant/server";
import { getUserToken, makeAPIRequest } from "../../helper/globle";
import { HTTP_DOMAIN } from "@env";
import asyncHelper from "../../helper/async";
import urlHelper from "../../helper/url";

export const getOptInOutStatus = (data) => async (dispatch) => {
  const token = await getUserToken();
  return makeAPIRequest({
    method: "GET",
    url: `${server.getOptInOut}?${urlHelper.serializeURL(data)}`,
    headers: {
      Authorization: token,
    },
  })
    .then((res) => {
      console.log("optin-out status :: ", res);
      return res;
    })
    .catch((e) => {
      console.log("failed to get optin-out status :: ", e.response);
    });
};

export const setOptInOutStatus = (data) => async (dispatch) => {
  const token = await getUserToken();
  return makeAPIRequest({
    method: "POST",
    url: `${server.getOptInOut}?${urlHelper.serializeURL(data)}`,
    headers: {
      Authorization: token,
    },
  })
    .then((res) => {
      console.log("optin-out status :: ", res);
      return res;
    })
    .catch((e) => {
      console.log("failed to get optin-out status :: ", e.response);
    });
};

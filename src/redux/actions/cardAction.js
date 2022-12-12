import { asyncKey } from "../../constant/keys";
import { server } from "../../constant/server";
import { getUserToken, makeAPIRequest } from "../../helper/globle";
import { HTTP_DOMAIN } from "@env";
import asyncHelper from "../../helper/async";
import urlHelper from "../../helper/url";

export const getLoyaltyCard = (data) => async (dispatch) => {
  const token = await getUserToken();
  return makeAPIRequest({
    method: "GET",
    url: `${server.getLoyaltyCard}?${urlHelper.serializeURL(data)}`,
    headers: {
      Authorization: token,
    },
  })
    .then((res) => {
      console.log("loyalty list :: ", res);
      return res;
    })
    .catch((e) => {
      console.log("failed to get loyalty list :: ", e.response);
    });
};

export const getStampCard = () => async (dispatch) => {
  const token = await getUserToken();
  return makeAPIRequest({
    method: "GET",
    url: `${server.getStampCard}`,
    headers: {
      Authorization: token,
    },
  })
    .then((res) => {
      console.log("stamp list :: ", res);
      return res;
    })
    .catch((e) => {
      console.log("failed to get stamp list :: ", e.response);
    });
};

export const addLoyaltyCard = (data) => async (dispatch) => {
  const token = await getUserToken();
  return makeAPIRequest({
    method: "POST",
    url: `${server.addLoyaltyCard}`,
    headers: {
      Authorization: token,
    },
    data: data,
  })
    .then((res) => {
      console.log("loyalty card :: ", res);
      return res;
    })
    .catch((e) => {
      console.log("failed to loyalty card :: ", e.response);
    });
};

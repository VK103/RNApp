import { asyncKey } from "../../constant/keys";
import { server } from "../../constant/server";
import { getUserToken, makeAPIRequest } from "../../helper/globle";
import { HTTP_DOMAIN } from "@env";
import asyncHelper from "../../helper/async";
import urlHelper from "../../helper/url";

export const getAllCampaigns = (data) => async (dispatch) => {
  const token = await getUserToken();
  return makeAPIRequest({
    method: "GET",
    url: `${server.getCampaigns}?${urlHelper.serializeURL(data)}`,
    headers: {
      Authorization: token,
    },
  })
    .then((res) => {
      console.log("campaign list :: ", res);
      return res;
    })
    .catch((e) => {
      console.log("failed to get campaign list :: ", e.response);
    });
};

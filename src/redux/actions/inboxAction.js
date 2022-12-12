import { asyncKey } from "../../constant/keys";
import { server } from "../../constant/server";
import { getUserToken, makeAPIRequest } from "../../helper/globle";
import { HTTP_DOMAIN } from "@env";
import asyncHelper from "../../helper/async";

export const getAllCampaigns = () => async (dispatch) => {
  const token = await getUserToken();
  return makeAPIRequest({
    method: "GET",
    url: `${server.getCampaigns}`,
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

import { asyncKey } from "../../constant/keys";
import { server } from "../../constant/server";
import { getUserToken, makeAPIRequest } from "../../helper/globle";
import { HTTP_DOMAIN } from "@env";
import asyncHelper from "../../helper/async";
import urlHelper from "../../helper/url";

export const getStoreList = () => async (dispatch) => {
  const token = await getUserToken();
  return makeAPIRequest({
    method: "GET",
    url: `${server.mobile}/${server.stores}`,
    headers: {
      Authorization: token,
    },
  })
    .then((res) => {
      console.log("store list :: ", res);
      return res;
    })
    .catch((e) => {
      console.log("failed to get store list :: ", e.response);
    });
};

export const getStoreDetail = (data) => async (dispatch) => {
  const token = await getUserToken();
  return makeAPIRequest({
    method: "GET",
    url: `${server.mobile}/${server.store}/${data?.storeId}`,
    headers: {
      Authorization: token,
    },
  })
    .then((res) => {
      console.log("store detail :: ", res);
      return res;
    })
    .catch((e) => {
      console.log("failed to get store detail :: ", e.response);
    });
};

export const getStoreCampaign = (data) => async (dispatch) => {
  const token = await getUserToken();
  return makeAPIRequest({
    method: "GET",
    url: `${server.getStoreCampaign}?storeId=${data?.storeId}`,
    headers: {
      Authorization: token,
    },
  })
    .then((res) => {
      console.log("store campaign detail :: ", res);
      return res;
    })
    .catch((e) => {
      console.log("failed to get store campaign detail :: ", e.response);
    });
};

export const addStoreRate = (data) => async (dispatch) => {
  const token = await getUserToken();
  return makeAPIRequest({
    method: "POST",
    url: `${server.rateStore}?${urlHelper.serializeURL(data)}`,
    headers: {
      Authorization: token,
    },
  })
    .then((res) => {
      console.log("add rate store detail :: ", res);
      return res;
    })
    .catch((e) => {
      console.log("failed to add rate store detail :: ", e.response);
    });
};

export const getAllCategories = (data) => async (dispatch) => {
  const token = await getUserToken();
  return makeAPIRequest({
    method: "GET",
    url: `${server.getCategories}?${urlHelper.serializeURL(data)}`,
    headers: {
      Authorization: token,
    },
  })
    .then((res) => {
      console.log("category list :: ", res);
      return res;
    })
    .catch((e) => {
      console.log("failed to get category list :: ", e.response);
    });
};

export const getAllRegion = (data) => async (dispatch) => {
  const token = await getUserToken();
  return makeAPIRequest({
    method: "GET",
    url: `${server.getRegion}?countrycode=${data?.countryCode || ""}`,
    headers: {
      Authorization: token,
    },
  })
    .then((res) => {
      console.log("region list :: ", res);
      return res;
    })
    .catch((e) => {
      console.log("failed to get region list :: ", e.response);
    });
};

export const getAllCities = (data) => async (dispatch) => {
  const token = await getUserToken();
  return makeAPIRequest({
    method: "GET",
    url: `${server.getCities}?regionId=${data?.regionId || ""}`,
    headers: {
      Authorization: token,
    },
  })
    .then((res) => {
      console.log("cities list :: ", res);
      return res;
    })
    .catch((e) => {
      console.log("failed to get cities list :: ", e.response);
    });
};

export const findStores = (data) => async (dispatch) => {
  const token = await getUserToken();
  return makeAPIRequest({
    method: "GET",
    url: `${server.findStores}?${urlHelper.serializeURL(data)}`,
    headers: {
      Authorization: token,
    },
  })
    .then((res) => {
      console.log("store list :: ", res);
      return res;
    })
    .catch((e) => {
      console.log("failed to get store list :: ", e.response);
    });
};

export const followStore = (data) => async (dispatch) => {
  const token = await getUserToken();
  return makeAPIRequest({
    method: "POST",
    url: `${server.followStore}?${urlHelper.serializeURL(data)}`,
    headers: {
      Authorization: token,
    },
  })
    .then((res) => {
      console.log("follow store :: ", res);
      return res;
    })
    .catch((e) => {
      console.log("failed follow store :: ", e.response);
    });
};

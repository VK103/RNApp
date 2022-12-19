import { asyncKey } from "../../constant/keys";
import { server } from "../../constant/server";
import { getUserToken, makeAPIRequest } from "../../helper/globle";
import { HTTP_DOMAIN } from "@env";
import asyncHelper from "../../helper/async";
import urlHelper from "../../helper/url";
import { GET_ALL_STORE_LIST, GET_ALL_STORE_LIST_BY_ALPHA } from "./types";
import { alphabetList } from "../../constant/menuList";

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
      let storeData = res?.data || [];
      dispatch({ type: GET_ALL_STORE_LIST, payload: storeData });
      let storeArr = [];
      for (const i of alphabetList) {
        let alpha = i.toUpperCase();
        let alphaItems = storeData?.filter((el) => {
          let storeAlpha = el?.storeName?.charAt(0)?.toUpperCase();
          return storeAlpha === alpha ? true : false;
        });
        if (alphaItems?.length > 0)
          storeArr.push({ title: alpha, data: alphaItems });
      }
      dispatch({
        type: GET_ALL_STORE_LIST_BY_ALPHA,
        payload: storeArr,
      });
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

export const getStoresCardList = (data) => async (dispatch) => {
  const token = await getUserToken();
  return makeAPIRequest({
    method: "GET",
    url: `${server.getStampCard}?${urlHelper.serializeURL(data)}`,
    headers: {
      Authorization: token,
    },
  })
    .then((res) => {
      console.log("store crad list :: ", res);
      return res?.data;
    })
    .catch((e) => {
      console.log("failed to get store card list :: ", e.response);
    });
};

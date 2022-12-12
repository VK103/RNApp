import axios from "axios";
import { asyncKey } from "../constant/keys";
import asyncHelper from "./async";
import { BASE_URL } from "@env";

export const makeAPIRequest = ({ method, url, data, headers, params }) =>
  new Promise((resolve, reject) => {
    const option = {
      method,
      baseURL: BASE_URL,
      url,
      data,
      headers,
      params,
    };
    axios(option)
      .then((response) => {
        if (response.status === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch(async (error) => {
        reject(error);
      });
  });

export const getUserToken = async () => {
  return await asyncHelper.getAsyncValues(asyncKey.USER_TOKEN).then((res) => {
    const token = JSON.parse(res);
    if (token && token?.length > 0) {
      return `Bearer ${token}`;
    } else {
      return null;
    }
  });
};

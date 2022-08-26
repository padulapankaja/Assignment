import { apiHandler } from "../util/api.util";

const api = {
  cust_api: "api/customers",
  opper_api: "api/oppertunites",
  oppertunitesCutomer: "api/oppertunites/customer",
};
export const getAllCustomers = (token?: string) => {
  return new Promise((resolve, reject) => {
    return apiHandler
      .get(`${api.cust_api}`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getOppertuntiesBasedOnCustomer = (userid: string) => {
  return new Promise((resolve, reject) => {
    return apiHandler
      .get(`${api.oppertunitesCutomer}/${userid}`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const createOppertunityForCustomr = (data: any) => {
  return new Promise((resolve, reject) => {
    return apiHandler
      .post(api.opper_api, data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const updateOppertunityForCustomr = (data: any) => {
  return new Promise((resolve, reject) => {
    return apiHandler
      .put(api.opper_api, data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateCustomerStatus = (data: any) => {
  return new Promise((resolve, reject) => {
    return apiHandler
      .put(api.cust_api, data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const createCustomer = (data: any) => {
  return new Promise((resolve, reject) => {
    return apiHandler
      .post(api.cust_api, data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

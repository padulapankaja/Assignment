import { apiHandler } from "../util/api.util";

const api = {
  allcustomers: "api/customers",
  oppertunitesCutomer: "api/oppertunites/customer",
  createOppertunity: "api/oppertunites",
  updateOppertunity: "api/oppertunites",
  updateCustomer: "api/customers",
};
export const getAllCustomers = (token?: string) => {
  return new Promise((resolve, reject) => {
    return apiHandler
      .get(`${api.allcustomers}`)
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
      .post(api.createOppertunity, data)
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
      .put(api.updateOppertunity, data)
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
      .put(api.updateCustomer, data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

import { apiHandler } from "../util/api.util";

const api = {
  allcustomers: "api/customers",
  oppertunitesCutomer: "api/oppertunites/customer",
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

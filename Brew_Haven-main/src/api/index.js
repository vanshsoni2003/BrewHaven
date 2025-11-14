import axiosClient from "../confige/axios";


export function login(URL, data) {
  return axiosClient
    .post(`/${URL}`, data)
    .then((response) => {
      return response;
      console.log(response);
    })
    .catch((error) => {
      console.log("error ------", error);
    });
}

export function register(URL, data) {
    return axiosClient
      .post(`/${URL}`, data)
      .then((response) => {
        return response;
        console.log(response);
      })
      .catch((error) => {
        console.log("error ------", error);
      });
  }

  export function add(URL, data) {
    return axiosClient
      .post(`/${URL}`, data)
      .then((response) => {
        return response;
        console.log(response);
      })
      .catch((error) => {
        console.log("error ------", error);
      });
  }

  
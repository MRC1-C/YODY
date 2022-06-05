import axios from "axios";
let baseURL = "http://127.0.0.1:5000"

export async function postRequest(url, body) {
  try {
      let response = await axios.post(baseURL + url, body, generateRequestHeader());
    return response.data;
  } catch (error) {
    handleErrorCode(error)
    throw error;
  }
}
export async function getRequest(url) {
  try {
    let response = await axios.get(
        baseURL + url,
      generateRequestHeader()
    );
    return response.data;
  } catch (error) {
    handleErrorCode(error);
    throw error;
  }
}

export async function deleteRequest(url) {
  try {
      let response = await axios.delete(baseURL + url,generateRequestHeader());
    return response.data;
  } catch (error) {
    handleErrorCode(error)
    throw error;
  }
}

export async function patchRequest(url, body) {
  try {
      let response = await axios.patch(baseURL + url, body, generateRequestHeader());
    return response.data;
  } catch (error) {
    handleErrorCode(error)
    throw error;
  }
}

export function generateRequestHeader() {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  };
}

export const handleErrorCode = (err) => {
  // switch(err.response.status) {
  //   case 401: 
  //         //message.error(err.message)    
  //       break;
  //   default:
  //       message.error(err.message)
  //     break;
  // }
}
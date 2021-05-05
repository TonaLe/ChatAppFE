import axios from "axios";
import { baseUrl } from "../Constants/BaseUrl";
const ApiGet = (endPoint, token) => {
  const AuthStr = "Bearer ".concat(token);
  return axios({
    method: "GET",
    url: `${baseUrl}/${endPoint}`,
    headers: {
      Authorization: AuthStr,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export default ApiGet;

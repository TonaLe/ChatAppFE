import axios from "axios";
import { baseUrl } from "../Constants/BaseUrl";
const ApiPost = (endPoint, token,params) => {
  const AuthStr = "Bearer ".concat(token);
  return axios({
    method: "POST",
    url: `${baseUrl}/${endPoint}`,
    data: params,
    headers: {
      Accept: "application/json",
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

export default ApiPost;


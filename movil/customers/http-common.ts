import axios from "axios";
export default axios.create({
  baseURL: "https://unicomertest.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});

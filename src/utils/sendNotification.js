import axios from "axios";
import baseURL from "./baseURL";

const handleSendNotification = async (token, message) => {
  try {
    const sendData = { token, data };
    const data = await axios.post(baseURL + "/api/sendNotification", sendData);
  } catch (error) {
    alert(error.message);
  }
};
export default handleSendNotification;

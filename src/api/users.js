import axios from "../api";
import config from "../config";

const userApi = {
  async signup({ firstName, lastName, emailId, password }) {
    try {
      const response = await axios({
        method: "POST",
        url: `${config.BASE_API_URL}/api/users/signup`,
        data: {
          firstName,
          lastName,
          emailId,
          password,
        },
      });

      console.log(response);

      return { data: null, error: null };
    } catch (err) {
      return { data: null, error: err.response.data.message };
    }
  },

  async verifyEmail(token) {
    try {
      const response = await axios({
        method: "POST",
        url: `${config.BASE_API_URL}/api/users/verify-email?token=${token}`,
      });
      const message = response.data.message;
      return { message, error: null };
    } catch (err) {
      return { message: err.response.data.message, error: true };
    }
  },
};

export default userApi;
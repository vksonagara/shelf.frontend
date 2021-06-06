import axios from "../api";
import config from "../config";
import { resetPasswordSchema } from "../utils/ValidationUtil";

// Signup, Signin, verifyemail, getAccessToken, signOut  APIs

const userApi = {
  async signup({ firstName, lastName, emailId, password }) {
    try {
      const response = await axios({
        method: "POST",
        url: `${config.BASE_API_URL}/api/users/sign-up`,
        data: {
          firstName,
          lastName,
          emailId,
          password,
        },
      });

      return { error: null };
    } catch (err) {
      return { error: err.response.data.message };
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

  async signin({ emailId, password, rememberMe }) {
    try {
      const response = await axios({
        method: "POST",
        url: `${config.BASE_API_URL}/api/users/sign-in`,
        data: {
          emailId,
          password,
          rememberMe,
        },
      });

      return { error: null, data: response.data };
    } catch (err) {
      return { error: err.response.data.message };
    }
  },

  async getAccessToken() {
    try {
      const response = await axios({
        method: "GET",
        url: `${config.BASE_API_URL}/api/users/refresh`,
      });

      return { error: null, data: response.data };
    } catch (err) {
      return { data: null, error: err.response.data.message };
    }
  },

  async signout() {
    try {
      const response = await axios({
        method: "POST",
        url: `${config.BASE_API_URL}/api/users/sign-out`,
      });
      return { error: null, data: response.data };
    } catch (err) {
      return { error: err.response.data.message };
    }
  },

  async sendForgotPasswordLink({ emailId }) {
    try {
      const response = await axios({
        method: "POST",
        url: `${config.BASE_API_URL}/api/users/forgot-password`,
        data: { emailId },
      });

      return { error: null, data: response.data };
    } catch (err) {
      return { error: err.response?.data?.message };
    }
  },

  async resetPassword({ emailId, password, token }) {
    try {
      const response = await axios({
        method: "POST",
        url: `${config.BASE_API_URL}/api/users/reset-password`,
        data: {
          emailId,
          newPassword: password,
          token,
        },
      });

      return { error: null, data: response.data };
    } catch (err) {
      return { error: err.response?.data?.message };
    }
  },
};

export default userApi;

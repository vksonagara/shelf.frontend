import axios from "../api";
import config from "../config";
import constant from "../config/constant";

// APIs for notes app
const notesApi = {
  async createFolder(name) {
    try {
      const response = await axios({
        method: "POST",
        url: `${config.BASE_API_URL}/api/folders`,
        data: { name },
      });
      return { error: null, data: response.data };
    } catch (err) {
      return { error: err.response.data.message };
    }
  },
  async getFolders() {
    try {
      const response = await axios({
        method: "GET",
        url: `${config.BASE_API_URL}/api/folders`,
        withCredentials: true,
      });
      return { error: null, data: response.data };
    } catch (err) {
      return { error: err.response.data.message };
    }
  },
  async deletefolder(id) {
    try {
      const response = await axios({
        method: "DELETE",
        url: `${config.BASE_API_URL}/api/folders/${id}`,
        withCredentials: true,
      });
      return { error: null, data: response.data };
    } catch (err) {
      return { error: err.response.data.message };
    }
  },
  async renamefolder(id, name) {
    try {
      const response = await axios({
        method: "PATCH",
        url: `${config.BASE_API_URL}/api/folders/${id}`,
        data: {
          name,
        },
        withCredentials: true,
      });
      return { error: null, data: response.data };
    } catch (err) {
      return { error: err.response.data.message };
    }
  },
  async createnote(id) {
    try {
      const response = await axios({
        method: "POST",
        url: `${config.BASE_API_URL}/api/folders/${id}/notes`,
        data: {
          title: constant.noteName,
          content: ""
        },
        withCredentials: true,
      });
      return { error: null, data: response.data };
    } catch (err) {
      return { error: err.response.data.message };
    }
  },
  async getAllNotes(id) {
    try {
      const response = await axios({
        method: "GET",
        url: `${config.BASE_API_URL}/api/folders/${id}/notes`,
        withCredentials: true,
      });
      return { error: null, data: response.data };
    } catch (err) {
      return { error: err.response.data.message };
    }
  }
};

export default notesApi;
import axios from "../api";
import config from "../config";

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
          title: "",
          content: "",
        },
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
      });
      return { error: null, data: response.data };
    } catch (err) {
      return { error: err.response.data.message };
    }
  },
  async deleteNote(id) {
    try {
      const response = await axios({
        method: "DELETE",
        url: `${config.BASE_API_URL}/api/notes/${id}`,
      });
      return { error: null, data: response.data };
    } catch (err) {
      return { error: err.response.data.message };
    }
  },
  async getDetailOfNote(noteId) {
    try {
      const response = await axios({
        method: "GET",
        url: `${config.BASE_API_URL}/api/notes/${noteId}`,
      });
      return { error: null, data: response.data };
    } catch (err) {
      return {
        error:
          (err.response && err.response.data.message) || "Something went wrong",
      };
    }
  },
  async updateNoteTitle({ noteId, title }) {
    try {
      const response = await axios({
        method: "PATCH",
        url: `${config.BASE_API_URL}/api/notes/${noteId}`,
        data: {
          title,
        },
      });
      return { error: null, data: response.data };
    } catch (err) {
      return { error: err.response.data.message };
    }
  },
  async updateNoteContent({ noteId, content }) {
    try {
      const response = await axios({
        method: "PATCH",
        url: `${config.BASE_API_URL}/api/notes/${noteId}`,
        data: {
          content,
        },
      });

      return { error: null, data: response.data };
    } catch (err) {
      return {
        error:
          (err.response && err.response.data.message) || "Something went wrong",
      };
    }
  },
  async getAllArchivedNotes() {
    try {
      const response = await axios({
        method: "GET",
        url: `${config.BASE_API_URL}/api/archive/notes`,
      });

      return { error: null, data: response.data };
    } catch (err) {
      return {
        error:
          (err.response && err.response.data.message) || "Something went wrong",
      };
    }
  },
  async getDetailOfArchivedNote(noteId) {
    try {
      const response = await axios({
        method: "GET",
        url: `${config.BASE_API_URL}/api/archive/notes/${noteId}`,
      });
      return { error: null, data: response.data };
    } catch (err) {
      return {
        error:
          (err.response && err.response.data.message) || "Something went wrong",
      };
    }
  },
  async deleteArchivedNote(noteId) {
    try {
      const response = await axios({
        method: "DELETE",
        url: `${config.BASE_API_URL}/api/archive/notes/${noteId}`,
      });
      return { error: null, data: response.data };
    } catch (err) {
      return {
        error:
          (err.response && err.response.data.message) || "Something went wrong",
      };
    }
  },
  async restoreArchivedNote({ noteId, folderId }) {
    try {
      const response = await axios({
        method: "PATCH",
        url: `${config.BASE_API_URL}/api/archive/notes/${noteId}?folderId=${folderId}`,
      });
      return { error: null, data: response.data };
    } catch (err) {
      return {
        error:
          (err.response && err.response.data.message) || "Something went wrong",
      };
    }
  },
  async moveNote({ noteId, folderId }) {
    try {
      const response = await axios({
        method: "PATCH",
        url: `${config.BASE_API_URL}/api/notes/${noteId}`,
        data: {
          folderId,
        },
      });
      return { error: null, data: response.data };
    } catch (err) {
      return { error: err.response.data.message };
    }
  },
};

export default notesApi;

import axios from "axios";

axios.defaults.baseURL = "https://66f450d177b5e8897099246a.mockapi.io";
axios.defaults.headers = {
  "Content-Type": "application/json",
};

export const fetchContacts = async () => {
  const response = await axios.get("/contacts");
  return response.data;
};

export const addContact = async (data) => {
  const response = await axios.post("/contacts", data);
  return response.data;
};

export const deleteContact = async (contactId) => {
  const response = await axios.delete(`/contacts/${contactId}`);
  return response.data;
};

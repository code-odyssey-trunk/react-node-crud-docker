import axios from "axios";
//API Endpoint
const apiUrl = `http://localhost:3001`;

//Fetch all users
export const loadUsers = async () => {
  return await axios.get(apiUrl + "/users");
};

//Login with username and password
export const loginUser = async (username, password) => {
  return await axios.post(apiUrl + "/users/login", {
    username,
    password,
  });
};

//Register using Name, Username and Password
export const registerUser = async (name, username, password) => {
  return await axios
    .post(apiUrl + "/users", {
      name,
      username,
      password,
    })
    .catch((err) => {
      return err;
    });
};

//Update name of user using id
export const updateUser = async (name, id) => {
  return await axios.put(apiUrl + "/users/" + id, {
    name,
  });
};

//Delete a user using id
export const deleteUser = async (id) => {
  return await axios.delete(apiUrl + "/users/" + id);
};

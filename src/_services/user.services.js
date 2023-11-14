import fetchWrapper from '_helpers/fetch-wrapper';

const baseUrl = 'user';

function getAllUsers() {
  return fetchWrapper.get(`${baseUrl}`);
}

function getUserById(id) {
  return fetchWrapper.get(`${baseUrl}/${id}`);
}
function getAllUsersByRole(role) {
  return fetchWrapper.get(`${baseUrl}/?role=${role}`);
}
function createUser(payload) {
  return fetchWrapper.post(`${baseUrl}/`, payload);
}

function updateUser(id, payload) {
  return fetchWrapper.patch(`${baseUrl}/${id}`, payload);
}

function deleteUser(id) {
  return fetchWrapper.delete(`${baseUrl}/${id}`);
}

function changePassword(payload) {
  return fetchWrapper.post(`${baseUrl}/changepassword`, payload);
}
export const UserService = {
  getAllUsers,
  getUserById,
  getAllUsersByRole,
  createUser,
  updateUser,
  deleteUser,
  changePassword
};

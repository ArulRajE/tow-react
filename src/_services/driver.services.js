import fetchWrapper from '_helpers/fetch-wrapper';

const baseUrl = 'driver';
function getAll() {
  return fetchWrapper.get(`${baseUrl}`);
}
function getAllUsersByRole(role) {
  return fetchWrapper.get(`${baseUrl}/?role=${role}`);
}
function getById(id) {
  return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
  return fetchWrapper.post(`${baseUrl}`, params);
}

function update(id, params) {
  return fetchWrapper.patch(`${baseUrl}/${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript

function deleteById(id) {
  return fetchWrapper.delete(`${baseUrl}/${id}`);
}
function search(key) {
  return fetchWrapper.get(`${baseUrl}/search/${key}`);
}

export const DriverService = {
  getAll,
  getById,
  getAllUsersByRole,
  create,
  update,
  deleteById,
  search
};

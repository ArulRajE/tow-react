import fetchWrapper from '_helpers/fetch-wrapper';

const baseUrl = 'role';

function getAllRole() {
  return fetchWrapper.get(`${baseUrl}`);
}

function getRoleById(id) {
  return fetchWrapper.get(`${baseUrl}/${id}`);
}

function saveRole(payload) {
  return fetchWrapper.post(`${baseUrl}/`, payload);
}

function updateRole(id, payload) {
  return fetchWrapper.patch(`${baseUrl}/${id}`, payload);
}

function deleteRole(id) {
  return fetchWrapper.delete(`${baseUrl}/${id}`);
}

export const RoleService = {
  getAllRole,
  getRoleById,
  saveRole,
  updateRole,
  deleteRole
};

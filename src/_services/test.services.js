import fetchWrapper from '_helpers/fetch-wrapper';

const baseUrl = 'test';

function getAllTests() {
  return fetchWrapper.get(`${baseUrl}`);
}

function getTestById(id) {
  return fetchWrapper.get(`${baseUrl}/${id}`);
}
function getAllTestsByRole(role) {
  return fetchWrapper.get(`${baseUrl}/?role=${role}`);
}
function createTest(payload) {
  return fetchWrapper.post(`${baseUrl}/`, payload);
}

function updateTest(id, payload) {
  return fetchWrapper.patch(`${baseUrl}/${id}`, payload);
}

function deleteTest(id) {
  return fetchWrapper.delete(`${baseUrl}/${id}`);
}

function changePassword(payload) {
  return fetchWrapper.post(`${baseUrl}/changepassword`, payload);
}
export const TestService = {
  getAllTests,
  getTestById,
  getAllTestsByRole,
  createTest,
  updateTest,
  deleteTest,
  changePassword
};


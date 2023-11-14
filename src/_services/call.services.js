import fetchWrapper from '_helpers/fetch-wrapper';

const baseUrl = 'call';
function getAll() {
  return fetchWrapper.get(`${baseUrl}`);
}

function getById(id) {
  return fetchWrapper.get(`${baseUrl}/${id}`);
}

function getCallsByDate(startDate, endDate) {
  return fetchWrapper.get(`${baseUrl}/count-calls-by-month?startDate=${startDate},endDate=${endDate}`);
}

function create(params) {
  // eslint-disable-next-line no-debugger
  debugger;
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

export const CallService = {
  getAll,
  getById,
  create,
  update,
  deleteById,
  search,
  getCallsByDate
};

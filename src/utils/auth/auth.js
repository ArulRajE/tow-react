import ManageTenantService from '_services/manage-tenant.service';

export function login(data) {
  localStorage.setItem('tokenData', JSON.stringify(data));
}
export function logout() {
  localStorage.removeItem('tokenData');
}
export function getStorageData() {
  return JSON.parse(localStorage.getItem('tokenData')) || null;
}

export const getClientList = async () => {
  const clientName = [];
  const result = await ManageTenantService.getAll();

  result.forEach((client) => {
    client.managed_tenent.forEach((c) => {
      clientName.push(c);
    });
  });

  return clientName;
};

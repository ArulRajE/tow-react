import axios from 'axios';
import config from '../config';

const axiosUrl = axios.create({
  baseURL: config.apiUrl
});
// export const storageData = () => getStorageData();

axiosUrl.interceptors.response.use(null, (error) => {
  const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;
  if (expectedError) {
    console.log('Logging the error', error);
    // axiosUrl
    //     .post('/auth/refresh-tokens', { refreshToken: storageData().tokens.refresh.token })
    //     .then((res) => {
    //         const data = { ...storageData(), tokens: res.data };
    //         login(data);
    //     })
    //     .catch((error) => console.log(error));
    // toast.error('An Unexpected Error occurred');
  }
  return Promise.reject(error);
});
export default axiosUrl;

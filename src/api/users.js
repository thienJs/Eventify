import axios from 'axios';

export const users = axios.create({
  baseURL: 'http://localhost:4000/',
});

export const usersWithAuth = (token, isAFileRequest) => {
  if (isAFileRequest) {
    return axios.create({
      baseURL: 'http://localhost:4000/api/users',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return axios.create({
    baseURL: 'http://localhost:4000/api/users',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

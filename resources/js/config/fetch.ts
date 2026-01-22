import xior from 'xior';

const authToken = localStorage.getItem('authToken');

xior.defaults.baseURL = '/api';
xior.defaults.headers.Accept = 'application/json';
xior.defaults.headers.Authorization = `Bearer ${authToken}`;

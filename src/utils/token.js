import Cookies from 'js-cookie';

const TokenKey = 'user_token';
const key = 'first_token';
export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function getFirstLogin() {
  return Cookies.get(key);
}

export function setFirstLogin(firstlogin) {
  return Cookies.set(key, firstlogin);
}


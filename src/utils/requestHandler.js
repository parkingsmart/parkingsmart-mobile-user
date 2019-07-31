import { Toast } from 'vant';

const _toast = Symbol('_toast');
const [_option, _promise] = [Symbol('_option'), Symbol('_promise')];
const [_errorHandle, _successHandle] = [Symbol('_errorHandle'), Symbol('_successHandle')];

const defaultOption = {
  showMsg: false,
  errorMsg: '系统错误',
  successMsg: null,

  showLoading: false
};

function successHandle() {
  if (this[_option].showMsg && this[_option].successMsg) {
    Toast({
      message: this[_option].successMsg,
      duration: 1000,
      background: '#1989fa'
    });
  }
}

function errorHandle(err) {
  if (this[_option].showMsg) {
    const message = err && err.message ? err.message : this[_option].errorMsg;
    Toast(message);
  }
}

class RequestHandler {
  constructor(promise, option = {}) {
    this[_toast] = Toast;
    this[_promise] = promise;
    this[_option] = Object.assign({}, defaultOption, option);
    this[_errorHandle] = errorHandle;
    this[_successHandle] = successHandle;
  }

  async exec() {
    let ret = null;
    let error = null;

    if (this[_option].showLoading) {
      this[_toast]({
        type: 'loading',
        forbidClick: true,
        duration: 0,
        className: 'van-loading-custom',
      });
    }

    try {
      ret = await this[_promise];
      this[_successHandle]();
    } catch (err) {
      error = err;
      if (error && error.response && error.response.data && typeof(error.response.data) === 'string') {
        error.message = error.response.data;
      }
      this[_errorHandle](err);
    } finally {
      if (this[_option].showLoading) {
        this[_toast].clear();
      }
    }

    if (error) {
      return Promise.reject(error);
    } else {
      return ret;
    }
  }

  msg(successMsg = null, errorMsg = null) {
    this[_option].showMsg = true;
    this[_option].errorMsg = errorMsg || this[_option].errorMsg;
    this[_option].successMsg = successMsg || this[_option].successMsg;
    return this;
  }

  loading() {
    this[_option].showLoading = true;
    return this;
  }
}

class RequestHandlerFactory {
  constructor(option) {
    this[_option] = option;
  }

  invoke(promise) {
    return new RequestHandler(promise, this[_option]);
  }
}

export default new RequestHandlerFactory();

export function initRequestHandler(option) {
  return new RequestHandlerFactory(option);
}
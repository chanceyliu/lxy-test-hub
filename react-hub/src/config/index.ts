const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

export default class MyPromise {
  private status:any

  private value:any

  private reason:any
  // private xx: any

  constructor(executor:any) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;

    // 成功
    const resolve = (value:any) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
      }
    };

    // 失败
    const reject = (reason:any) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  public then = (onFulfilled:any, onRejected:any) => {
    if (this.status === FULFILLED) {
      onFulfilled(this.value);
    }

    if (this.status === REJECTED) {
      onRejected(this.reason);
    }
  }
}

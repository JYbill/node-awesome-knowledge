/**
 * @Description: TS实现Promise/A+规范
 * @Author: 小钦var
 * @Date: 2023/2/13 16:01
 */
type InitTaskCallbackType<T> = (
  resolve: (data: T) => void,
  reject: (reason: T) => void
) => void;

/**
 * Promise枚举状态
 */
enum PromiseState {
  PENDING = "pending",
  FULFILLED = "fulfilled",
  REJECTED = "rejected",
}

/**
 * Promise实现
 */
export default class XqvPromise<T = any> {
  private status: PromiseState; // 当前Promise状态
  private data: T | null = null;
  private reason: T | null = null;

  constructor(initTask: InitTaskCallbackType<T>) {
    this.status = PromiseState.PENDING; // 初始化状态
    // TODO实现resolve，reject
    initTask(
      () => {},
      () => {}
    );
  }
}

function main() {
  const promise = new XqvPromise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    });
  });
}
main();

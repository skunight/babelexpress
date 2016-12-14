/**
 * created by zzy
 */
export function mixins(...list) {
  return function (target) {
    Object.assign(target.prototype, ...list);
  }
}

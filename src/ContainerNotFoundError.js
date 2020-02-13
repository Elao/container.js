/**
 * Not found service or parameter error for Container
 */
export default class ContainerNotFoundError extends Error {
  /**
   * @param {String} name Definition name
   */
  constructor(name) {
    super(`Service or parameter "${name}" not found.`);
  }
}

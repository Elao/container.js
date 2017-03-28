/**
 * Not found service or parameter error for Container
 */
class ContainerNotFoundError extends Error {
  /**
   * Constructor
   *
   * @param {String} name Service name
   */
  constructor(name) {
    super(`Service or parameter "${name}" not found.`);
  }
}

export default ContainerNotFoundError;

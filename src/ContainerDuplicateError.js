/**
 * Service or parameter already declared for this key error for Container
 */
class ContainerDuplicateError extends Error {
  /**
   * Constructor
   *
   * @param {String} name Service name
   */
  constructor(key, type) {
    super(`A ${type} has already been declared for the key "${key}".`);
  }
}

export default ContainerDuplicateError;

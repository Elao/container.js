/**
 * Service or parameter already declared for this key error for Container
 */
export default class ContainerDuplicateError extends Error {
  /**
   * @param  {String} key  Definition name
   * @param  {String} type Existing definition type
   */
  constructor(key, type) {
    super(`A ${type} has already been declared for the key "${key}".`);
  }
}

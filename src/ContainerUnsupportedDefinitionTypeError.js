/**
 * Definition is not supported
 */
export default class ContainerUnsupportedDefinitionTypeError extends Error {
  /**
   * @param  {String} type Definition type
   */
  constructor(type) {
    super(`Unsupported definition type "${type}".`);
  }
}

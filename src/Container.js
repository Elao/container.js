import ContainerNotFoundError from './ContainerNotFoundError';
import ContainerDuplicateError from './ContainerDuplicateError';
import ContainerUnsupportedDefinitionTypeError from './ContainerUnsupportedDefinitionTypeError';

/**
 * Microscopic dependency injection container
 */
export default class Container {
  /**
   * Contructor
   */
  constructor() {
    this.instances = new Map();
    this.definitions = new Map();

    this.get = this.get.bind(this);
    this.registerDefinition = this.registerService.bind(this);
  }

  /**
   * Register parameter, callback or service
   *
   * @param {String} name
   * @param {Scalar|Function} value
   * @param {Array} dependencies
   * @param {String|String[]} tags
   */
  register(name, value, dependencies = [], tags = []) {
    if (Container.isConstructor(value)) {
      return this.registerService(name, value, dependencies, tags);
    }

    return this.registerParameter(name, value);
  }

  /**
   * Register service
   *
   * @param {String} name
   * @param {Function} classname
   * @param {Array} dependencies
   * @param {String|String[]} tags
   */
  registerService(name, classname, dependencies = [], tags = []) {
    this.ensureUniqueness(name);
    this.definitions.set(name, {
      type: 'service',
      classname,
      name,
      dependencies,
      tags: typeof tags === 'string' ? [tags] : tags
    });
  }

  /**
   * Register service callback
   *
   * @param {String} name
   * @param {Function} callback
   * @param {Array} dependencies
   * @param {String|String[]} tags
   */
  registerCallback(name, callback, dependencies = [], tags = []) {
    this.ensureUniqueness(name);
    this.definitions.set(name, {
      type: 'callback',
      callback,
      name,
      dependencies,
      tags: typeof tags === 'string' ? [tags] : tags
    });
  }

  /**
   * Register parameter
   *
   * @param {String} name
   * @param {mixed} value
   */
  registerParameter(name, value) {
    this.ensureUniqueness(name);
    this.definitions.set(name, { type: 'parameter', value });
  }

  /**
   * Ensure that the given key is not used by a definition or a parameter
   *
   * @param {String} name
   *
   * @throw {ContainerDuplicateError}
   */
  ensureUniqueness(name) {
    if (this.definitions.has(name)) {
      throw new ContainerDuplicateError(name, this.definitions.get(name).type);
    }
  }

  /**
   * Get parameter or service identified by its name
   *
   * @param {String} name
   *
   * @return {mixed}
   */
  get(name) {
    const instance = this.instances.get(name);

    if (instance !== undefined) {
      return instance;
    }

    if (this.definitions.has(name)) {
      const definition = this.definitions.get(name);

      switch (definition.type) {
        case 'parameter':
          return definition.value;

        case 'callback':
          return this.resolveCallback(definition);

        case 'service':
          return this.resolveService(definition);

        default:
          throw new ContainerUnsupportedDefinitionTypeError(definition.type)
      }
    }

    throw new ContainerNotFoundError(name);
  }

  /**
   * Get services for a given tag.
   *
   * @param {String} tag
   *
   * @return {Array}
   */
  getTaggedServices(tag) {
    return Array
      .from(this.definitions.values())
      .filter(definition => definition.type !== 'parameter' && definition.tags.includes(tag))
      .map(definition => definition.name)
    ;
  }

  /**
   * Resolve service definition
   *
   * @param {Object} definition
   *
   * @return {mixed}
   */
  resolveService(definition) {
    const dependencies = definition.dependencies.map(this.get);
    const Constructor = definition.classname;
    const service = new Constructor(...dependencies);

    this.instances.set(definition.name, service);

    return service;
  }

  /**
   * Resolve callback definition
   *
   * @param {Object} definition
   *
   * @return {mixed}
   */
  resolveCallback(definition) {
    const dependencies = definition.dependencies.map(this.get);
    const service = definition.callback(...dependencies);

    this.instances.set(definition.name, service);

    return service;
  }

  /**
   * Is the given function a class constructor?
   *
   * @param {Function} classname
   *
   * @return {Boolean}
   */
  static isConstructor(classname) {
    return typeof classname === 'function';
  }
}

const { Container } = require('../container.js');

describe('Container', () => {
    const container = new Container();
    const instances = {
        MyClass: 0,
        BarClass: 0,
        myCallback: 0,
    };
    const myCallback = function foo(bar) { instances.myCallback++; return { bar }; };
    class MyClass { constructor() { instances.MyClass++; } }
    class BarClass { constructor() { instances.BarClass++; } }

    container.registerParameter('my:parameter', 'foo');
    container.registerService('my:class', MyClass, [], ['foo_tag']);
    container.registerService('bar', BarClass, ['my:class'], ['foo_tag', 'bar_tag']);
    container.registerCallback('my:callback', myCallback, ['my:parameter']);

    describe('Container.get()', () => {
        test('Class should only be instancieted once', () => {
            expect(instances.MyClass).toEqual(0);
            container.get('my:class');
            container.get('my:class')
            expect(instances.MyClass).toEqual(1);
        });

        test('Callbacks should only be called once', () => {
            expect(instances.myCallback).toEqual(0);
            container.get('my:callback');
            container.get('my:callback')
            expect(instances.myCallback).toEqual(1);
        });

        test('should return the expected parameter when asked for', () => {
            expect(container.get('my:parameter')).toEqual('foo');
        });

        test('should return the expected service when asked for', () => {
            expect(container.get('my:class')).toBeInstanceOf(MyClass);
        });

        test('should throw an error if an unexisting service or param is accessed', () => {
            expect(() => {
                container.get('unexisting:service');
            }).toThrowError('Service or parameter "unexisting:service" not found.');
        });
    });

    describe('Container.getTaggedServices()', () => {
        test('should return all services with a given tag', () => {
            expect(container.getTaggedServices('foo_tag')).toEqual(['my:class', 'bar']);
            expect(container.getTaggedServices('bar_tag')).toEqual(['bar']);
        });

        test('should return an empty array on undefined tag', () => {
            expect(container.getTaggedServices('foobar')).toEqual([]);
        });
    });

    describe('Container.isConstructor()', () => {
        test('Should return true for a constructor', () => {
            class Foo { constructor(a) {} }
            expect(Container.isConstructor(Foo)).toEqual(true);
        });
        test('Should return false for a string', () => {
            expect(Container.isConstructor('foo')).toEqual(false);
        });
    });
});

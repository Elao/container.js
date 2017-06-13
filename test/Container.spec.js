import Container from '../src/Container';

describe('Container', () => {
    const container = new Container();
    class MyClass { }
    class BarClass { }
    container.registerDefinition('my:class', MyClass, [], ['foo_tag']);
    container.registerDefinition('bar', BarClass, [], ['foo_tag', 'bar_tag']);

    describe('Container.get()', () => {
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
            expect(container.getTaggedServices('foo_tag')).toEqual([
                { classname: MyClass, dependencies: [], name: 'my:class', tags: ['foo_tag'] },
                { classname: BarClass, dependencies: [], name: 'bar', tags: ['foo_tag', 'bar_tag'] }
            ]);
            expect(container.getTaggedServices('bar_tag')).toEqual([
                { classname: BarClass, dependencies: [], name: 'bar', tags: ['foo_tag', 'bar_tag'] }
            ]);
        });

        test('should return an empty array on undefined tag', () => {
            expect(container.getTaggedServices('foobar')).toEqual([]);
        });
    });
});

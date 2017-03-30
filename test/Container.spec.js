import Container from '../src/Container';

describe('Container', () => {
    let container = new Container();
    class MyClass { }
    container.registerDefinition('my:class', MyClass);

    describe('Container.get()', () => {
        test('should return the expected service when asked for', () => {
            expect(container.get('my:class') instanceof MyClass).toBeTruthy;
        });

        test('should throw an error if an unexisting service or param is accessed', () => {
            expect(() => {
                container.get('unexisting:service')
            }).toThrowError('Service or parameter "unexisting:service" not found.');
        });
    });
});

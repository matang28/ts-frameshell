# ts-frameshell
A controller based approach for command line apps in typescript and Node.js

## Example
```typescript
export class TestController1 {

    @CommandEndpoint("test1", "TestController1 - testCommand1",
        [arg("arg1")])
    testCommand1(request: ICommandRequest): void {
        ... Code ...
    }

    @CommandEndpoint("test2", "TestController1 - testCommand2",
        [], [flag("p", "pretty", "Prettify result")])
    testCommand2(request: ICommandRequest): void {
        ... Code ...
    }
}
```

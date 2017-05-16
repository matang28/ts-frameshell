import {ICommandRequest} from "../../../../main/commands/definitions/ICommandRequest";
import {CommandEndpoint} from "../../../../main/framework/decorators/CommandEndpoint";
import {arg, flag} from "../../../../main/framework/decorators/CommandGrammer";
import {BaseTestController} from "./BaseTestController";

export class TestController1 extends BaseTestController{

    @CommandEndpoint("test1", "TestController1 - testCommand1",
        [arg("arg1")])
    testCommand1(request: ICommandRequest): void {
        this._delegate("testCommand1", request);
    }

    @CommandEndpoint("test2", "TestController1 - testCommand2",
        [], [flag("p", "pretty", "Prettify result")])
    testCommand2(request: ICommandRequest): void {
        this._delegate("testCommand2", request);
    }


}
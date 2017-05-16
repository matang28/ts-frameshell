import {ICommandRequest} from "../../../main/commands/definitions/ICommandRequest";
import {CommandEndpoint} from "../../../main/framework/decorators/CommandEndpoint";
import {arg, option} from "../../../main/framework/decorators/CommandGrammer";
import {BaseTestController} from "./BaseTestController";

export class TestController2 extends BaseTestController{

    @CommandEndpoint("test10", "TestController2 - testCommand1",
        [arg("arg1", "optional")])
    testCommand1(request: ICommandRequest): void {
        this._delegate("testCommand1", request);
    }

    @CommandEndpoint("test11", "TestController2 - testCommand2",
        [], [option("p", "port", "The port input")])
    testCommand2(request: ICommandRequest): void {
        this._delegate("testCommand2", request);
    }

}
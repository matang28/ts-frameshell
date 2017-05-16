import {suite,test} from "mocha-typescript"
import {assert} from "chai"
import {FrameShellSingleton} from "../../../main/framework/core/FrameShellSingleton";
import {ICommandBuilder} from "../../../main/commands/core/ICommandBuilder";

@suite("FrameShell Singleton tests")
class FrameShellSingletonTest{

    @test("Should get the same instance every time") testSingleton1(){

        //Arrange:
        let singleton1: ICommandBuilder = FrameShellSingleton["getCommandBuilder"]();
        let singleton2: ICommandBuilder = FrameShellSingleton["getCommandBuilder"]();
        let singleton3: ICommandBuilder = FrameShellSingleton["getCommandBuilder"]();

        //Assert:
        assert.isDefined(singleton1);
        assert.equal(singleton1, singleton2);
        assert.equal(singleton2, singleton3);
    }

}
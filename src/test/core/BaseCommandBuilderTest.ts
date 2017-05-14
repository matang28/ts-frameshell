import {suite,test} from "mocha-typescript"
import {assert} from "chai"
import {BaseCommandBuilder} from "../../main/core/BaseCommandBuilder";
import {ICommandParams} from "../../main/definitions/ICommandParams";

/**
 * Just a mock builder
 */
class TestCommandBuilder extends BaseCommandBuilder{
    build(argv: string[]) {
    }
}

@suite("BaseCommandBuilder Tests")
class BaseCommandBuilderTest{

    @test("Add valid command") validCommand1(){

        //Arrange:
        let underTest: TestCommandBuilder = new TestCommandBuilder("1.0");

        let cmd: ICommandParams = {
            name: "test",
            options: [],
            arguments: [{name: "Arg1"}, {name: "Arg2"}, {name: "Arg3", variadic: true}]
        };

        //Act:
        underTest.addCommand(cmd, null);

    }

    @test("Add invalid command - Two optionals") invalidCommand1(){

        //Arrange:
        let underTest: TestCommandBuilder = new TestCommandBuilder("1.0");

        let cmd: ICommandParams = {
            name: "test",
            options: [],
            arguments: [{name: "Arg1", optional: true}, {name: "Arg2", optional: true}]
        };

        //Act:
        try{
            underTest.addCommand(cmd, null);
            assert.fail();
        }
        catch (ex){
            assert.equal(ex, "A command cannot have two optional arguments, You may have at-most 1 optional argument and it's has to be in the last position.");
        }

    }

    @test("Add invalid command - Optional at wrong position") invalidCommand2(){

        //Arrange:
        let underTest: TestCommandBuilder = new TestCommandBuilder("1.0");

        let cmd: ICommandParams = {
            name: "test",
            options: [],
            arguments: [{name: "Arg1", optional: true}, {name: "Arg2"}]
        };

        //Act:
        try{
            underTest.addCommand(cmd, null);
            assert.fail();
        }
        catch (ex){
            assert.equal(ex, "A command cannot have two optional arguments, You may have at-most 1 optional argument and it's has to be in the last position.");
        }

    }

}
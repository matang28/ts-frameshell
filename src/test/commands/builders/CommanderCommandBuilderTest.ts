import {suite} from "mocha-typescript";
import {test} from "mocha-typescript";
import {assert} from "chai";
import {ICommandArgument} from "../../../main/commands/definitions/ICommandArgument";
import {CommanderCommandBuilder} from "../../../main/commands/builders/CommanderCommandBuilder";
import {ICommandOption} from "../../../main/commands/definitions/ICommandOption";
import {ICommandParams} from "../../../main/commands/definitions/ICommandParams";
import {ICommandItem} from "../../../main/commands/core/ICommandItem";
import {ICommandRequest} from "../../../main/commands/definitions/ICommandRequest";

@suite("Commander plugin - parseSingleArgument() tests")
class CommanderBuilderParseSingleArgumentTest {

    @test("Mandatory, Simple") parseSingleArgument1() {

        //Arrange:
        let input: ICommandArgument = {
            name: "test",
            optional: false,
            variadic: false
        };

        //Act:
        let result: string = CommanderCommandBuilder["parseSingleArgument"](input);

        //Assert:
        assert.equal(result, "<test>");
    }

    @test("Optional, Simple") parseSingleArgument2() {

        //Arrange:
        let input: ICommandArgument = {
            name: "test",
            optional: true,
            variadic: false
        };

        //Act:
        let result: string = CommanderCommandBuilder["parseSingleArgument"](input);

        //Assert:
        assert.equal(result, "[test]");
    }

    @test("Mandatory, Variadic") parseSingleArgument3() {

        //Arrange:
        let input: ICommandArgument = {
            name: "test",
            optional: false,
            variadic: true
        };

        //Act:
        let result: string = CommanderCommandBuilder["parseSingleArgument"](input);

        //Assert:
        assert.equal(result, "<test...>");
    }

    @test("Optional, Variadic") parseSingleArgument4() {

        //Arrange:
        let input: ICommandArgument = {
            name: "test",
            optional: true,
            variadic: true
        };

        //Act:
        let result: string = CommanderCommandBuilder["parseSingleArgument"](input);

        //Assert:
        assert.equal(result, "[test...]");
    }

    @test("Default optional value") parseSingleArgument5() {

        //Arrange:
        let input: ICommandArgument = {
            name: "test",
            variadic: false
        };

        //Act:
        let result: string = CommanderCommandBuilder["parseSingleArgument"](input);

        //Assert:
        assert.equal(result, "<test>");
    }

    @test("Default variadic value") parseSingleArgument6() {

        //Arrange:
        let input: ICommandArgument = {
            name: "test",
        };

        //Act:
        let result: string = CommanderCommandBuilder["parseSingleArgument"](input);

        //Assert:
        assert.equal(result, "<test>");
    }

}

@suite("Commander plugin - toArgumentsString() tests")
class CommanderBuilderToArgumentStringTest {

    @test("With one argument") toArgumentString1() {

        //Arrange:
        let input: ICommandArgument[] = [{name: "test"}];

        //Act:
        let result: string = CommanderCommandBuilder["toArgumentsString"](input);

        //Assert:
        assert.equal(result, "<test>");
    }

    @test("With two arguments") toArgumentString2() {

        //Arrange:
        let input: ICommandArgument[] = [{name: "test1"}, {name: "test2"}];

        //Act:
        let result: string = CommanderCommandBuilder["toArgumentsString"](input);

        //Assert:
        assert.equal(result, "<test1> <test2>");
    }

    @test("With three arguments") toArgumentString3() {

        //Arrange:
        let input: ICommandArgument[] = [{name: "test1"}, {name: "test2"}, {
            name: "test3",
            optional: true,
            variadic: true
        }];

        //Act:
        let result: string = CommanderCommandBuilder["toArgumentsString"](input);

        //Assert:
        assert.equal(result, "<test1> <test2> [test3...]");
    }

}

@suite("Commander plugin - toOptionString() tests")
class CommanderBuilderToOptionStringTest {

    @test("Option with no input") toOptionString1() {

        //Arrange:
        let input: ICommandOption = {short: "p", long: "port", flag: true};

        //Act:
        let result: string = CommanderCommandBuilder["toOptionString"](input);

        //Assert:
        assert.equal(result, "-p --port");
    }

    @test("Option with input") toOptionString2() {

        //Arrange:
        let input: ICommandOption = {short: "p", long: "port", flag: false};

        //Act:
        let result: string = CommanderCommandBuilder["toOptionString"](input);

        //Assert:
        assert.equal(result, "-p --port [input]");
    }

    @test("Option without flag field - Default is flag") toOptionString3() {

        //Arrange:
        let input: ICommandOption = {short: "p", long: "port"};

        //Act:
        let result: string = CommanderCommandBuilder["toOptionString"](input);

        //Assert:
        assert.equal(result, "-p --port");
    }

}

@suite("Commander plugin - toCommandString() tests")
class CommanderBuilderToCommandStringTest {

    @test("Command without arguments") toCommandString1() {

        //Arrange:
        let input: ICommandParams = {
            name: "test"
        };

        //Act:
        let result: string = CommanderCommandBuilder["toCommandString"](input);

        //Assert:
        assert.equal(result, "test");
    }

    @test("Command with 1 argument") toCommandString2() {

        //Arrange:
        let input: ICommandParams = {
            name: "test",
            arguments: [{name: "arg1"}]
        };

        //Act:
        let result: string = CommanderCommandBuilder["toCommandString"](input);

        //Assert:
        assert.equal(result, "test <arg1>");
    }

    @test("Command with 2 argument") toCommandString3() {

        //Arrange:
        let input: ICommandParams = {
            name: "test",
            arguments: [{name: "arg1"},
                {name: "arg2"}]
        };

        //Act:
        let result: string = CommanderCommandBuilder["toCommandString"](input);

        //Assert:
        assert.equal(result, "test <arg1> <arg2>");
    }
}

@suite("Commander plugin - Integration tests")
class CommanderBuilderIntegrationTest {

    static toArgv(cmd: string){
        return ["node path", "exec path", ...cmd.split(" ")];
    }

    @test("Check initial state") integration1() {

        //Arrange:
        let underTest: CommanderCommandBuilder = new CommanderCommandBuilder("1.0.0");

        //Act:
        let version: string = underTest.getVersion();
        let commands: Array<ICommandItem> = underTest.getCommands();

        //Assert:
        assert.equal(version, "1.0.0");
        assert.equal(commands.length, 0);
    }

    @test("Check command with no arguments/options") integration2(done) {

        //Arrange:
        let underTest: CommanderCommandBuilder = new CommanderCommandBuilder("1.0.0");

        underTest.addCommand({
                name: "print1"
            },
            (r: ICommandRequest) => {
                assert.equal(r.options.size, 0);
                assert.equal(r.arguments.size, 0);
                done();
            });

        //Act:
        underTest.build(CommanderBuilderIntegrationTest.toArgv("print1"));
    }

    @test("Check command with options (flags), no arguments") integration3(done) {

        //Arrange:
        let underTest: CommanderCommandBuilder = new CommanderCommandBuilder("1.0.0");

        underTest.addCommand({
                name: "print2",
                options: [{short: "p" , long: "port"}, {short: "h" , long: "host"}]
            },
            (r: ICommandRequest) => {
                assert.equal(r.options.size, 2);

                assert.isFalse(r.options.get("port"));

                assert.isTrue(r.options.get("host"));

                done();
            });

        //Act:
        underTest.build(CommanderBuilderIntegrationTest.toArgv("print2 -h"));
    }

    @test("Check command with options (not flags), no arguments") integration4(done) {

        //Arrange:
        let underTest: CommanderCommandBuilder = new CommanderCommandBuilder("1.0.0");

        underTest.addCommand({
                name: "print3",
                options: [{short: "p" , long: "port", flag: false}, {short: "h" , long: "host", flag: false}]
            },
            (r: ICommandRequest) => {
                assert.equal(r.options.size, 2);

                assert.equal(r.options.get("port"), "8080");

                assert.equal(r.options.get("host"), "127.0.0.1");

                done();
            });

        //Act:
        underTest.build(CommanderBuilderIntegrationTest.toArgv("print3 -h 127.0.0.1 -p 8080"));
    }

    @test("Check command with arguments (mandatory, variadic(0)), no options") integration5(done) {

        //Arrange:
        let underTest: CommanderCommandBuilder = new CommanderCommandBuilder("1.0.0");

        underTest.addCommand({
                name: "print4",
                arguments: [{name: "msg"}, {name: "formatting", optional: true, variadic: true}]
            },
            (r: ICommandRequest) => {
                assert.equal(r.arguments.size, 2);
                assert.equal(r.arguments.get("msg"), "hello");
                assert.equal(r.arguments.get("formatting").length, 0);
                done();
            });

        //Act:
        underTest.build(CommanderBuilderIntegrationTest.toArgv("print4 hello"));
    }

    @test("Check command with arguments (mandatory, variadic(2)), no options") integration6(done) {

        //Arrange:
        let underTest: CommanderCommandBuilder = new CommanderCommandBuilder("1.0.0");

        underTest.addCommand({
                name: "print5",
                arguments: [{name: "msg"}, {name: "formatting", optional: true, variadic: true}]
            },
            (r: ICommandRequest) => {
                assert.equal(r.arguments.size, 2);
                assert.equal(r.arguments.get("msg"), "hello");
                assert.equal(r.arguments.get("formatting").length, 2);
                assert.equal(r.arguments.get("formatting")[0], "f1");
                assert.equal(r.arguments.get("formatting")[1], "f2");
                done();
            });

        //Act:
        underTest.build(CommanderBuilderIntegrationTest.toArgv("print5 hello f1 f2"));
    }

    @test("Check command with all features") integration7(done) {

        //Arrange:
        let underTest: CommanderCommandBuilder = new CommanderCommandBuilder("1.0.0");

        underTest.addCommand({
                name: "print6",
                arguments: [{name: "msg"}, {name: "formatting", optional: true, variadic: true}],
                options: [{short: "p" , long: "port"}, {short: "h" , long: "host", flag: false}]
            },
            (r: ICommandRequest) => {
                assert.equal(r.arguments.size, 2);
                assert.equal(r.arguments.get("msg"), "hello");
                assert.equal(r.arguments.get("formatting").length, 2);
                assert.equal(r.arguments.get("formatting")[0], "f1");
                assert.equal(r.arguments.get("formatting")[1], "f2");

                assert.equal(r.options.size, 2);
                assert.equal(r.options.get("port"), true);
                assert.equal(r.options.get("host"), "127.0.0.1");

                done();
            });

        //Act:
        underTest.build(CommanderBuilderIntegrationTest.toArgv("print6 -p -h 127.0.0.1 hello f1 f2"));
    }
}
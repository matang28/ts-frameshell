import {test, suite} from "mocha-typescript";
import {assert} from "chai"
import {FrameShellSingleton} from "../../../main/framework/core/FrameShellSingleton";
import {BaseTestController} from "./BaseTestController";
import {ICommandDelegate} from "./ICommandDelegate";
import {TestController1} from "./TestController1";
import {ICommandRequest} from "../../../main/commands/definitions/ICommandRequest";
import {TestController2} from "./TestController2";

@suite("FrameShell integration tests - Single controller setup")
class SingleControllerTest{

    cnt1: TestController1 = new TestController1("1", "2");

    after(){
        //Clean the delegate after each test:
        this.cnt1.delegate = TestUtils.clearDelegate();
    }

    @test("Should invoke TestController1.testCommand1()") integration1(done){

        //Arrange:
        let argv: string[] = TestUtils.buildArgv("test1 my_arg");

        //Act/Assert:
        TestUtils.buildTestSubject(argv, [this.cnt1], (name: string, req: ICommandRequest)=>{

            assert.equal(name, "testCommand1");
            assert.isDefined(req);

            assert.equal(req.arguments.get("arg1"), "my_arg");
            done();
        });

    }

    @test("Should invoke TestController1.testCommand2() with optional") integration2(done){

        //Arrange:
        let argv: string[] = TestUtils.buildArgv("test2 -p");

        //Act/Assert:
        TestUtils.buildTestSubject(argv, [this.cnt1], (name: string, req: ICommandRequest)=>{

            assert.equal(name, "testCommand2");
            assert.isDefined(req);

            assert.equal(req.options.get("pretty"), true);
            done();
        });

    }

    @test("Should invoke TestController1.testCommand2() without optional") integration3(done){

        //Arrange:
        let argv: string[] = TestUtils.buildArgv("test2");

        //Act/Assert:
        TestUtils.buildTestSubject(argv, [this.cnt1], (name: string, req: ICommandRequest)=>{

            assert.equal(name, "testCommand2");
            assert.isDefined(req);

            assert.equal(req.options.get("pretty"), false);
            done();
        });

    }

}

@suite("FrameShell integration tests - Multiple controller setup")
class MultipleControllerTest {

    cnt1: TestController1 = new TestController1("1", "2");
    cnt2: TestController2 = new TestController2("3", "4");

    after(){
        //Clean the delegate after each test:
        this.cnt1.delegate = TestUtils.clearDelegate();
        this.cnt2.delegate = TestUtils.clearDelegate();
    }

    @test("Should invoke TestController1.testCommand1()") integration1(done) {

        //Arrange:
        let argv: string[] = TestUtils.buildArgv("test1 my_arg");

        //Act/Assert:
        TestUtils.buildTestSubject(argv, [this.cnt1, this.cnt2], (name: string, req: ICommandRequest) => {

            assert.equal(name, "testCommand1");
            assert.isDefined(req);

            assert.equal(req.arguments.get("arg1"), "my_arg");

            done();
        });

    }

    @test("Should invoke TestController1.testCommand2()") integration2(done){

        //Arrange:
        let argv: string[] = TestUtils.buildArgv("test2 -p");

        //Act/Assert:
        TestUtils.buildTestSubject(argv, [this.cnt1, this.cnt2], (name: string, req: ICommandRequest)=>{

            assert.equal(name, "testCommand2");
            assert.isDefined(req);

            assert.equal(req.options.get("pretty"), true);
            done();
        });
    }

    @test("Should invoke TestController2.testCommand1() with argument") integration3(done){

        //Arrange:
        let argv: string[] = TestUtils.buildArgv("test10 my_opt_arg");

        //Act/Assert:
        TestUtils.buildTestSubject(argv, [this.cnt1, this.cnt2], (name: string, req: ICommandRequest)=>{

            assert.equal(name, "testCommand1");
            assert.isDefined(req);

            assert.equal(req.arguments.get("arg1"), "my_opt_arg");
            done();
        });
    }

    @test("Should invoke TestController2.testCommand1() without argument") integration4(done){

        //Arrange:
        let argv: string[] = TestUtils.buildArgv("test10");

        //Act/Assert:
        TestUtils.buildTestSubject(argv, [this.cnt1, this.cnt2], (name: string, req: ICommandRequest)=>{

            assert.equal(name, "testCommand1");
            assert.isDefined(req);

            assert.isTrue(req.arguments.get("arg1")==null);
            done();
        });
    }

    @test("Should invoke TestController2.testCommand2()") integration5(done){

        //Arrange:
        let argv: string[] = TestUtils.buildArgv("test11 -p 1020");

        //Act/Assert:
        TestUtils.buildTestSubject(argv, [this.cnt1, this.cnt2], (name: string, req: ICommandRequest)=>{

            assert.equal(name, "testCommand2");
            assert.isDefined(req);

            assert.equal(req.options.get("port"), "1020");
            done();
        });
    }

    @test("Should not invoke anything") integration6(done){

        //Arrange:
        let argv: string[] = TestUtils.buildArgv("unknown");

        //Act/Assert:
        TestUtils.buildTestSubject(argv, [this.cnt1, this.cnt2], (name: string, req: ICommandRequest)=>{
            assert.fail();
        });

        setTimeout(done, 100);
    }
}

module TestUtils{

    export function buildTestSubject(argv: string[], controllers: BaseTestController[], delegate: ICommandDelegate){

        //Assign the command delegate to each controller:
        controllers.forEach(cnt=>{
            cnt.delegate = delegate;
        });

        //Run the framework:
        FrameShellSingleton.run("0", argv, controllers);

    }

    export function buildArgv(cmd: string): string[]{

        let arr: string[] = cmd.split(" ");

        arr.unshift("node path");
        arr.unshift("program path");

        return arr;
    }

    export function clearDelegate():ICommandDelegate{return ()=>{}}

}
import "reflect-metadata";
import {ICommandBuilder} from "../../commands/core/ICommandBuilder";
import {CommanderCommandBuilder} from "../../commands/builders/CommanderCommandBuilder";
import {ICommandDescriptor} from "./ICommandDescriptor";
import {COMMAND_METADATA_KEY} from "../decorators/CommandEndpoint";

/**
 * A simple singleton object to wrap the command builder functionality.
 */
export class FrameShellSingleton {

    private static commandBuilder: ICommandBuilder = null;

    /**
     * Use this method to provide an implementation to {@link ICommandBuilder}.
     * @returns an implementation to {@link ICommandBuilder}.
     */
    private static provideCommandBuilder(version: string): ICommandBuilder{
        return new CommanderCommandBuilder(version);
    }

    /**
     * Gets the singleton instance of the command builder.
     * @returns {ICommandBuilder}
     */
    public static getCommandBuilder(): ICommandBuilder{

        if(null==this.commandBuilder){
            this.commandBuilder = FrameShellSingleton.provideCommandBuilder("0");
        }

        return this.commandBuilder;
    }

    /**
     * Will run the FrameShell framework, should be called from a main script.
     * @param version the version of the API.
     * @param argv the arguments sent to the node.js executable (usually using process.argv)
     * @param controllers a list of INITIALIZED controllers, by controllers I mean classes that contains method decorated with @CommandEndpoint(...)
     */
    public static run(version: string, argv: string[], controllers: any[]): void{

        //Set the version of the API:
        FrameShellSingleton.getCommandBuilder().setVersion(version);

        //For each controller in the list:
        controllers.forEach(controller=>{

            //Get the commands metadata:
            let commands: ICommandDescriptor[] = Reflect.getMetadata(COMMAND_METADATA_KEY, controller) || [];

            //For each command:
            commands.forEach(cmd=>{

                //Add using the command builder:
                FrameShellSingleton.getCommandBuilder().addCommand(
                    cmd.params,
                    //We are using bind() to attach the method to calling instance, so we can have the context when the method is invoked.
                    controller[cmd.methodName].bind(controller)
                );
            });
        });

        //Finally we are ready to build the program:
        FrameShellSingleton.getCommandBuilder().build(argv);
    }

}

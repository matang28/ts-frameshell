import {ICommandBuilder} from "../../commands/core/ICommandBuilder";
import {CommanderCommandBuilder} from "../../commands/builders/CommanderCommandBuilder";

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

    public static run(version: string, argv: string[]): void{
        FrameShellSingleton.getCommandBuilder().setVersion(version);
        FrameShellSingleton.getCommandBuilder().build(argv);
    }

}

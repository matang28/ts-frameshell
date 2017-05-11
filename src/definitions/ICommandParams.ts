import {ICommandArgument} from "./ICommandArgument";
import {ICommandOption} from "./ICommandOption";

/**
 * Definition to how command should be built.
 */
export interface ICommandParams{

    /**
     * The name of the command.
     */
    name: string;

    /**
     * The description of the command.
     */
    description: string;

    /**
     * An array of the command's arguments.
     */
    arguments?: Array<ICommandArgument>;

    /**
     * An array of the command's options.
     */
    options? : Array<ICommandOption>;

}
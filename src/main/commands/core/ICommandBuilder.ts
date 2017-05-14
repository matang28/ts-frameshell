import {ICommandParams} from "../definitions/ICommandParams";
import {ICommandRequest} from "../definitions/ICommandRequest";
import {ICommandItem} from "./ICommandItem";

/**
 * The shape of future command builders.
 */
export interface ICommandBuilder{

    /**
     * Adds a command to the context.
     * @param cmd the command params.
     * @param cb a function to act on the command.
     */
    addCommand(cmd: ICommandParams, cb: (request: ICommandRequest) => void): void;

    /**
     * Will return an array of all registered commands.
     */
    getCommands(): Array<ICommandItem>;

    /**
     * Will return the version of the CLI.
     */
    getVersion(): string;

    /**
     * Builds the CLI.
     * @param argv the process argv.
     */
    build(argv: string[]);

}
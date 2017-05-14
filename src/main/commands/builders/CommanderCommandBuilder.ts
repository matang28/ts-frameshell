import {BaseCommandBuilder} from "../core/BaseCommandBuilder";
import {ICommandArgument} from "../definitions/ICommandArgument";
import {ICommandOption} from "../definitions/ICommandOption";
import {ICommandRequest} from "../definitions/ICommandRequest";
import {ICommandParams} from "../definitions/ICommandParams";
import * as commander from "commander";

/**
 * A command builder that uses the great Commander.js library to build command line tools.
 */
export class CommanderCommandBuilder extends BaseCommandBuilder {

    build(argv: string[]): void {

        //Set the version of the tool:
        commander.version(this.getVersion());

        //Register each on of the commands:
        this.getCommands().forEach(cmd => {

            //Parse the command:
            let command = commander.command(
                CommanderCommandBuilder.toCommandString(cmd.params), //Command string
                cmd.params.description //Command description
            );

            //Parse the command options:
            cmd.params.options.forEach(opt => {
                command = command.option(CommanderCommandBuilder.toOptionString(opt), opt.description);
            });

            //Assign the callback:
            command = command.action((...result: any[]) => {
                cmd.action(CommanderCommandBuilder.parseCommandRequest(cmd.params, result));
            });
        });

        //Finally let it parse the argv:
        commander.parse(argv);
    }

    /**
     * Converts the {@link ICommandParams} object to commander's like command string.
     * @param cmdParams
     * @returns {string}
     */
    private static toCommandString(cmdParams: ICommandParams): string {

        let args: string = CommanderCommandBuilder.toArgumentsString(cmdParams.arguments);

        if (args == "") {
            return cmdParams.name;
        }
        else {
            return [cmdParams.name, args].join(" ");
        }

    }


    /**
     * Converts the commander's callback result to {@link ICommandRequest} object.
     * @param cmdParams the command parameters.
     * @param result the command's callback result.
     * @returns {@link ICommandRequest} object.
     */
    private static parseCommandRequest(cmdParams: ICommandParams, result: any[]): ICommandRequest {

        let argumentsMap: Map<string, string> = new Map();
        let optionsMap: Map<string, string | boolean> = new Map();

        //The last item will be the command object:
        let rawCommand = result.pop();

        //For each one of the params options:
        cmdParams.options.forEach(opt => {
            if (rawCommand[opt.long]) {
                optionsMap.set(opt.long, rawCommand[opt.long]);
            }
            else {
                optionsMap.set(opt.long, false);
            }

        });

        // The remaining items in the array are the arguments
        let argSize = cmdParams.arguments.length || 0;
        let i: number;

        for (i = 0; i < argSize; i++) {
            argumentsMap.set(cmdParams.arguments[i].name, result[i]);
        }

        //Finally return the command request object:
        return {
            arguments: argumentsMap,
            options: optionsMap
        };
    }

    /**
     * Converts the {@link ICommandOption} object to Commander like options string.
     * @param opt the {@link ICommandOption} object
     * @returns {string} Commander like option string
     */
    private static toOptionString(opt: ICommandOption) {

        //Each option is formatted as "-p --port [input]""

        let base: string = `-${opt.short} --${opt.long}`;

        //If the option is not a flag add the input placeholder:
        if (null == opt.flag) {
            opt.flag = true;
        }

        base += (opt.flag ? "" : ` [input]`);

        return base;
    }

    /**
     * Converts an array of {@link ICommandArgument} to a string of commander like arguments.
     * @param args an array of {@link ICommandArgument}
     * @returns {string} arguments string
     */
    private static toArgumentsString(args: Array<ICommandArgument>): string {

        let stringsArray: string[] = [];
        let array: Array<ICommandArgument> = args || [];

        //For each argument create parse the argument string and concat them:
        return array
            .map(i => CommanderCommandBuilder.parseSingleArgument(i))
            .join(" ");
    }

    /**
     * Converts a {@link ICommandArgument} to commander like argument string
     * @param arg the {@link ICommandArgument}
     * @returns {string} the argument string
     */
    private static parseSingleArgument(arg: ICommandArgument): string {

        /*Arguments look like the following:
         - Optional uses [arg]
         - Mandatory uses <arg>
         - Variadic uses [arg...]
         */

        let optional: boolean = arg.optional || false;
        let variadic: boolean = arg.variadic || false;

        let name: string = `${arg.name}${variadic ? "..." : ""}`;

        return optional ? `[${name}]` : `<${name}>`;
    }
}
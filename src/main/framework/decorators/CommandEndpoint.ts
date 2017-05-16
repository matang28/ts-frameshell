import "reflect-metadata";
import {ICommandArgument} from "../../commands/definitions/ICommandArgument";
import {ICommandOption} from "../../commands/definitions/ICommandOption";
import {command} from "./CommandGrammer";
import {ICommandDescriptor} from "../core/ICommandDescriptor";

export const COMMAND_METADATA_KEY: string = "__commands__";

/**
 * Defines a new command endpoint.
 * @param name the name of the command
 * @param description the description of the command
 * @param args the array of arguments
 * @param opts the array of options
 */
export function CommandEndpoint(name: string, description?: string, args?: ICommandArgument[], opts?: ICommandOption[]){
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        let commands: ICommandDescriptor[] = Reflect.getMetadata(COMMAND_METADATA_KEY, target) || [];

        commands.push({
            params: command(name, description, args, opts),
            methodName :propertyKey
        });

        Reflect.defineMetadata(COMMAND_METADATA_KEY, commands, target);
    }
}
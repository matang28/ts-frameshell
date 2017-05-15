import {FrameShellSingleton} from "../core/FrameShellSingleton";
import {ICommandArgument} from "../../commands/definitions/ICommandArgument";
import {ICommandOption} from "../../commands/definitions/ICommandOption";
import {command} from "./CommandGrammer";

/**
 * Defines a new command endpoint.
 * @param params the command definition.
 */
export function CommandEndpoint(name: string, description?: string, args?: ICommandArgument[], opts?: ICommandOption[]){
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        if(descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
        }

        let originalMethod = descriptor.value;

        FrameShellSingleton.getCommandBuilder().addCommand(command(name, description, args, opts), originalMethod);
    }
}
import {ICommandArgument} from "../../commands/definitions/ICommandArgument";
import {ICommandOption} from "../../commands/definitions/ICommandOption";
import {ICommandParams} from "../../commands/definitions/ICommandParams";

export function command(name: string, description?: string, args?: ICommandArgument[], opts?: ICommandOption[]): ICommandParams{
    return {
        name: name,
        arguments: args,
        options: opts,
        description: description
    }
}

export function flag(short: string, long: string, description?: string): ICommandOption{
    return {
        short: short,
        long: long,
        description: description,
        flag: true
    };
}

export function option(short: string, long: string, description?: string): ICommandOption{
    return {
        short: short,
        long: long,
        description: description,
        flag: false
    };
}

export function arg(name: string, type?: "simple" | "optional" | "variadic"): ICommandArgument{

    let result: ICommandArgument = {name: name, optional: false, variadic: false};

    if(type){

        if("simple"==type){
            result["optional"] = false;
            result["variadic"] = false;
        }
        else if("optional"==type){
            result["optional"] = true;
            result["variadic"] = false;
        }
        else if("variadic"==type){
            result["optional"] = true;
            result["variadic"] = true;
        }
    }

    return result;

}
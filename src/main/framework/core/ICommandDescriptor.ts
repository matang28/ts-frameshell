import {ICommandParams} from "../../commands/definitions/ICommandParams";

export interface ICommandDescriptor{
    params: ICommandParams,
    methodName: string;
}
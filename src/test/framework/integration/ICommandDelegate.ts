import {ICommandRequest} from "../../../main/commands/definitions/ICommandRequest";
export interface ICommandDelegate{
    (methodName: string, request: ICommandRequest);
}
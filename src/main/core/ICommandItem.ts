import {ICommandParams} from "../definitions/ICommandParams";
import {ICommandRequest} from "../definitions/ICommandRequest";

/**
 * Composition of the command's params and a function to work on these params.
 */
export interface ICommandItem{

    /**
     * The command's params:
     */
    params: ICommandParams;

    /**
     * The command's callback function.
     */
    action?: (request: ICommandRequest) => void;
}

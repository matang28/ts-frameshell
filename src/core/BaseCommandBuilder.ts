import {ICommandBuilder} from "./ICommandBuilder";
import {ICommandParams} from "../definitions/ICommandParams";
import {ICommandRequest} from "../definitions/ICommandRequest";
import {ICommandItem} from "./ICommandItem";

/**
 * An abstract builder that implements the generic methods of the {@link ICommandBuilder}.
 */
export abstract class BaseCommandBuilder implements ICommandBuilder{

    private commandList: Array<ICommandItem>;

    constructor(private version: string){
        this.commandList = [];
    }

    addCommand(cmd: ICommandParams, cb: (request: ICommandRequest) => void): void{
        this.commandList.push({params: cmd, action: cb});
    }

    getCommands(): Array<ICommandItem> {
        return this.commandList;
    }

    getVersion(): string {
        return this.version;
    }

    abstract build(argv: string[]);
}

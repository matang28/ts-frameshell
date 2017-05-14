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
        cmd.options = cmd.options || [];
        cmd.arguments = cmd.arguments || [];

        this.validateCommand(cmd);

        this.commandList.push({params: cmd, action: cb});
    }

    private validateCommand(cmd: ICommandParams): void {

        //If we have arguments:
        if(cmd.arguments.length>0){

            //We need to check that there is no more than 1 optional argument:
            let counter: number = 0;
            cmd.arguments.forEach(item=>{
                if(item.optional) counter++;
            });

            if(counter==0) return;
            else if(counter==1){
                //If we have 1 optional item it should be in the last index:
                if(cmd.arguments[cmd.arguments.length-1].optional){
                   return;
                }
            }

            throw "A command cannot have two optional arguments, You may have at-most 1 optional argument and it's has to be in the last position.";
        }
    }

    getCommands(): Array<ICommandItem> {
        return this.commandList;
    }

    getVersion(): string {
        return this.version;
    }

    abstract build(argv: string[]);
}


export interface ICommandRequest{

    arguments: Map<string,string | string[]>;

    options: Map<string, string | boolean>;

}

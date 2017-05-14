/**
 * Definition of an option of a command
 * Basically we have two types of options:
 *      - Switches - used to configure boolean options.
 *      - Inputs - used to define input params.
 */
export interface ICommandOption{

    /**
     * A one letter that describes the option
     * for example 'p' will be encoded to '-p'
     */
    short: string;

    /**
     * A long representation of the option
     * for example 'port' will be encoded to '--port'
     */
    long: string;

    /**
     * The description of the option, will be shown in the help menu.
     */
    description?: string;

    /**
     * If set to true the option cannot take input params.
     */
    flag?: boolean;

}
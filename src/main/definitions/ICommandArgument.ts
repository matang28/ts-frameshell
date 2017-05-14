/**
 * Definition of an argument of a command.
 */
export interface ICommandArgument{

    /**
     * The name of the argument
     */
    name: string;

    /**
     * Whether the argument is an optional one.
     */
    optional?: boolean;

    /**
     * Whether or not the argument is variadic
     */
    variadic?: boolean;
}

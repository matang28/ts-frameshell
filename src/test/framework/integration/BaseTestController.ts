import {ICommandDelegate} from "./ICommandDelegate";
export abstract class BaseTestController{

    protected _delegate: ICommandDelegate;

    constructor(private _property1: string, private _property2: string) {
    }

    get property1(): string {
        return this._property1;
    }

    get property2(): string {
        return this._property2;
    }

    set delegate(value: ICommandDelegate) {
        this._delegate = value;
    }
}
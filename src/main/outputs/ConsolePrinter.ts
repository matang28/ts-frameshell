export module ConsolePrinter{

    const fgBlack: string = "\x1b[30m";
    const fgRed: string = "\x1b[31m";
    const fgGreen: string = "\x1b[32m";
    const fgYellow: string = "\x1b[33m";
    const fgBlue: string = "\x1b[34m";
    const fgMagenta: string = "\x1b[35m";
    const fgCyan: string = "\x1b[36m";
    const fgWhite: string = "\x1b[37m";

    export function black(...message: any[]): string{
        return [fgBlack, ...message].join("");
    }

    export function red(...message: any[]): string{
        return [fgRed, ...message].join("");
    }

    export function green(...message: any[]): string{
        return [fgGreen, ...message].join("");
    }

    export function yellow(...message: any[]): string{
        return [fgYellow, ...message].join("");
    }

    export function blue(...message: any[]): string{
        return [fgBlue, ...message].join("");
    }

    export function magenta(...message: any[]): string{
        return [fgMagenta, ...message].join("");
    }

    export function cyan(...message: any[]): string{
        return [fgCyan, ...message].join("");
    }

    export function white(...message: any[]): string{
        return [fgWhite, ...message].join("");
    }

    export function printLine(...str: any[]){
        //Add the line break and print:
        print(str, "\n");
    }

    export function print(...str: any[]){
        //Parse each member of the array:
        out(str.join(""));
    }

    function out(str){
        process.stdout.write(str);
    }

}
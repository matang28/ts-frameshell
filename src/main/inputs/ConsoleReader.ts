import {createInterface} from "readline";

export module ConsoleReader{

    const input = createInterface({
        input: process.stdin,
        output: process.stdout
    });

    export async function getLine(message?: string): Promise<string>{
        return await new Promise<string>((resolve, reject)=>{
            try{
                input.question(message, (answer=>{
                    resolve(answer);
                    input.close();
                }));
            }
            catch (ex){
                reject(ex);
            }

        });
    }

}
export declare function cronMethod(info: CliMethodSettings): any;
interface CliMethodSettings {
    cronTime: string | Date;
    runOnInit?: boolean;
    arguments?: any[];
}
export declare function runCron(getInstance?: (target: Object) => any): void;
export {};

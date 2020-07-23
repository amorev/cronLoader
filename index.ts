import { CronJob } from 'cron';

export namespace CronLoader {
    let global = {};

    export function cronMethod(info: CliMethodSettings): any {
        info.arguments = info.arguments || [];
        return (target: object, propertyKey: string, descriptor: PropertyDescriptor) => {
            const storage = getMethodsStorage();
            storage.push({
                info,
                target,
                propertyKey,
                descriptor,
            });
            return descriptor;
        };
    }

    interface CliMethod {
        info: CliMethodSettings;
        target: any;
        propertyKey: string;
        descriptor: PropertyDescriptor;
    }

    interface CliMethodSettings {
        cronTime: string | Date;
        runOnInit?: boolean;
        arguments?: any[];
    }

    export function getMethodsStorage(): CliMethod[] {
        return getCliStorage('cliMethods');
    }

    function getCliStorage(key: string): any {
        if (!(global as any)[key]) {
            (global as any)[key] = [];
        }

        return (global as any)[key];
    }


    export function runCron(getInstance?: (target: Object) => any) {
        getMethodsStorage().forEach(method => {
            let target;
            target = getInstance ? getInstance(method.target) : new method.target.constructor;
            const job = new CronJob(
                method.info.cronTime,
                () => method.descriptor.value.apply(target, method.info.arguments),
                undefined,
                false,
                undefined,
                undefined,
                method.info.runOnInit);
            job.start();
        });
    }
}

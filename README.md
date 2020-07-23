# cronLoader
Cron system for https://github.com/w3tecch/express-typescript-boilerplate

## Description

Sometimes, in our projects, we would like to have cron functionality inside our node.js process.

Using [https://github.com/w3tecch/express-typescript-boilerplate](w3tecch/express-typescript-boilerplate) we can add loader and decorator for this

## Example

Register loader

app.js
```typescript
bootstrapMicroframework({
    /**
     * Loader is a place where you can configure all your modules during microframework
     * bootstrap process. All loaders are executed one by one in a sequential order.
     */
    loaders: [
        // ...other loaders
        cronLoader,
    ],
})
```

And in loader code example

```typescript
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import { CronLoader } from 'w3tech-cronloader';
import { Container } from 'typedi';

export const cronLoader: MicroframeworkLoader = (settings?: MicroframeworkSettings | undefined) => {
    CronLoader.runCron((target) => Container.get(target.constructor));
};

```

And in, near to your cronMethod, you can use decorator

```typescript
import { CronLoader } from 'w3tech-cronloader';
import cronMethod = CronLoader.cronMethod;

export class Handler {
    @cronMethod({
        runOnInit: true,
        cronTime: '* * * * * *',
    })
    public test(): void {
        console.log(1);
    }
}
```

options in CronMethod
cronTime: cron syntax for runing task
runOnInit: run this command on the beginning
arguments: array of arguments for your method;


## Using DI

runCron method has signature
```typescript
function runCron(getInstance?: (target: Object) => any);
```
`getInstance` - method which you can use to connect your DI. 

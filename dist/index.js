"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCron = exports.cronMethod = void 0;
var cron_1 = require("cron");
var collectedData = {};
function cronMethod(info) {
    info.arguments = info.arguments || [];
    return function (target, propertyKey, descriptor) {
        var storage = getMethodsStorage();
        storage.push({
            info: info,
            target: target,
            propertyKey: propertyKey,
            descriptor: descriptor,
        });
        return descriptor;
    };
}
exports.cronMethod = cronMethod;
function getMethodsStorage() {
    return getCliStorage('cliMethods');
}
function getCliStorage(key) {
    if (!collectedData[key]) {
        collectedData[key] = [];
    }
    return collectedData[key];
}
function runCron(getInstance) {
    getMethodsStorage().forEach(function (method) {
        var target;
        target = getInstance ? getInstance(method.target) : new method.target.constructor;
        var job = new cron_1.CronJob(method.info.cronTime, function () { return method.descriptor.value.apply(target, method.info.arguments); }, undefined, false, undefined, undefined, method.info.runOnInit);
        job.start();
    });
}
exports.runCron = runCron;

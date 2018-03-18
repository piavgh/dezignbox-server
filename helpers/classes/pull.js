"use strict";
class Pull{
    constructor(timeout){
        this.timeout = timeout;
        this.pull = [];
        this.state = 'wait';
        this.logLevel = 0;
        this.logInstance = '';
        this.done = this.done.bind(this);
    }
    nextTick(){
        if(this.timeout){
            setTimeout(function(){
                this.runNext();
            }.bind(this), this.timeout);
        } else {
            this.runNext();
        }
    }
    runNext(){
        this.state = 'in-process';
        if(this.logLevel >= 1){
            console.log(this.logInstance + ' : size', this.pull.length);
        }
        this.pull.shift()(this.done);
    }
    done(){
        if(this.logLevel >= 2){
            console.log(this.logInstance + ' : done');
        }

        this.state = 'wait';
        if(this.pull.length){
            this.nextTick();
        }
    }
    reset(){
        this.pull = [];
        this.state = 'wait';
    }
    add(func){
        return new Promise((resolve,reject)=>{
            if(this.logLevel >= 2){
                console.log(this.logInstance + ' : added to pull');
            }
            this.pull.push((done)=>{
                if(this.logLevel >= 2){
                    console.log(this.logInstance + ' : called');
                }
                let value = func(done);
                if(value instanceof Promise){
                    value.then((arg)=>{
                        resolve(arg);
                        done();
                    },(arg)=>{
                        reject(arg);
                        done();
                    });
                } else {
                    resolve(value);
                    done();
                }
            });
            if(this.state === 'wait'){
                this.nextTick();
            }
        });
    }

}

module.exports = Pull;
module.exports = function(arr, iteratee, cb){
    "use strict";
    var isGetError = false;
    let currentIndex = 0;
    var localCallback = function(err){
        if(isGetError)return;
        currentIndex++;
        if(err){
            isGetError = true;
            cb(err);
        } else {
            if(currentIndex === arr.length){
                cb();
            } else {
                iteratee(arr[currentIndex], localCallback);
            }
        }
    };

    if(arr.length === 0){
        return cb();
    }
    iteratee(arr[currentIndex], localCallback);
};
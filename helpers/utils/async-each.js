module.exports = function(arr, iteratee, cb){
    "use strict";
    var isGetError = false;
    var pullSize = arr.length;
    var localCallback = function(err){
        if(isGetError)return;
        pullSize--;
        if(err){
            isGetError = true;
            cb(err);
        } else {
            if(pullSize === 0){
                cb();
            }
        }
    };

    if(arr.length === 0){
        return cb();
    }
    for(var i = 0; i < arr.length; i++){
        iteratee(arr[i], localCallback);
    }
};
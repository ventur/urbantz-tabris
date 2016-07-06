/**
 * Created by daniel on 06/07/16.
 */


var timeFromSeconds = function(duration) {
    var seconds = duration % 60 << 0;
    duration /= 60;
    var minutes = duration % 60 << 0;
    duration /= 60;
    var hours = duration % 24 << 0;
    duration /= 24;
    var days = duration << 0;

    return hours + "h" + minutes + "m";
}

var roundDecimals = function (value, decimals) {
    var rounder = Math.pow(10, decimals);
    return (Math.round(value * rounder) / rounder).toFixed(decimals);
}


module.exports = {
    timeFromSeconds: timeFromSeconds,
    roundDecimals: roundDecimals
}
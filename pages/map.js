var Utils = require('../services/utils')
var moment = require('momentjs')

var round, page, ready = false;

function init(_data) {
    round = _data.round
    page = new tabris.Page({
        title: 'Map'
    });
    ready = true;
    console.log('isReady')
}

function open() {
    var map = tabris.create("ESMap", {
        layoutData: {left: 0, right: 0, top: 0, bottom: 0}
    }).on("ready", function() {
        var m = this;
        round.stops.forEach(function(stop) {
            if (stop.stopType === 0) {
                m.createMarker({
                    id: stop.parcel,
                    latLng: [stop.coordinates[1], stop.coordinates[0]],
                    title: stop.parcel,
                    color:"blue"
                }).on("tap", function() {
                    console.log(this.id);
                });
            }
        })
        this.set("center", [round.stops[1].coordinates[1], round.stops[1].coordinates[0]]);
        this.set("zoom", 13);
    }).appendTo(page);

    page.open();
}


module.exports = {
    init: init,
    getPage: page,
    open: open
};
var Utils = require('../services/utils')
var moment = require('momentjs')

var user, page, ready = false;

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
        layoutData: {left: 0, right: 0, top: 0, height: 200}
    }).on("ready", function() {
        this.set("center", [-33.867, 151.206]);
        this.set("zoom", 13);
    }).appendTo(page);

    page.open();
}


module.exports = {
    init: init,
    getPage: page,
    open: open
};
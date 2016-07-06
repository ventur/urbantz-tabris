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

    page.open();
}


module.exports = {
    init: init,
    getPage: page,
    open: open
};
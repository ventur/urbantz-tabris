var Service = require('./service')
var Utils = require('./utils')
var moment = require('momentjs')

var user, page, ready = false;

function init(_data) {
    user = _data.user
    page = new tabris.Page({
        title: 'Round',
        topLevel: true
    });
    ready = true;
    console.log('isReady')
}

function open() {
    console.log('is ready', ready)

    if (ready) {
        return Promise.resolve(true)
            .then(function() { return Service.getRound(user._id)})
            .then(function(round) {
                return Promise.all([
                    round,
                    Service.getHub(round.hub)
                ])
            })
            .then(function(roundAndHub) {
                var round = roundAndHub[0], hubs = roundAndHub[1];

                var hub = hubs.find(function(h) {return h._id == round.hub})

                var roundName = new tabris.TextView({
                    centerX: 0, top: 15,
                    percentage: '60%',
                    font: '24px',
                    text: round.orderCount + ' parcels ('+ round.name+')'
                }).appendTo(page);

                var address = new tabris.TextView({
                    centerX: 0, top: [roundName, 10],
                    font: '18px',
                    text: hub.location.address
                }).appendTo(page);

                var distance = Utils.roundDecimals(round.totalDistance / 1000, 1);
                var time = Utils.timeFromSeconds(round.totalTime);

                var info = new tabris.TextView({
                    centerX: 0, top: [address, 20],
                    font: '18px',
                    text: moment(round.date).format('DD/MM')+'@'+moment(round.startTime).format('HH:mm') + '   ' + distance+'km    '+ time
                }).appendTo(page);

                var map = new tabris.ImageView({
                    centerX: 0, top: [info, 5],
                    image: {src: round.picture, scaleMode: 'fit'},
                }).appendTo(page);


                var button = new tabris.Button({
                    bottom: 0, left: 0, right: 0, top:[map, 0],
                    text: 'Start',
                    background: '#23B5C3',
                    textColor: '#fff'
                }).appendTo(page);

                button.on('select', function() {
                    //textView.set('text', 'Totally Rock!');
                });

                page.open();
            }).catch(function(e) {console.log(e)})
    }
}

function close() {
    if(ready) {
        page.close()
    }
}

module.exports = {
    init: init,
    getPage: page,
    open: open,
    close: close
};
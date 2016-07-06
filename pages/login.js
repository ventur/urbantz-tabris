var Service = require ('../services/service.js');

var page;

function init() {

}

function open() {
    page = new tabris.Page({
        topLevel: true,
        title: "Login"
    });

    var email = 'erkandemez14@gmail.com'
    var pass = 'Abcd1234'

    var textViewInfo = new tabris.TextView({
        layoutData: {centerX: 0, top: 15},
        font: '24px',
        percentage: '60%',
        text: 'Info'
    }).appendTo(page);


    var emailInput = new tabris.TextInput({
        layoutData: {centerX: 0, top: [textViewInfo, 20], width: 200},
        message: "Email",
        text: email
    }).on("accept", function(widget, text) { // Fired when a text input has been finished by pressing the keyboard's Enter key.
            email = text;
        }).appendTo(page);


    var passwordInput = new tabris.TextInput({
        layoutData: {centerX: 0, top: [emailInput, 20] , width: 200},
        message: "Enter password",
        type: 'password',
        text: pass
    }).on("accept", function(widget, text) { // Fired when a text input has been finished by pressing the keyboard's Enter key.
            pass = text;
        }).appendTo(page);

    new tabris.Button({
        layoutData: {centerX: 0, top: [passwordInput, 20] , width: 200},
        text: "Button"
    }).on("select", function() {
            Promise.resolve(true).then(function(res){
                console.log('email' , email);
                console.log('pass' , pass);
                Service.login(email , pass)
                    .then(function(user) {
                        var view = require('./roundStart');
                        view.init({user: user})
                        view.open();
                    }).catch(function(rej){
                        console.log('error', rej)
                        textViewInfo.set('text' , rej.message);
                        textViewInfo.set('textColor' , 'red');
                    })
            });
        }).appendTo(page);

    page.open();
}

module.exports = {
    init: init,
    getPage: page,
    open: open
};
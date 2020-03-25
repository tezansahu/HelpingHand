const express = require('express');

const web3_utils = require('./web3/utils');
const web3_helpingHands = require("./web3/helpingHands");
const app = express()

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/', (req,res) => {
    res.send('HelpingHand API')
})

app.get('/ethBalance', (req,res) => {
    web3_utils.getBalance(req.query.address, (bal) => {
        res.send(bal);
    })
})

app.get('/createCause', (req, res) => {
    web3_helpingHands.createCause(req.query.address, req.query.requirement, (txHash) => {
        res.send(txHash);
    })
})

app.get('/donate', (req, res) => {
    web3_helpingHands.donate(req.query.address, req.query.id, req.query.amt, (txHash) => {
        res.send(txHash);
    })
})

app.get('/withdraw', (req, res) => {
    web3_helpingHands.withdraw(req.query.address, req.query.id, (txHash) => {
        res.send(txHash);
    })
})

app.get('/tip', (req, res) => {
    web3_helpingHands.tip(req.query.address, req.query.volunteer, req.query.amt, (txHash) => {
        res.send(txHash);
    })
})

app.get('/getCauseDetails', (req, res) => {
    web3_helpingHands.getCauseDetails(req.query.address, req.query.volunteer, req.query.amt, (details) => {
        res.send(details);
    })
})

app.listen(3000, () => {
    console.log(`Server Started at 3000`);
})
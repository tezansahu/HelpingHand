<h1 align="center">HelpingHand</h1>
<p align="center"> </p>

***

### Problem Statement 
In the current scenario of the world, given the outbreak of COVID-19, people are forced to go into lockdown. In such a scenario, daily life comes to a stop as routines are disturbed. Procuring daily supplies is difficult and home bound patients who need assistance are helpless. People have been asking help through varied platforms and some have also offered help.  


### Our Solution: HelpingHand 

HelpingHand is an interface that brifges the gap and brings together these people as it suggests, lends a hand, to fight this pandemic.

![github-small](/client/images/launchpage.png) 

### Challenges faced

- Issues with versions of `web3.js`
- Integration of the frontend with firebase & ethereum 
- Finding the suitable framework amongst new frameworks like DappHero, Glitch & Webflow (we tried that initially, but later stuck to vanilla HTML, CSS & JS)

#### How to run?

```bash
$ git clone https://github.com/tezansahu/HelpingHand.git
$ cd HelpingHand
$ npm i

# The contract has already been deployed to Matic Network [Address: 0x3f475bc8c794B86132EdbA04fB40c46f1E4dDeA3]

# Follow these steps only if you want to deploy contract locally:
####################################################################
# [Optional]
$ ganache-cli -m 'differ idle retire demise glare sentence glove hammer iron mango way empty'

# On a new terminal [Optional]
$ cd HelpingHand/blockchain
$ truffle migrate # To run on local node
####################################################################

# On a new terminal
$ cd HelpingHand
$ live-server client
# Install this if not already installed using `npm install live-server`

# On a new terminal
$ cd HelpingHand
$ node server.js
```


***

<p align="center">Created with :heart: by Tezan Sahu & R. Nambilakshmi</p>


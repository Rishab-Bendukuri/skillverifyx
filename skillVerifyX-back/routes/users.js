const exp = require("express");
const users = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Web3 = require('web3');
const todoListABI = require('../build/contracts/Users.json');
const TruffleContract = require("truffle-contract");

// Initialize Web3 provider
const web3 = new Web3('http://localhost:7545');

users.use(exp.json());

users.post(
  "/create",
  expressAsyncHandler(async (request, response) => {
    AppcontractsUsers = TruffleContract(require('../build/contracts/Users.json'));
    AppcontractsUsers.setProvider(web3.currentProvider);
    AppUsers = await AppcontractsUsers.deployed();
    if(await request.app.get("users").findOne({
      name: request.body.name,
    })){
      response.send("Username is unavailable!")
    } else{
        var inserted = await request.app.get("users").insertOne({
          name: request.body.name,
          password: await bcryptjs.hash(request.body.password, 4)
        })
        if(inserted.acknowledged){
          await AppUsers.createUser(inserted.insertedId.toString(), { from: "0xBC7B4B86C3EdA2E67767e19D8376Ff7D0ac5B119" })
          response.send("Created!")
        }
        else{
          response.send("Error creating user!")
        }
    }
  })
);

users.get(
  "/user/:id",
  expressAsyncHandler(async (request, response) => {
    const AppcontractsUsers = TruffleContract(require('../build/contracts/Users.json'));
    AppcontractsUsers.setProvider(web3.currentProvider);
    const AppUsers = await AppcontractsUsers.deployed();
    const returnValue = await AppUsers.getUser.call(request.params.id,{ from: "0xBC7B4B86C3EdA2E67767e19D8376Ff7D0ac5B119" });
    response.send(returnValue);
  })
);

users.post(
  "/endorse",
  expressAsyncHandler(async (request, response) => {
    reqData = request.body
    var App = {contracts:{}};
    App.web3Provider = web3.currentProvider;
    var Users = require('../build/contracts/Users.json');
    App.contracts.Users = TruffleContract(Users);
    App.contracts.Users.setProvider(App.web3Provider);
    App.Users = await App.contracts.Users.deployed();
    await App.Users.addEndorsement(request.body.userId, request.body.skillId,request.body.endorseId, { from: "0xBC7B4B86C3EdA2E67767e19D8376Ff7D0ac5B119" })
    response.send("Done!")
  })
);

users.post(
  "/login",
  expressAsyncHandler(async (request, response) => {
    const userDetails = await (await request.app.get("users")).findOne({name: request.body.name})
    if(await bcryptjs.compare(request.body.password, userDetails.password)){
      response.send({token: jwt.sign({userId: userDetails._id.toString()}, 'secret', {expiresIn: 1000000})})
    } else{
      response.send("Invalid credentials!")
    }
  })
);

module.exports = users;

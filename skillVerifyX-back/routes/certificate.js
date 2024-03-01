const exp = require("express");
const certificates = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const Web3 = require('web3');
const TruffleContract = require("truffle-contract");

// Initialize Web3 provider
const web3 = new Web3('http://localhost:7545');

certificates.use(exp.json());

certificates.post(
  "/create",
  expressAsyncHandler(async (request, response) => {
    var AppcontractsCertificates = TruffleContract(require('../build/contracts/Certificates.json'));
    AppcontractsCertificates.setProvider(web3.currentProvider);
    var AppCertificates = await AppcontractsCertificates.deployed();
    await AppCertificates.addSkill(request.body.userId, request.body.skillId, { from: "0x67eA39E9B4EA99978E96359d8035085Fd50e5406" })
    response.send("Done!")
  })
);

certificates.get(
  "/verify/:userId/:skillId",
  expressAsyncHandler(async (request, response) => {
    const AppcontractsCertificates = TruffleContract(require('../build/contracts/Certificates.json'));
    AppcontractsCertificates.setProvider(web3.currentProvider);
    const AppCertificates = await AppcontractsCertificates.deployed();
    const returnValue = await AppCertificates.verifyCertificate.call(request.params.userId, request.params.skillId, { from: "0x67eA39E9B4EA99978E96359d8035085Fd50e5406" });
    response.send(returnValue ? "Valid" : "Invalid");
  })
);

module.exports = certificates;

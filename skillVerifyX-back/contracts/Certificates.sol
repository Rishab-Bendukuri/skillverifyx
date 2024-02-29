pragma solidity ^0.5.0;

pragma experimental ABIEncoderV2; // Enable experimental ABIEncoderV2

contract Certificates {

    struct CertificateStruct {
        uint[] skillIds;
    }

    // Uid and skillIds
    mapping(string => CertificateStruct) Certificate;

    function verifyCertificate(string memory _id, uint _skillId) public view returns(bool) {
        if(Certificate[_id].skillIds.length > 0){
            uint[] memory skills = Certificate[_id].skillIds;
            for(uint i=0;i<skills.length;i++){
                if(skills[i] == _skillId) return true;
            }
            return false;
        }
        else{
            return false;
        }
    }

    constructor() public {}

    function addSkill(string memory _id, uint _skillId) public {
        CertificateStruct storage cert = Certificate[_id];
        cert.skillIds.push(_skillId);
    }
}

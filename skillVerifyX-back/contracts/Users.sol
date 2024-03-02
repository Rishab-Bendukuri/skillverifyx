pragma solidity ^0.5.0;

pragma experimental ABIEncoderV2; // Enable experimental ABIEncoderV2

contract Users {
    uint public UsersCount = 0;

    struct Skill {
        uint id;
        string name;
    }

    struct User {
        // User specified skills.
        uint[] skillIds;
        // Skill id and endorsement id
        mapping(uint => string) endorsements;
    }

    mapping(string => User) users;
    string[] userIds;

    constructor() public {}

    function returnTest() public returns(string memory){
        return "Success!";
    }

    // Returns endorsed skillIds and endorsementIds
    function getUser(string memory _id) public view returns(uint[] memory, string[] memory) {
        uint[] memory userSkills = users[_id].skillIds;
        string[] memory userEndorsements = new string[](userSkills.length);

        for (uint i = 0; i < userSkills.length; i++) {
            userEndorsements[i] = users[_id].endorsements[userSkills[i]];
        }

        return (userSkills, userEndorsements);
    }

    function getAllUserIds() public view returns(string[] memory){
        return userIds;
    }

    function createUser(string memory _id) public {
        UsersCount++;
        users[_id] = User(new uint[](0));
        userIds.push(_id);
    }

    function addEndorsement(string memory _id, uint _skillId, string memory _endorsementId) public {
        require(_skillId > 0, "Invalid skill ID");

        User storage user = users[_id];
        user.skillIds.push(_skillId);

        user.endorsements[_skillId] = _endorsementId;
    }
}

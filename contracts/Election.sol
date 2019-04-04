pragma solidity ^0.5.0;

contract Election {
    struct Candidate {
        string candidateName;
        uint64 votes;
    }
    
    bool electionState;
    
    constructor() public{
        electionState = false;
        registerCandidate(11111111,'ironman');
        registerCandidate(22222222,'cap');
        registerCandidate(33333333,'thor');
        registerVoter(99999999,'diana');
        registerVoter(88888888,'msPotts');
        registerVoter(77777777,'carol');

    }
    
    struct Voter {
        string voterName;
        bool voted;
        
    }
    uint public candidatesCount;
    uint public votersCount;
    
    mapping(uint64 => Candidate) candidates;
    mapping(uint64 => Voter) voters;
    
    uint64[] public candidates_aadhaarNumbers;
    uint64[] public voters_aadhaarNumbers;
    
    function registerCandidate(uint64 aadhaarNum, string memory name) public{
        candidates[aadhaarNum] = Candidate(name, 0);
        candidates_aadhaarNumbers.push(aadhaarNum) -1;
    }
    
    function registerVoter(uint64 aadhaarNum, string memory name) public{
        voters[aadhaarNum] = Voter(name, false);
        voters_aadhaarNumbers.push(aadhaarNum) -1;
    }
    
    function startElection() public{
        electionState = true;
    }
    
    function endElection() public{
        electionState = false;
    }
    
    function castVote(uint64 voter_aadhaarNum, uint64 candidate_aadhaarNum) public{
        // require(electionState == true, "Sorry, election is over! or It is yet to be started...");
        // require(voters[voter_aadhaarNum].voted == false, "You have already voted!");
        candidates[candidate_aadhaarNum].votes = candidates[candidate_aadhaarNum].votes + 1;
        voters[voter_aadhaarNum].voted = true;
      
    }
    function get(uint64 candidate_aadhaarNum) public view returns (uint64) {
    return candidates[candidate_aadhaarNum].votes;
    }
}
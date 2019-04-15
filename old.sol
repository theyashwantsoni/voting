pragma solidity ^0.4.24;
contract ECI_India {
    struct Candidate {
        string candidateName;
        uint64 votes;
    }
    
    bool electionState;
    
    constructor() public{
        electionState = false;
    }
    
    struct Voter {
        string voterName;
        bool voted;
    }
    
    mapping(uint64 => Candidate) candidates;
    mapping(uint64 => Voter) voters;
    
    uint64[] public candidates_aadhaarNumbers;
    uint64[] public voters_aadhaarNumbers;
    
    function registerCandidate(uint64 aadhaarNum, string name) public{
        var candidate = candidates[aadhaarNum];
        candidate.candidateName = name;
        candidate.votes = 0;
        candidates_aadhaarNumbers.push(aadhaarNum) -1;
    }
    
    function registerVoter(uint64 aadhaarNum, string name) public{
        var voter = voters[aadhaarNum];
        voter.voterName = name;
        voter.voted = false; //If false gives right of voting to voter
        voters_aadhaarNumbers.push(aadhaarNum) -1;
    }
    
    function startElection() public{
        electionState = true;
    }
    
    function endElection() public{
        electionState = false;
    }
    
    function castVote(uint64 voter_aadhaarNum, uint64 candidate_aadhaarNum) public{
        require(electionState == true, "Sorry, election is over! or It is yet to be started...");
        require(voters[voter_aadhaarNum].voted == false, "You have already voted!");
        candidates[candidate_aadhaarNum].votes = candidates[candidate_aadhaarNum].votes + 1;
        voters[voter_aadhaarNum].voted = true;
    }
}

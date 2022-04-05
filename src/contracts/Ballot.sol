// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

  
contract Ballot {
   
    struct Voter {
        uint weight; 
        bool voted;  
        uint vote;   
    }
    
    struct Proposal {
        
        string name;   
        uint voteCount; 
    }

    struct FinalData{
        string proposalId;
        string candidateName;
        string proposalFile;
        uint yesCount;
        uint noCount;
    }


    FinalData public finalData;

    mapping(string => FinalData) data;

    address public chairperson;

    mapping(address => Voter) public voters;

    Proposal[] public proposals;

    
    constructor() {
        
    }

    function addProposal(string memory proposalId, string memory proposalName, string memory proposalFile) public {
        require(bytes(proposalName).length != 0 , "Give a damn name");
        chairperson = msg.sender;
        voters[chairperson].weight = 1;
        proposals.push(Proposal({name: "Yes",voteCount: 0}));
        proposals.push(Proposal({name: "No",voteCount: 0}));
        finalData = FinalData(proposalId, proposalName,proposalFile, proposals[0].voteCount, proposals[1].voteCount);
        data[proposalId] = finalData;
    }

    function getData(string memory id) public view returns (FinalData memory someData){
        someData = data[id];
    }
    
    
    function giveRightToVote(address voter) public {
        require(
            msg.sender == chairperson,
            "Only chairperson can give right to vote."
        );
        require(
            !voters[voter].voted,
            "The voter already voted."
        );
        require(voters[voter].weight == 0);
        voters[voter].weight = 1;
    }

   

    
    function vote(uint proposal, string memory id) public {
        Voter storage sender = voters[msg.sender];
        require(sender.weight != 0, "Has no right to vote");
        require(!sender.voted, "Already voted.");
        sender.voted = true;
        sender.vote = proposal;

        
        proposals[proposal].voteCount += sender.weight;
        if(proposal == 0){
        finalData.yesCount = proposals[proposal].voteCount;
        data[id] = finalData;
        }else{
            finalData.noCount = proposals[proposal].voteCount;
            data[id] = finalData;
        } 
    }

    
    function winningProposal() public view
            returns (uint winningProposal_)
    {
        uint winningVoteCount = 0;
        for (uint p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    
    function winnerName() public view
            returns (string memory winnerName_)
    {
        winnerName_ = proposals[winningProposal()].name;
    }
}

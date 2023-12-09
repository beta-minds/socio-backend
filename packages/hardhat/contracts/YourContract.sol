//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
// import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * A smart contract that allows changing a state variable of the contract and tracking the changes
 * It also allows the owner to withdraw the Ether in the contract
 * @author BuidlGuidl
 */
contract YourContract {mapping(address => string) private usernames;
	address[] private userList;

	event UsernameSet(address indexed userAddress, string username);

	function setUsername(string calldata username) external {
			if(bytes(usernames[msg.sender]).length == 0) {
					userList.push(msg.sender);
			}
			usernames[msg.sender] = username;

			emit UsernameSet(msg.sender, username);
	}

	function getUsername(address userAddress) external view returns (string memory) {
			return usernames[userAddress];
	}

	function getUsernames(address[] calldata addresses) external view returns (string[] memory) {
			string[] memory names = new string[](addresses.length);
			for(uint i = 0; i < addresses.length; i++) {
					names[i] = usernames[addresses[i]];
			}
			return names;
	}
}


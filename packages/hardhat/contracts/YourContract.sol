pragma solidity >=0.8.0 <0.9.0;

import "hardhat/console.sol";

contract YourContract {
	mapping(address => string) private usernames;
	mapping(string => address) private addresses;
	mapping(address => address[]) private friends;
	string[] private usernameList;
	mapping(address => string[]) private cids;
	address[] private userList;

	event UsernameSet(address indexed userAddress, string username);
  event CIDSet(address indexed userAddress, string cid);
	event FriendAdded(address indexed userAddress, address friendAddress);

	function setUsername(string calldata username) external {
		require(bytes(username).length > 0, "Username cannot be empty");
		require(
			bytes(usernames[msg.sender]).length == 0,
			"Username already set"
		);

		usernames[msg.sender] = username;
		addresses[username] = msg.sender;
		usernameList.push(username);

		emit UsernameSet(msg.sender, username);
	}

	function addCID(string calldata cid) external {
		cids[msg.sender].push(cid);

		emit CIDSet(msg.sender, cid);
	}

	function addFriend(address friendAddress) external {
		friends[msg.sender].push(friendAddress);

		emit FriendAdded(msg.sender, friendAddress);
	}

	function getUsername() external view returns (string memory) {
		return usernames[msg.sender];
	}

	function getAddressByUsername(
		string calldata username
	) external view returns (address) {
		return addresses[username];
	}

	function getCIDs(string calldata username) external view returns (string[] memory) {
		return cids[msg.sender];
	}

	function getFriends(string calldata username) external view returns (address[] memory) {
		return friends[msg.sender];
	}

	function getUsernames(
		address[] calldata userAddresses
	) external view returns (string[] memory) {
		string[] memory names = new string[](userAddresses.length);
		for (uint i = 0; i < userAddresses.length; i++) {
			names[i] = usernames[userAddresses[i]];
		}
		return names;
	}
}

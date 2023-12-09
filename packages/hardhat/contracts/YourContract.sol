pragma solidity >=0.8.0 <0.9.0;

import "hardhat/console.sol";

contract YourContract {
	mapping(address => string) private usernames;
	mapping(string => address) private addresses;
	mapping(address => address[]) private connections;
	mapping(address => address[]) private connectionRequests;
	string[] private usernameList;
	address[] private userList;

	event UsernameSet(address indexed userAddress, string username);
	event ConnectionRequestSent(address indexed fromAddress, address toAddress);
	event ConnectionAdded(
		address indexed userAddress,
		address connectionAddress
	);

	struct User {
		address userAddress;
		string username;
	}

	function setUsername(string calldata username) external {
		require(bytes(username).length > 0, "Username cannot be empty");
		require(
			bytes(usernames[msg.sender]).length == 0,
			"Username already set for this address"
		);
		require(addresses[username] == address(0), "Username already taken");

		usernames[msg.sender] = username;
		addresses[username] = msg.sender;
		usernameList.push(username);

		emit UsernameSet(msg.sender, username);
	}

	function sendConnectionRequest(address toAddress) external {
		connectionRequests[toAddress].push(msg.sender);

		emit ConnectionRequestSent(msg.sender, toAddress);
	}

	function acceptConnectionRequest(address fromAddress) external {
		connections[msg.sender].push(fromAddress);
		connections[fromAddress].push(msg.sender);

		// Remove the connection request
		for (uint i = 0; i < connectionRequests[msg.sender].length; i++) {
			if (connectionRequests[msg.sender][i] == fromAddress) {
				connectionRequests[msg.sender][i] = connectionRequests[
					msg.sender
				][connectionRequests[msg.sender].length - 1];
				connectionRequests[msg.sender].pop();
				break;
			}
		}

		emit ConnectionAdded(msg.sender, fromAddress);
	}

	function getUsername(
		address userAddress
	) external view returns (string memory) {
		return usernames[userAddress];
	}

	function getAddressByUsername(
		string calldata username
	) external view returns (address) {
		return addresses[username];
	}

	function getConnections(
		address userAddress
	) external view returns (User[] memory) {
		address[] memory connectionAddresses = connections[userAddress];
		User[] memory connectionUsers = new User[](connectionAddresses.length);
		for (uint i = 0; i < connectionAddresses.length; i++) {
			connectionUsers[i] = User(
				connectionAddresses[i],
				usernames[connectionAddresses[i]]
			);
		}
		return connectionUsers;
	}

	function getConnectionRequests(
		address userAddress
	) external view returns (User[] memory) {
		address[] memory requestAddresses = connectionRequests[userAddress];
		User[] memory requestUsers = new User[](requestAddresses.length);
		for (uint i = 0; i < requestAddresses.length; i++) {
			requestUsers[i] = User(
				requestAddresses[i],
				usernames[requestAddresses[i]]
			);
		}
		return requestUsers;
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

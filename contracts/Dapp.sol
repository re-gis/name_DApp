// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

contract HelloWorld {
    string public greeting;
    string public name;

    constructor() public {
        // Specify visibility as public
        greeting = "Hello, World!";
    }

    function getGreeting() public view returns (string memory) {
        return greeting;
    }

    function getName() public view returns (string memory) {
        return name;
    }

    function setGreeting(string memory _newGreeting) public {
        greeting = _newGreeting;
    }

    function setName(string memory _name) public {
        name = _name;
    }
}

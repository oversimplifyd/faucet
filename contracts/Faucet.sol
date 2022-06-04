// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract FaucetBase {

  address payable owner; 

  constructor() {
    owner = payable(msg.sender);
  }
 
  modifier onlyOwner {
    require(msg.sender == owner);
    _;
  }
  
  function destroy() external onlyOwner {
    selfdestruct(owner);
  }
}

contract Faucet is FaucetBase {

  event Withdrawal(address indexed to, uint amount);
  event Deposit(address indexed from, uint amount);
  
  function widthdraw(uint withdrawAmount) external onlyOwner {
    require(address(this).balance >= withdrawAmount);

    emit Withdrawal(msg.sender, withdrawAmount);

    payable(msg.sender).transfer(withdrawAmount);
  }
  
   receive() external payable {
     emit Deposit(msg.sender, msg.value);
   }
}
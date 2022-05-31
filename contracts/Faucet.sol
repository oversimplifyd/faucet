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
  
  function destroy() public onlyOwner {
    selfdestruct(owner);
  }
}

contract Faucet is FaucetBase {

  event Withdrawal(address indexed to, uint amount);
  event Deposit(address indexed from, uint amount);
  
  function widthdraw(uint widthdraw_amount) public onlyOwner {
    require(address(this).balance >= widthdraw_amount);

    payable(msg.sender).transfer(widthdraw_amount);

    emit Withdrawal(msg.sender, widthdraw_amount);
  }
  
   receive() external payable {
     emit Deposit(msg.sender, msg.value);
   }
}
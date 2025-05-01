// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract CafeTokenSale is ReentrancyGuard, Ownable {
    IERC20 public cafeX;
    IERC20 public cafeY;
    
    uint256 public constant CAFE_X_PRICE = 0.001 ether; // 0.001 ETH por token
    uint256 public constant CAFE_Y_PRICE = 0.0005 ether; // 0.0005 ETH por token

    constructor(address _cafeX, address _cafeY) Ownable() {
        cafeX = IERC20(_cafeX);
        cafeY = IERC20(_cafeY);
    }

    // Funções para verificar o saldo dos tokens CafeX e CafeY
    function balanceOfCafeX(address account) public view returns (uint256) {
        return cafeX.balanceOf(account);
    }

    function balanceOfCafeY(address account) public view returns (uint256) {
        return cafeY.balanceOf(account);
    }

    function buyCafeX(uint256 amount) public payable nonReentrant {
        require(msg.value >= amount * CAFE_X_PRICE, "Insufficient ETH sent");
        require(cafeX.balanceOf(address(this)) >= amount, "Insufficient CafeX tokens");
        
        cafeX.transfer(msg.sender, amount);
        
        // Reembolso de ETH excedente
        if (msg.value > amount * CAFE_X_PRICE) {
            payable(msg.sender).transfer(msg.value - (amount * CAFE_X_PRICE));
        }
    }

    function buyCafeY(uint256 amount) public payable nonReentrant {
        require(msg.value >= amount * CAFE_Y_PRICE, "Insufficient ETH sent");
        require(cafeY.balanceOf(address(this)) >= amount, "Insufficient CafeY tokens");
        
        cafeY.transfer(msg.sender, amount);
        
        // Reembolso de ETH excedente
        if (msg.value > amount * CAFE_Y_PRICE) {
            payable(msg.sender).transfer(msg.value - (amount * CAFE_Y_PRICE));
        }
    }

    function withdrawETH() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function withdrawTokens() public onlyOwner {
        cafeX.transfer(owner(), cafeX.balanceOf(address(this)));
        cafeY.transfer(owner(), cafeY.balanceOf(address(this)));
    }
} 

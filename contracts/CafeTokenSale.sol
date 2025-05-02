// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract CafeTokenSale is ReentrancyGuard, Ownable {
    IERC20 public cafeX;
    IERC20 public cafeY;
    IERC20 public cafeZ;
    IERC20 public milhoX;
    IERC20 public sojaA;
    IERC20 public sojaT;
    IERC20 public trigoX;
    IERC20 public trigoY;

    uint256 public constant CAFE_X_PRICE = 0.001 ether;
    uint256 public constant CAFE_Y_PRICE = 0.0005 ether;
    uint256 public constant CAFE_Z_PRICE = 0.0005 ether;
    uint256 public constant MILHO_X_PRICE = 0.0003 ether;
    uint256 public constant SOJA_A_PRICE = 0.0009 ether;
    uint256 public constant SOJA_T_PRICE = 0.0004 ether;
    uint256 public constant TRIGO_X_PRICE = 0.0005 ether;
    uint256 public constant TRIGO_Y_PRICE = 0.0003 ether;

  constructor(
    address _cafeX,
    address _cafeY,
    address _cafeZ,
    address _milhoX,
    address _sojaA,
    address _sojaT,
    address _trigoX,
    address _trigoY
) Ownable() {
    cafeX = IERC20(_cafeX);
    cafeY = IERC20(_cafeY);
    cafeZ = IERC20(_cafeZ);
    milhoX = IERC20(_milhoX);
    sojaA = IERC20(_sojaA);
    sojaT = IERC20(_sojaT);
    trigoX = IERC20(_trigoX);
    trigoY = IERC20(_trigoY);
}

    // --- Balance check functions ---
    function balanceOfCafeX(address account) public view returns (uint256) {
        return cafeX.balanceOf(account);
    }

    function balanceOfCafeY(address account) public view returns (uint256) {
        return cafeY.balanceOf(account);
    }

    function balanceOfCafeZ(address account) public view returns (uint256) {
        return cafeZ.balanceOf(account);
    }

    function balanceOfMilhoX(address account) public view returns (uint256) {
        return milhoX.balanceOf(account);
    }

    function balanceOfSojaA(address account) public view returns (uint256) {
        return sojaA.balanceOf(account);
    }

    function balanceOfSojaT(address account) public view returns (uint256) {
        return sojaT.balanceOf(account);
    }

    function balanceOfTrigoX(address account) public view returns (uint256) {
        return trigoX.balanceOf(account);
    }

    function balanceOfTrigoY(address account) public view returns (uint256) {
        return trigoY.balanceOf(account);
    }

    // --- Compra de tokens ---
    function buyCafeX(uint256 amount) public payable nonReentrant {
        _buyToken(cafeX, CAFE_X_PRICE, amount);
    }

    function buyCafeY(uint256 amount) public payable nonReentrant {
        _buyToken(cafeY, CAFE_Y_PRICE, amount);
    }

    function buyCafeZ(uint256 amount) public payable nonReentrant {
        _buyToken(cafeZ, CAFE_Z_PRICE, amount);
    }

    function buyMilhoX(uint256 amount) public payable nonReentrant {
        _buyToken(milhoX, MILHO_X_PRICE, amount);
    }

    function buySojaA(uint256 amount) public payable nonReentrant {
        _buyToken(sojaA, SOJA_A_PRICE, amount);
    }

    function buySojaT(uint256 amount) public payable nonReentrant {
        _buyToken(sojaT, SOJA_T_PRICE, amount);
    }

    function buyTrigoX(uint256 amount) public payable nonReentrant {
        _buyToken(trigoX, TRIGO_X_PRICE, amount);
    }

    function buyTrigoY(uint256 amount) public payable nonReentrant {
        _buyToken(trigoY, TRIGO_Y_PRICE, amount);
    }

    // --- Função interna para compra genérica ---
    function _buyToken(IERC20 token, uint256 price, uint256 amount) internal {
        uint256 cost = price * amount;
        require(msg.value >= cost, "Insufficient ETH sent");
        require(token.balanceOf(address(this)) >= amount, "Insufficient token balance in contract");

        token.transfer(msg.sender, amount);

        if (msg.value > cost) {
            payable(msg.sender).transfer(msg.value - cost);
        }
    }

    // --- Saque ---
    function withdrawETH() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function withdrawTokens() public onlyOwner {
        cafeX.transfer(owner(), cafeX.balanceOf(address(this)));
        cafeY.transfer(owner(), cafeY.balanceOf(address(this)));
        cafeZ.transfer(owner(), cafeZ.balanceOf(address(this)));
        milhoX.transfer(owner(), milhoX.balanceOf(address(this)));
        sojaA.transfer(owner(), sojaA.balanceOf(address(this)));
        sojaT.transfer(owner(), sojaT.balanceOf(address(this)));
        trigoX.transfer(owner(), trigoX.balanceOf(address(this)));
        trigoY.transfer(owner(), trigoY.balanceOf(address(this)));
    }
}

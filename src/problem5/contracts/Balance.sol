// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

interface IERC20 {
    function balanceOf(address account) external view returns (uint);
}

contract Balance {
    struct Token {
        address token;
        uint balance;
    }

    function getBalances(address wallet, address[] memory tokenAddresses) public view returns(Token[] memory) {
        uint len = tokenAddresses.length;
        Token[] memory tokens = new Token[](len);
        for (uint i = 0; i < len; i++) {
            address current = tokenAddresses[i];
            IERC20 ercToken = IERC20(current);
            uint balance = ercToken.balanceOf(wallet);
            tokens[i] = Token(current, balance);
        }
        return tokens;
    }
}
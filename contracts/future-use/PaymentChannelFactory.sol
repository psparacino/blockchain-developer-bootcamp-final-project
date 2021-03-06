// SPDX-License-Identifier: GPL-3.0
//src https://docs.soliditylang.org/en/v0.8.9/solidity-by-example.html#micropayment-channel

pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol";


contract PaymentChannelFactory {
    address payable public sender;
    address payable public vault;
    uint public expiration;
    uint public balance;



    
    constructor (address payable _vault, uint duration) payable {
        sender = payable(msg.sender);
        vault = _vault;
        expiration = block.timestamp + duration;
    }

    function closeTransaction(address signer, bytes32 hash, bytes memory signature, uint amount) external {
        require(msg.sender == vault);
        require(SignatureChecker.isValidSignatureNow(signer, hash, signature));

        //EDIT and change to callvalue @dev
        vault.transfer(amount);
        selfdestruct(sender);
    }

    function extendTimeout(uint newExpiration) external {
        require(vault == msg.sender);
        require(newExpiration> expiration);

        expiration = newExpiration;
    }

    function claimTimeout() external  {
        require(block.timestamp >= expiration);

        selfdestruct(sender);
    }

  

    /*

  
    function isValidSignature(uint256 amount, bytes memory signature)
        internal
        view
        returns (bool)
    {
        bytes32 message = prefixed(keccak256(abi.encodePacked(this, amount)));

        // check that the signature is from the payment sender
        return recoverSigner(message, signature) == sender;
    }

        /// All functions below this are  just taken from the chapter
    /// 'creating and verifying signatures' chapter.

    function splitSignature(bytes memory sig)
        internal
        pure
        returns (uint8 v, bytes32 r, bytes32 s)
    {
        require(sig.length == 65);

        assembly {
            // first 32 bytes, after the length prefix
            r := mload(add(sig, 32))
            // second 32 bytes
            s := mload(add(sig, 64))
            // final byte (first byte of the next 32 bytes)
            v := byte(0, mload(add(sig, 96)))
        }

        return (v, r, s);
    }

    function recoverSigner(bytes32 message, bytes memory sig)
        internal
        pure
        returns (address)
    {
        (uint8 v, bytes32 r, bytes32 s) = splitSignature(sig);

        return ECDSA.recover(message, v, r, s);
    }

    /// builds a prefixed hash to mimic the behavior of eth_sign.
    function prefixed(bytes32 hash) internal pure returns (bytes32) {
        //return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));

        return ECDSA.toEthSignedMessageHash(hash);
    }

    */
}


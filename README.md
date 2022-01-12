# ERC1155 Multi Token Standard

The distinctive feature of ERC1155 is that it uses a single smart contract to represent multiple tokens at once. This is why its balanceOf function differs from ERC20’s and ERC777’s: it has an additional id argument for the identifier of the token that you want to query the balance of.

This is similar to how ERC721 does things, but in that standard a token id has no concept of balance: each token is non-fungible and exists or doesn’t. The ERC721 balanceOf function refers to how many different tokens an account has, not how many of each. On the other hand, in ERC1155 accounts have a distinct balance for each token id, and non-fungible tokens are implemented by simply minting a single one of them.

This approach leads to massive gas savings for projects that require multiple tokens. Instead of deploying a new contract for each token type, a single ERC1155 token contract can hold the entire system state, reducing deployment costs and complexity.

## Features
- allows token burning
- creation of more token after the first deployment
- llows to pause the smart contract


## main contract
```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// @custom:security-contact jesusgalicia2019@gmail.com
contract MyToken is ERC721, Pausable, Ownable, ERC721Burnable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("MyToken", "MTK") {}

    function _baseURI() internal pure override returns (string memory) {
        return "https://Base-URI";
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }
}

```
## License

MIT

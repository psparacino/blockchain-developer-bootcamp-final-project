## Avoiding Common Attacks
### Using specific compiler pragma
 * All contracts utilize the same compiler version.
### Using modifiers only for validation
 * The two modifiers utilized in the contracts, onlyOwner and userRegistered, validate which users can access which functions.  A user is required to be registered for any interactions with the platform and access to moving the contract balance is restricted to the owner. 
### Re-entrancy
 * In addition to using OpenZeppelin's Reentracy Guard, any contract state is always updated before the transaction is called.
### Tx.origin authentication
 * The owner is set in the constructor from msg.sender; tx.origin is never used.
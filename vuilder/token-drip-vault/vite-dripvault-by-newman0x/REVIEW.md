- This contract only stores a single vault which doesn't fulfill the bounty
- That aside, dev uses numbers instead of booleans
- Interesting has `_updateTimestamp` which is not ideal
	- timestamp should just be `block.number` or `block.timestamp` in the function that needs it rather than getting it from a variable
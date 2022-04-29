- Interesting decision
```
accounts.push();
accounts[accounts.length - 1].members = _members;
accounts[accounts.length - 1].approvalThreshold = _approvalThreshold;
accounts[accounts.length - 1].isStatic = _isStatic;
accounts[accounts.length - 1].isMemberOnlyDeposit = _isMemberOnlyDeposit;
```
- I would prefer if the getter functions started with `get` in order to be more descriptive; I think functions in general should include a verb in their name.
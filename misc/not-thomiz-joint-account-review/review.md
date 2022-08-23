# Joint Account Bounty Review
## Contract
### JointAccounts.solpp
For the contract, I only found quota optimizations that could be handy for large multisigs and a possible issue.

[**Line 112**](https://github.com/samuelemarro/gr13-vite-joint-account/blob/master/contracts/JointAccounts.solpp#L112)

The `members` array is never checked for duplicate addresses, that means I can give the contract these params:

 - members: [
    Account 1, Account 1, Account 1, Account 2, Account 3, Account 4
]
 - Threshold: 3

And Account 2, 3 and 4 will have to remove me 3 times to get rid of me. This effectively can hide me in the long term, if the list of members is not visible from the frontend. It is important to note I can't vote twice.

> Mike: This is correct. We should add/check a `mapping(address => bool)` when adding/removing/creating members

[**Line 446**](https://github.com/samuelemarro/gr13-vite-joint-account/blob/master/contracts/JointAccounts.solpp#L446)
```js
uint256 index = _findMember(_accountId, _member);
require(isMember(_accountId, _member), "Address is not a member");
```
The `_findMember` function is a loop, and the implementation of  `isMember` calls it too
```js
function isMember(uint256 _accountId, address _member) public view returns (bool) {
    require(accountExists(_accountId), "Account does not exist");
    return _findMember(_accountId, _member) != NULL;
}
```
This basically means we loop two time over the members array. Quota optimization can be made here, this can be dangerous for large multisigs as there may be not enough quota available for this contract execution.

> Mike: True, a `mapping(address => bool)` would also help in this scenario

[**Line 449**](https://github.com/samuelemarro/gr13-vite-joint-account/blob/master/contracts/JointAccounts.solpp#L449)
```js
for (uint256 i = index; i < accounts[_accountId].members.length - 1; i++) {
    accounts[_accountId].members[i] = accounts[_accountId].members[i + 1];
}

accounts[_accountId].members.pop();
```

This can be implemented by simply replacing the `index` with the last array item instead of looping over the array, and then using `members.pop()`, as we don't need to have the members ordered. Here is an implementation of what I am saying. This optimization can reduce the amount of quota needed for `_removeMember`
```js
uint256 last_index = accounts[_accountId].members.length - 1;
accounts[_accountId].members[index] = accounts[_accountId].members[last_index];
accounts[_accountId].members.pop()
```

> Mike: This is a good optimization, the order of the members doesn't matter

I didn't find anything else. The code is clean and well documented.

## Frontend
### The user doesn't see a list of accounts

The user can't get a list of the accounts he has access to and he has to remember and manually input the account id every time.

> Mike: Correct, this should be added

### Account ID 0 does not work
![img](https://i.thomiz.dev/​​᠎⁠᠎‍‍‌‌​.png)
The line that does this is in [frontend/src/components/Access.tsx:27](https://github.com/tnrdd/vite-joint-account-frontend/blob/main/frontend/src/components/Access.tsx#L27)
```js
if (+v <= 0) {
    return i18n.amountMustBePositive;
}
```
`+v <= 0` should be `+v < 0` instead

> Mike: Correct, this should be fixed

### i18n is not used everywhere

The Vite Express framework implements a language selection option. It currently only support english but might be useful to support a larger variety of language in the future. The frontend does make use of it sometimes, but there's a lot of places where it is not the case. Like in the page titles, for example in [frontend/src/components/Access.tsx:17](https://github.com/tnrdd/vite-joint-account-frontend/blob/main/frontend/src/components/Access.tsx#L17) or for a whole page, like in [frontend/src/pages/About.tsx](https://github.com/tnrdd/vite-joint-account-frontend/blob/main/frontend/src/pages/About.tsx) where it's used only for title.

> Mike: Correct, this should be fixed

### Lots of infos not available

The user can't see from the frontend:
 - Others members of a joint account
 - Balance of joint account
 - approval threshold
 - is the account static
 - are the members the only people who can deposit

> Mike: Correct, this should be added

### 3/4 of the different motions implemented by the contract aren't available

You can't:
   - Add a member
   - Remove a member
   - Change the approval threshold

as those functions aren't implemented in the UI.

> Mike: Correct, this should be added

### The frontend asks you for a token id

![img](https://i.thomiz.dev/​᠎᠎‍‌⁠‌​‍​.png)

![img](https://i.thomiz.dev/​​᠎⁠‍​​᠎‍​.png)

A better UX would be to show a list of tokens, and let the user select instead of asking the user to open another tab, go into an explorer and find the token id.

> Mike: Agree, this should be added

### Beneficiary address of a transfer motion can't be another joint account

![img](https://i.thomiz.dev/‌‍‍​‍᠎‍⁠‌​.png)

I can't input the id number of another joint account, which limits me to only EOA or contracts.

> Mike: Correct, this should be added

### Empty and Useless files

**frontend/src/components/_____.tsx**

**frontend/src/containers/_____.tsx**

**frontend/src/pages/_____.tsx**

```jsx
type Props = {};

const _____ = ({}: Props) => {
	return (
		<div className="">
			<p></p>
		</div>
	);
};

export default _____;
```

Seems like an empty file that can be removed. I can't find any place in the code where it's used.

> Mike: These files have a purpose. They are for quickly creating new components with a certain template by copying/pasting the blank file and renaming it to the new component.

### History is broken

Due to the latest gvite update, fetching vm logs is currently broken in the frontend.

[frontend/src/pages/History.tsx:19](https://github.com/tnrdd/vite-joint-account-frontend/blob/main/frontend/src/pages/History.tsx#L19)

`fromHeight` should be set to 1

> *Note: this could also be updated in [Vite Express](https://github.com/vitelabs/vite-express/blob/master/frontend/src/utils/viteScripts.ts#L10) now*

> Mike: Correct, this should be fixed and so should Vite-Express (the `vp` branch for the upcoming Vite Passport wallet extension already contains an [update](https://github.com/vitelabs/vite-express/blob/vp/frontend/src/pages/History.tsx#L28)) 

### Poor/Limited history

This could potentially include
 - accounts transfers
 - members added/removed
 - threshold changes
 - Deposits
 - Transfers
 - Motions Created/Removed
 - Votes

but instead the frontend only makes use of the `AccountCreated` event.

> Mike: Agree, these should be added

### Defaults values
I've talked about missing features/settings, but the default values that replace those settings might be dangerous

In the contract section, I said that duplicate addresses can be an issue, but in the frontend you can actually do this without even knowing, by including yourself in the members thinking you aren't already.

The current viteconnect account is appended to the current list of members set by the user, so you can't technically create an account for someone else without you in it.


![img](https://i.thomiz.dev/‌‌⁠‍⁠⁠‍᠎‍​.png)

> Mike: Agree, the UI should prevent this behavior

### The logs fetching method is wrong
In the frontend, this is how the new account id is found (in [**frontend/src/components/NewAccount.tsx:80**](https://github.com/tnrdd/vite-joint-account-frontend/blob/main/frontend/src/components/NewAccount.tsx#L80))
```js
await callContract(JointContract, 'createAccount', [
    [vcInstance?.accounts[0], ...members],
    threshold,
    0,
    0,
]);
let logs = await viteApi.request('ledger_getLatestAccountBlock', contractAddress);
const events = await getPastEvents(
    viteApi,
    contractAddress,
    JointContract.abi,
    'AccountCreated',
    {
        fromHeight: logs.height,
        toHeight: logs.height,
    }
);

const event = events.filter(
    (item) => item.returnValues['1'] === vcInstance?.accounts[0]
)[0];
```
This can lead to wrong data being found (actually happened while I was testing), because if the contract execution hasn't finished, you'll get the account id of the previous joint account.

A correct fix would be to get the block returned by callContract, wait for response by the contract and then get the id from the logs.

> Mike: Agree, this should be fixed

### The frontend does not use safe numbers
While checking for balances, the contract makes use of javascript's numbers, which is bad because they have a reputation of being not precise at all.  [**frontend/src/components/MotionView.tsx:252**](https://github.com/tnrdd/vite-joint-account-frontend/blob/main/frontend/src/components/MotionView.tsx#L252)

> Mike: Agree. `balance[0] > Number.MAX_SAFE_INTEGER` could easily be true. I would call `toBiggestUnit(balance[0])` instead of `toSmallestUnit(amount, tokenInfo.decimals)`

> Mike: All in all, thanks for the in-depth review. The contracts appear safe, but with room for optimization and the frontend could use a lot more work.
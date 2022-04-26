# Drip Vault 💧

This contract works as a holding vault for native Vite tokens, where select beneficiaries are allowed to withdraw a specified rate per cycle period. The duration of each cycle and and the amount of tokens that can be withdrawn are defined by the vault owner at time of deployment. 

# Deploying a Vault

To deploy a vault the following parameters must be specified: 

    + [vitetoken] token ID
    + [uint] number of tokens allowed per cycle 
    + [uint] frequency of each cycle in seconds
    + [bool] tokens can be drained from vault by owner 
    + [bool] lock settings to prevent changing later

The owner can choose to deploy the contract with a certain amount of tokens or they can be added after the vault has been created. 

# Making a Withdraw 

Once an account has been registered as a beneficiary, they can begin making a withdraw from the vault during each cycle period. 

    How a Cycle is Determined:

    Cycle Number = (Current Timestamp - Vault Creation Date) / Withdraw Frequency

    Example:

    CurrentTimestamp = 1646464479
    VaultCreationDate = 1646118719
    WithdrawFrequency = 86400 (1 day in seconds)

    Cycle Number = (1646464479 - 1646118719) / 86400 = 4

There will be a check performed at every withdraw to determine if the beneficiary has exceeded their limit for the current cycle. If so then transactions will be reverted and they will be prevented from making another withdraw until the next cycle is started. Any tokens that go uncollected cannnot be redeemed in future cycles, unless enabled in the settings.

# Depositing to Vault 

Beneficiaries are conditionally allowed make deposits of the same token ID as the vault. If a deposit is made it can be internally allocated to the vault owner or another registered beneficiary in the contract. The owner has no control over beneficiary deposits and cannot withdraw those funds, unless explicit permission is given via allocation. 

# Vault Settings 

The following settings determine what privillages the owner has and how beneficiaries can interact with the vault:

    'ownerCanRemoveFunds' 

Defined once at time of deployment, it allows the owner to drain the vault of any tokens they have deposited. This will also prevent beneficiaries from receiving anymore tokens. 

    'acceptAdditionalDeposits' 

Allows beneficiaries to deposit additional tokens into the vault where they can be allocated to another beneficiary or the vault owner. 

    'withdrawAmountStacks' 

Allows any tokens that went uncollected for a previous cycle to still be collected in future cycles. If set to true, then uncollected tokens will automatically be included with the amount requested by the beneficiary at time of withdraw.

    'settingsLocked'

Allows the owner to enable or disable the 'withdrawAmountStacks' and 'acceptAdditionalDeposits' settings after the vault has been deployed. If the condition is set to true at time of deployment (or after the contract is deployed) then all settings will remain locked and can no longer be changed. 


# To Perform Contract Tests
```
npm install
npm test
```  
In rare cases the testing framework may take longer than expected, which can cause a slight miscalculation when determining a cycle within the contract. If this happens simply re-run test to get expected results. 

# Disclaimer 

This is a prototype designed for the Vite Vuilder DAO Bounty. It is not yet intended to be used in a production environment. 


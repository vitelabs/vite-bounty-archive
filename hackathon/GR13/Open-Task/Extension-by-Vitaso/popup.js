const viteNode = new $vite_vitejs.ViteAPI(
  new $vite_WS.WS_RPC("wss://buidl.vite.net/gvite/ws")
);
let walletObject, lastBalances;

const ViteNS_Abi = [
  {
    constant: true,
    inputs: [
      { name: "_address", type: "address" },
      { name: "_slot", type: "uint8" },
    ],
    name: "getNameBySlot",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "offchain",
  },
  {
    constant: false,
    inputs: [
      { name: "_recipient", type: "address" },
      { name: "_slotId", type: "uint8" },
    ],
    name: "transfer",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { name: "_address", type: "address" },
      { name: "_slot", type: "uint8" },
      { name: "_tagId", type: "uint256" },
    ],
    name: "getTagsOfNameBySlot",
    outputs: [{ name: "", type: "bytes32[]" }],
    payable: false,
    stateMutability: "view",
    type: "offchain",
  },
  {
    constant: false,
    inputs: [{ name: "_newOwner", type: "address" }],
    name: "treasury_changeOwner",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "_address", type: "address" }],
    name: "getTotalNamesOfAddress",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "offchain",
  },
  {
    constant: false,
    inputs: [{ name: "_name", type: "string" }],
    name: "mint",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getTotalMints",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "offchain",
  },
  {
    constant: false,
    inputs: [
      { name: "_slotId", type: "uint8" },
      { name: "_tagId", type: "uint8" },
      { name: "_data", type: "bytes32" },
    ],
    name: "editTag",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "_amount", type: "uint256" }],
    name: "treasury_Withdrawal",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "_vnsAddress", type: "string" }],
    name: "resolveAddress",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "offchain",
  },
  { payable: true, stateMutability: "payable", type: "fallback" },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "_minter", type: "address" },
      { indexed: false, name: "_name", type: "string" },
    ],
    name: "Mint",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "_from", type: "address" },
      { indexed: false, name: "_to", type: "address" },
      { indexed: false, name: "_name", type: "string" },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "_name", type: "string" }],
    name: "Change",
    type: "event",
  },
];
const ViteNS_OffCCode = buffer.Buffer.from(
  "60806040526004361061007c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630532e9a41461007e5780632db37ced1461014b57806332876eb8146101fe5780637a5c56f414610258578063b109ad0714610276578063f7ee8b63146103375761007c565b005b6100cf600480360360408110156100955760006000fd5b81019080803574ffffffffffffffffffffffffffffffffffffffffff169060200190929190803560ff169060200190929190505050610397565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101105780820151818401525b6020810190506100f4565b50505050905090810190601f16801561013d5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101a6600480360360608110156101625760006000fd5b81019080803574ffffffffffffffffffffffffffffffffffffffffff169060200190929190803560ff169060200190929190803590602001909291905050506104ae565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b838110156101ea5780820151818401525b6020810190506101ce565b505050509050019250505060405180910390f35b610242600480360360208110156102155760006000fd5b81019080803574ffffffffffffffffffffffffffffffffffffffffff169060200190929190505050610583565b6040518082815260200191505060405180910390f35b6102606105dc565b6040518082815260200191505060405180910390f35b6102f36004803603602081101561028d5760006000fd5b81019080803590602001906401000000008111156102ab5760006000fd5b8201836020820111156102be5760006000fd5b803590602001918460018302840111640100000000831117156102e15760006000fd5b909192939090919293905050506105ee565b604051808274ffffffffffffffffffffffffffffffffffffffffff1674ffffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61033f610649565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b838110156103835780820151818401525b602081019050610367565b505050509050019250505060405180910390f35b6060600260005060008474ffffffffffffffffffffffffffffffffffffffffff1674ffffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000216000508260ff168154811015156103f057fe5b906000526020600021906002020160005b506000016000508054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561049c5780601f106104715761010080835404028352916020019161049c565b820191906000526020600021905b81548152906001019060200180831161047f57829003601f168201915b505050505090506104a8565b92915050565b6060600260005060008574ffffffffffffffffffffffffffffffffffffffffff1674ffffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000216000508360ff1681548110151561050757fe5b906000526020600021906002020160005b5060010160005080548060200260200160405190810160405280929190818152602001828054801561057057602002820191906000526020600021905b81600050546000191681526020019060010190808311610555575b5050505050905061057c565b9392505050565b6000600260005060008374ffffffffffffffffffffffffffffffffffffffffff1674ffffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000216000508054905090506105d7565b919050565b600060016000505490506105eb565b90565b600060036000508383604051808383808284378083019250505092505050908152602001604051809103902160009054906101000a900474ffffffffffffffffffffffffffffffffffffffffff169050610643565b92915050565b606060046000508054806020026020016040519081016040528092919081815260200182805480156106d257602002820191906000526020600021905b8160009054906101000a900474ffffffffffffffffffffffffffffffffffffffffff1674ffffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311610686575b505050505090506106de565b9056fea165627a7a723058200f7a21d1a52898fc27a8e8c988fe01386430c2472b52870bfac457b238845c580029",
  "hex"
).toString("base64");
const ViteNS_contractAddress =
  "vite_1077691249858a325a4387fa77a203e494d08167fa6234bc01";

document.addEventListener("DOMContentLoaded", function (event) {
  chrome.storage.local.get("wallet_mnemo", function (data) {
    if (typeof data.wallet_mnemo !== "undefined") {
      hide("setupWizard");
      show("walletScreen");

      walletObject = $vite_vitejs.wallet
        .getWallet(data.wallet_mnemo)
        .deriveAddress(0);
      refreshWallet();

      const receiveTask = new $vite_vitejs.accountBlock.ReceiveAccountBlockTask(
        {
          address: walletObject.address,
          privateKey: walletObject.privateKey,
          provider: viteNode,
        }
      );

      receiveTask.onSuccess((result) => {
        if (result.message === "Don't have unreceivedAccountBlocks.") return;
        refreshWallet();
      });

      receiveTask.onError((error) => {
        console.log("Error", error);
      });

      receiveTask.start({
        checkTime: 3000,
        transctionNumber: 10,
      });
    }

    document.getElementById("loader").classList = "pageloader";
  });

  document.getElementById("setupWizard_createNew").onclick = function () {
    const genMnemonics = $vite_vitejs.wallet.createMnemonics();

    chrome.storage.local.set({ wallet_mnemo: genMnemonics }, function () {
      copyToClipboard(genMnemonics);
      hide("setupWizard");
      bulmaToast.toast({
        message: "Mnemo copied, restarting...",
        type: "is-dark",
        dismissible: false,
        position: "center",
        animate: { in: "fadeIn", out: "fadeOut" },
      });
      setTimeout(function () {
        window.close();
      }, 5000);
    });
  };

  document.getElementById("walletScreen_sendMenu_send").onclick =
    async function () {
      if (
        document
          .getElementById("walletScreen_sendMenu_address")
          .value.endsWith(".vite")
      ) {
        const call = $vite_vitejs.abi.encodeFunctionCall(
          ViteNS_Abi,
          [
            document
              .getElementById("walletScreen_sendMenu_address")
              .value.replace(".vite", ""),
          ],
          "resolveAddress"
        );

        const result = await viteNode.request("contract_callOffChainMethod", {
          address: ViteNS_contractAddress,
          data: buffer.Buffer.from(call, "hex").toString("base64"),
          code: ViteNS_OffCCode,
        });

        const decoded = $vite_vitejs.abi.decodeParameters(
          ViteNS_Abi.find((e) => e.name === "resolveAddress").outputs.map(
            (e) => e.type
          ),
          buffer.Buffer.from(result, "base64").toString("hex")
        );

        if (
          decoded[0] ===
          "vite_0000000000000000000000000000000000000000a4f3a0cb58"
        )
          return bulmaToast.toast({
            message: "Not minted name, cannot resolve.",
            type: "is-danger",
            dismissible: false,
            position: "center",
            animate: { in: "fadeIn", out: "fadeOut" },
          });

        document.getElementById("walletScreen_sendMenu_address").value =
          decoded[0];
      }

      const sendBlock = $vite_vitejs.accountBlock
        .createAccountBlock("send", {
          address: walletObject.address,
          amount: (
            parseFloat(
              document.getElementById("walletScreen_sendMenu_amount").value
            ) *
            parseFloat(
              `1e${document
                .getElementById(
                  "walletScreen_sendMenu_tokens_" +
                    document.getElementById("walletScreen_sendMenu_tokens")
                      .options[
                      document.getElementById("walletScreen_sendMenu_tokens")
                        .selectedIndex
                    ].innerHTML
                )
                .getAttribute("decimals")}`
            )
          ).toString(),
          tokenId: document
            .getElementById(
              "walletScreen_sendMenu_tokens_" +
                document.getElementById("walletScreen_sendMenu_tokens").options[
                  document.getElementById("walletScreen_sendMenu_tokens")
                    .selectedIndex
                ].innerHTML
            )
            .getAttribute("tokenid"),
          toAddress: document.getElementById("walletScreen_sendMenu_address")
            .value,
        })
        .setProvider(viteNode)
        .setPrivateKey(walletObject.privateKey);

      const [quota, difficulty] = await Promise.all([
        viteNode.request("contract_getQuotaByAccount", walletObject.address),
        sendBlock.autoSetPreviousAccountBlock().then(() =>
          viteNode.request("ledger_getPoWDifficulty", {
            address: sendBlock.address,
            previousHash: sendBlock.previousHash,
            blockType: sendBlock.blockType,
            toAddress: sendBlock.toAddress,
            data: sendBlock.data,
          })
        ),
      ]);

      document.getElementById("walletScreen_sendMenu_address").value = "";

      hide("walletScreen_sendMenu");
      show("walletScreen_balances");

      if (BigInt(quota.currentQuota) < BigInt(difficulty.requiredQuota)) {
        bulmaToast.toast({
          message: "Generating pow...",
          type: "is-dark",
          dismissible: false,
          position: "center",
          animate: { in: "fadeIn", out: "fadeOut" },
        });
        await sendBlock.PoW(difficulty.difficulty);
      }

      await sendBlock.sign().send();

      bulmaToast.toast({
        message: "Sent!",
        type: "is-dark",
        dismissible: false,
        position: "center",
        animate: { in: "fadeIn", out: "fadeOut" },
      });

      refreshWallet();
    };

  document.getElementById("walletScreen_walletAddr").onclick = function () {
    copyToClipboard(walletObject.address);
    bulmaToast.toast({
      message: "Copied!",
      type: "is-dark",
      dismissible: false,
      position: "center",
      animate: { in: "fadeIn", out: "fadeOut" },
    });
  };

  document.getElementById("walletScreen_walletBal").onclick = function () {
    refreshWallet();
  };

  document.getElementById("walletScreen_controlTab_send").onclick =
    function () {
      hide("walletScreen_balances");
      show("walletScreen_sendMenu");
      hide("walletScreen_options");
    };

  document.getElementById("walletScreen_controlTab_balances").onclick =
    function () {
      show("walletScreen_balances");
      hide("walletScreen_sendMenu");
      hide("walletScreen_options");
    };

  document.getElementById("walletScreen_controlTab_options").onclick =
    function () {
      hide("walletScreen_balances");
      hide("walletScreen_sendMenu");
      show("walletScreen_options");
    };

  document.getElementById("walletScreen_options_deleteWallet").onclick =
    function () {
      chrome.storage.local.remove("wallet_mnemo", function () {
        hide("walletScreen");
        show("setupWizard");
      });
    };

  document.getElementById("setupWizard_import_import").onclick = function () {
    if (
      !$vite_vitejs.wallet.validateMnemonics(
        document.getElementById("setupWizard_import_mnemonics")
      )
    )
      return bulmaToast.toast({
        message: "Invalid mnemonics!",
        type: "is-dark",
        dismissible: false,
        position: "bottom_center",
        animate: { in: "fadeIn", out: "fadeOut" },
      });

    chrome.storage.local.set({ wallet_mnemo: genMnemonics }, function () {
      hide("setupWizard");
      bulmaToast.toast({
        message: "Mnemo imported, restarting...",
        type: "is-dark",
        dismissible: false,
        position: "center",
        animate: { in: "fadeIn", out: "fadeOut" },
      });
      setTimeout(function () {
        window.close();
      }, 5000);
    });
  };
});

const refreshWallet = () => {
  document.getElementById("walletScreen_walletAddr").innerHTML =
    '<span class="tag is-rounded is-primary">Copy</span> ' +
    walletObject.address.split("", 18).join("") +
    "...";

  document.getElementById("walletScreen_balances").innerHTML = "";

  viteNode
    .request("ledger_getAccountInfoByAddress", walletObject.address)
    .then((data) => {
      document.getElementById(
        "walletScreen_walletBal"
      ).innerHTML = `${balanceToReadable(
        data.balanceInfoMap?.[$vite_vitejs.constant.Vite_TokenId]?.balance ??
          "0",
        "18"
      )} VITE <img width="20" height="20" style="vertical-align:middle;" src="./dist/vite/vite.webp" draggable=false>`;

      lastBalances = data.balanceInfoMap;

      Object.entries(data.balanceInfoMap).forEach((token, index) => {
        if (token[1].tokenInfo.tokenId === $vite_vitejs.constant.Vite_TokenId)
          return;
        if (token[1].balance == 0) return;

        document.getElementById("walletScreen_balances").innerHTML += `
          <li style="background-color: rgb(27, 27, 27) !important;">
            <span class="icon"><i><img id="walletScreen_balances_${index}" width="100" height="100" style="vertical-align:middle;" src="https://vite-api.thomiz.dev/crypto-info/tokens/${
          token[1].tokenInfo.tokenId
        }/icon.png" draggable=false></i></span>
            <span>${token[1].tokenInfo.tokenName}</span>
            <span style="float: right;">${
              parseInt(token[1].balance) /
              parseFloat("1e+" + token[1].tokenInfo.decimals)
            } ${token[1].tokenInfo.tokenSymbol}</span>
          </li>
          <div class="margin-10"></div>
      `;

        document.getElementById("walletScreen_balances_" + index).onerror =
          function () {
            document.getElementById("walletScreen_balances_" + index).onerror =
              null;
            document.getElementById("walletScreen_balances_" + index).src =
              "./dist/vite/vite.webp";
          };
      });

      updateTokens();
    });
};

const updateTokens = () => {
  document.getElementById("walletScreen_sendMenu_tokens").innerHTML = "";

  Object.entries(lastBalances).forEach((token) => {
    if (token[1].balance == 0) return;

    document.getElementById("walletScreen_sendMenu_tokens").innerHTML += `
      <option id="walletScreen_sendMenu_tokens_${token[1].tokenInfo.tokenSymbol}" decimals="${token[1].tokenInfo.decimals}" tokenId="${token[1].tokenInfo.tokenId}">${token[1].tokenInfo.tokenSymbol}</option>
    `;
  });
};

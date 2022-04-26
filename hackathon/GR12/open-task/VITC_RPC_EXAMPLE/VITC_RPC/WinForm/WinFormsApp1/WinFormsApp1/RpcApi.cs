using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;
using VITC.Shared;
using VITC.Shared.DataTypes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Net;

namespace WinFormsApp1
{
    /// <summary>
    /// Check the vite documentation for more properties for each object. I only included the important properties.
    /// Most of these reponses have more properties you can see
    /// </summary>
    public class AccountBalanceResponse
    {
 
        public string jsonrpc { get; set; }


        public Result result { get; set; }
        public String Error
        {
            get;
            set;
        }


        public class TokenInfo //most nested element
        {
            public string tokenname { get; set; }
            public string tokensymbol { get; set; }
            public string totalsupply { get; set; }
            public string decimals { get; set; }
            public string owner { get; set; }
            public string tokenid { get; set; }
            public string maxsupply { get; set; }
            public string ownerburnonly { get; set; }
            public string isreissuable { get; set; }
            public string index { get; set; }
            public string isownerburnonly { get; set; }
        }

        public class balanceInfoMap //most nested element
        {
            //add more contract ID's here. and make a new class with the info
            //just like this one with a Token info and a Balance property
            public tti_22d0b205bed4d268a05dfc3c tti_22d0b205bed4d268a05dfc3c { get; set; }

        }


        public class tti_22d0b205bed4d268a05dfc3c   //Second most nested thing
        {
            public TokenInfo tokeninfo { get; set; }
            public BigInteger Balance { get; set; }
        }

        public class Result //least nested thing
        {
            public string address { get; set; }
            public string blockcount { get; set; }
            public balanceInfoMap balanceinfomap { get; set; }
        }




        public bool IsSuccessful => String.IsNullOrEmpty(Error);
    }


    public class AccountHistoryResponse
    {
    
        public String Error
        {
            get;
            set;
        }

        public bool IsSuccessful => String.IsNullOrEmpty(Error);


        public string jsonrpc { get; set; }

        public IEnumerable<Result> result { get; set; }


        public class Result //least nested thing
        {
            public string blocktype { get; set; }
            public string height { get; set; }
            public string hash { get; set; }
            public string previousHash { get; set; }
            public string address { get; set; }
            public string publicKey { get; set; }
            public string producer { get; set; }
            public string fromaddress { get; set; }
            public string toaddress { get; set; }
            public string sendBlockHash { get; set; }
            public string tokenId { get; set; }
            public BigInteger amount { get; set; }
            public string fee { get; set; }
            public string data { get; set; }
            public string difficulty { get; set; }
            public string nonce { get; set; }
            public string signature { get; set; }
            public string quotaByStake { get; set; }
            public string totalQuota { get; set; }
            public string vmLogHash { get; set; }

            public TokenInfo tokeninfo { get; set; }
            public string confirmations { get; set; }
            public string firstSnapshotHash { get; set; }
            public string receiveBlockHeight { get; set; }
            public string receiveBlockHash { get; set; }
            public long timestamp { get; set; }


            public triggeredSendBlockList triggeredsendblocklist { get; set; }
        }

    }



    public class TokenInfo //most nested element
    {
        public string tokenname { get; set; }
        public string tokensymbol { get; set; }
        public string totalsupply { get; set; }
        public string decimals { get; set; }
        public string owner { get; set; }
        public string tokenid { get; set; }
        public string maxsupply { get; set; }
        public string ownerburnonly { get; set; }
        public string isreissuable { get; set; }
        public string index { get; set; }
        public string isownerburnonly { get; set; }
    }
    public class triggeredSendBlockList   //Second most nested thing
    {
        public string blockType { get; set; }
        public string height { get; set; }
        public string hash { get; set; }
        public string previousHash { get; set; }
        public string address { get; set; }
        public string publicKey { get; set; }
        public string producer { get; set; }
        public string fromAddress { get; set; }
        public string toAddress { get; set; }
        public string sendBlockHash { get; set; }
        public string tokenId { get; set; }
        public BigInteger amount { get; set; }
        public string fee { get; set; }
        public string data { get; set; }
        public string difficulty { get; set; }
        public string nonce { get; set; }
        public string signature { get; set; }
        public string quotaByStake { get; set; }
        public string totalQuota { get; set; }
        public string vmLogHash { get; set; }

        public TokenInfo tokeninfo { get; set; }

    }
    public class SendResponse
    {
        public string result
        {
            get;
            set;
        }

        public String Error
        {
            get;
            set;
        }

        public bool IsSuccessful => String.IsNullOrEmpty(Error);
    }

    public class VITCRpcClient : IDisposable
    {
        private Uri _rpcUri;
        private HttpClient _httpClient;
        public VITCRpcClient(string ipAddress, int port, HttpClient httpClient = null)
        {
            //_rpcUri = new Uri($"http://{ipAddress}:{port}/");
            _rpcUri = new Uri($"{ipAddress}:{port}/");



            _httpClient = httpClient ?? new HttpClient();
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
        }

        public VITCRpcClient(string uri)
        {
            _rpcUri = new Uri(uri);
            _httpClient = new HttpClient();
        }

        private async Task<string> CallRpcMethod(string json)
        {
            json = json.Replace("\"True\"", "\"true\"");
            json = json.Replace("\"False\"", "\"false\"");
            var content = new StringContent(json, Encoding.UTF8, "application/json");
           
            var responseMessage = await _httpClient.PostAsync(_rpcUri, content);

            if (!responseMessage.IsSuccessStatusCode)
                throw new HttpRequestException($"Http status code: {responseMessage.StatusCode}");
            return await responseMessage.Content.ReadAsStringAsync();
        }

        public void Dispose()
        {
            _httpClient.Dispose();
        }



        public async Task<AccountBalanceResponse> AccountBalance(string account)
        {
            var jobject = new JObject();

            jobject["jsonrpc"] = "2.0";
            jobject["id"] = "17";
            jobject["method"] = "ledger_getAccountInfoByAddress";
            jobject["params"] = new JArray(account);

            var response = await CallRpcMethod(jobject.ToString());

            return JsonConvert.DeserializeObject<AccountBalanceResponse>(response, WinFormsApp1.JsonSerializationSettings.PascalCaseSettings);
        }


        public async Task<AccountHistoryResponse> AccountHistory(PublicAddress account, int Pagecount, int PageSize)
        {
            var jobject = new JObject();

            jobject["jsonrpc"] = "2.0";
            jobject["id"] = "17";
            jobject["method"] = "ledger_getAccountBlocksByAddress";
            jobject["params"] = new JArray(account.Address, Pagecount, PageSize);
            var response = await CallRpcMethod(jobject.ToString());
            return JsonConvert.DeserializeObject<AccountHistoryResponse>(response, WinFormsApp1.JsonSerializationSettings.PascalCaseSettings);
        }

   


        public async Task<SendResponse> SendVitC(HexKey64 wallet, string source, string destination, BigInteger amount, string tokenContractID)
        {

            var jobject = new JObject();

            jobject["jsonrpc"] = "2.0";
            jobject["id"] = "17";
            jobject["method"] = "wallet_createTxWithPassphrase";

            var jobject2 = new JObject();

            jobject2["selfAddr"] = source;
            jobject2["toAddr"] = destination;
            jobject2["tokenTypeId"] = tokenContractID;
            jobject2["passphrase"] = "password you set in your node setup file";
            jobject2["amount"] = amount.ToString();


            jobject["params"] = new JArray(jobject2);


            var response = await CallRpcMethod(jobject.ToString());
            
            return JsonConvert.DeserializeObject<SendResponse>(response, WinFormsApp1.JsonSerializationSettings.PascalCaseSettings);
        }


    }
}

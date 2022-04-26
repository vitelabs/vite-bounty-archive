using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using VITC.Shared;
using VITC.Shared.DataTypes;
using RestSharp;
using RestSharp.Authenticators;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RestSharp.Serialization.Json;



namespace WinFormsApp1
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }
        /// <summary>
        /// Note the ASYNC in the button click event!
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private async void btnGetBal_Click(object sender, EventArgs e)
        {
            try
            {
                
                //set up the client object using the address and port of the node you wish to use
                var client = new VITCRpcClient(txtNode.Text, int.Parse(txtPort.Text));


                //get the account balance
                var ressy = await client.AccountBalance(txtViteAddress.Text);

                //show it on the label!
               lblBal.Text = WinFormsApp1.Tools.ToNano(ressy.result.balanceinfomap.tti_22d0b205bed4d268a05dfc3c.Balance).ToString();

            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message + Environment.NewLine + ex.InnerException);

            }
        }

        private async void button1_Click(object sender, EventArgs e)
        {
            try
            {
                txtHistoryStuff.Text = "";

                //set up the client object using the address and port of the node you wish to use
                var client = new VITCRpcClient(txtNode.Text, int.Parse(txtPort.Text));

                //get the account balance
                var ressy = await client.AccountHistory(txtViteAddress.Text, 0, 50);

                string wow2 = ressy.ToString();

                if (ressy.result != null)
                {
                    
                    int i = 0;
                    foreach (var Resulteration in ressy.result)
                    {
                        if (Resulteration.tokeninfo.tokenid == "tti_22d0b205bed4d268a05dfc3c")
                        {
                            //2 is send, 4 is receive
                            if (Resulteration.blocktype == "2")
                            {
                                txtHistoryStuff.Text = txtHistoryStuff.Text + "Sent " + WinFormsApp1.Tools.ToNano(Resulteration.amount).ToString() + Environment.NewLine +
                                        "Time Stamp: " + DateTimeOffset.FromUnixTimeSeconds(Resulteration.timestamp).UtcDateTime + Environment.NewLine +
                                                                      "Hash: " + Resulteration.hash.ToString() + Environment.NewLine + "-----------------" + Environment.NewLine;

                            }
                            else if(Resulteration.blocktype == "4")
                            {
                                txtHistoryStuff.Text = txtHistoryStuff.Text + "Received " + WinFormsApp1.Tools.ToNano(Resulteration.amount).ToString() + Environment.NewLine +
                                                                      "Time Stamp: " + DateTimeOffset.FromUnixTimeSeconds(Resulteration.timestamp).UtcDateTime + Environment.NewLine +
                                                                      "Hash: " + Resulteration.hash.ToString() + Environment.NewLine + "-----------------" + Environment.NewLine;

                            }
                            
                        }
                        i++;
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);

            }
        }

        private async void btnSend_Click(object sender, EventArgs e)
        {
            try
            {
                var client = new VITCRpcClient(txtNode.Text, int.Parse(txtPort.Text));

                //example uses vitamin coin
                var sendyBlock = await client.SendVitC("PARAMETER NOT USED", txtViteAddress.Text, txtSendViteTo.Text, (BigInteger)WinFormsApp1.Tools.ToRaw(decimal.Parse(txtVITCsendamount.Text)), "tti_22d0b205bed4d268a05dfc3c");

                lblResultSend.Text = sendyBlock.result;
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);

            }
        }

        private void button2_Click(object sender, EventArgs e)
        {
            //Bonus method that will grab prices from the vitex exchange
            var client = new RestClient("https://api.vitex.net/");
            client.Authenticator = new HttpBasicAuthenticator("API user key (free if you register on vitex exchange and look at API)", "API Password");

            //grab vitamin coin price for example.
            //more than one symbol can be given, separated by comma
            var request = new RestRequest("/api/v2/exchange-rate?tokenSymbols=VITC-000", DataFormat.Json);
            var response = client.Get(request);
            var resultobject = new JObject();
            resultobject = JObject.Parse(response.Content.ToString());
            VitexResponse BananoResponse = new JsonDeserializer().Deserialize<VitexResponse>(response);

            //use .elementAT to get a particular item
            string VITC = BananoResponse.data.First().usdrate;


            MessageBox.Show("Vitamincoin price is: " + VITC.ToString());


        }


        public class VitexResponse
        {
            public string code { get; set; }
            public string msg { get; set; }
            public IEnumerable<data> data { get; set; }

        }

        public class data //most nested element
        {
            public string tokenid { get; set; }
            public string tokensymbol { get; set; }
            public string usdrate { get; set; }
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }




        /// <summary>
        /// returns a datatable of the latest transactions
        /// </summary>
        /// <param name="AddMinutes">how far back to grab in minutes from now. (-5 is 5 minutes ago to present)</param>
        /// <param name="TokenID">Token Contract</param>
        /// <param name="SendOrReceive">0 = both, 1 = send only, 2 = receive only</param>
        /// <returns></returns>
        private async Task<DataTable> GetLatestTransVITC(int AddMinutes, string TokenID, int SendOrReceive)
        {
            try
            {
                //set up the client object using the address and port of the node you wish to use
                var client = new VITCRpcClient(txtNode.Text, int.Parse(txtPort.Text));

                //get the account balance
                var ressy = await client.AccountHistory(txtViteAddress.Text, 0, 10000);

                string wow2 = ressy.ToString();

                DataTable dtResult = new DataTable();
                dtResult.Columns.Add("TransTime");
                dtResult.Columns.Add("TransTime2");

                dtResult.Columns.Add("SendReceive");
                dtResult.Columns.Add("FromAddress");
                dtResult.Columns.Add("ToAddress");
                dtResult.Columns.Add("Hash");
                dtResult.Columns.Add("Amount");

                if (ressy.result != null)
                {

                    int i = 0;
                    foreach (var Resulteration in ressy.result)
                    {
                        if (Resulteration.tokeninfo.tokenid == TokenID)
                        {
                            if (DateTimeOffset.FromUnixTimeSeconds(Resulteration.timestamp).UtcDateTime >= DateTime.Now.ToUniversalTime().AddMinutes(AddMinutes))
                            {

                                //2 is send, 4 is receive
                                if (Resulteration.blocktype == "2")
                                {
                                    if (SendOrReceive == 1 || SendOrReceive == 0)
                                    {
                                        string wow21d = DateTimeOffset.FromUnixTimeSeconds(Resulteration.timestamp).UtcDateTime.ToString();
                                        string wow3d = DateTime.Now.ToUniversalTime().AddMinutes(AddMinutes).ToString();

                                        TimeSpan tsd = DateTimeOffset.FromUnixTimeSeconds(Resulteration.timestamp).UtcDateTime - DateTime.Now.AddMinutes(AddMinutes).ToUniversalTime();
                                        string mindiffd = tsd.TotalMinutes.ToString();


                                        DataRow roweh = dtResult.NewRow();
                                        roweh["TransTime"] = DateTimeOffset.FromUnixTimeSeconds(Resulteration.timestamp).UtcDateTime;
                                        roweh["TransTime2"] = DateTime.Now.ToUniversalTime().AddMinutes(AddMinutes).ToString();
                                        roweh["SendReceive"] = "Send";
                                        roweh["FromAddress"] = Resulteration.address;
                                        roweh["ToAddress"] = "";
                                        roweh["Hash"] = Resulteration.hash.ToString();
                                        roweh["Amount"] = WinFormsApp1.Tools.ToNano(Resulteration.amount).ToString();
                                        dtResult.Rows.Add(roweh);
                                    }
                                }
                                else if (Resulteration.blocktype == "4")
                                {
                                    if (SendOrReceive == 2 || SendOrReceive == 0)
                                    {
                                        string wow21 = DateTimeOffset.FromUnixTimeSeconds(Resulteration.timestamp).UtcDateTime.ToString();
                                        string wow3 = DateTime.Now.ToUniversalTime().AddMinutes(AddMinutes).ToString();

                                        TimeSpan ts = DateTimeOffset.FromUnixTimeSeconds(Resulteration.timestamp).UtcDateTime - DateTime.Now.AddMinutes(AddMinutes).ToUniversalTime();
                                        string mindiff = ts.TotalMinutes.ToString();


                                        DataRow roweh = dtResult.NewRow();
                                        roweh["TransTime"] = DateTimeOffset.FromUnixTimeSeconds(Resulteration.timestamp).UtcDateTime;
                                        roweh["SendReceive"] = "Receive";
                                        roweh["FromAddress"] = Resulteration.fromaddress;
                                        roweh["ToAddress"] = "";
                                        roweh["Hash"] = Resulteration.hash.ToString();
                                        roweh["Amount"] = WinFormsApp1.Tools.ToNano(Resulteration.amount).ToString();
                                        dtResult.Rows.Add(roweh);
                                    }

                                }


                            }
                            

                            
                            i++;
                        }
                    }
                }

                return dtResult;
            }
            catch (Exception ex)
            {

                return new DataTable();
            }
        }


    }




}


namespace WinFormsApp1
{
    partial class Form1
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Form1));
            this.txtPort = new System.Windows.Forms.TextBox();
            this.txtNode = new System.Windows.Forms.TextBox();
            this.lblBal = new System.Windows.Forms.Label();
            this.label1 = new System.Windows.Forms.Label();
            this.txtViteAddress = new System.Windows.Forms.TextBox();
            this.btnGetBal = new System.Windows.Forms.Button();
            this.label3 = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.button1 = new System.Windows.Forms.Button();
            this.txtHistoryStuff = new System.Windows.Forms.TextBox();
            this.btnSend = new System.Windows.Forms.Button();
            this.txtVITCsendamount = new System.Windows.Forms.TextBox();
            this.button2 = new System.Windows.Forms.Button();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.label7 = new System.Windows.Forms.Label();
            this.label6 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.lblResultSend = new System.Windows.Forms.TextBox();
            this.txtSendViteTo = new System.Windows.Forms.TextBox();
            this.groupBox1.SuspendLayout();
            this.SuspendLayout();
            // 
            // txtPort
            // 
            this.txtPort.Location = new System.Drawing.Point(105, 94);
            this.txtPort.Name = "txtPort";
            this.txtPort.Size = new System.Drawing.Size(53, 23);
            this.txtPort.TabIndex = 15;
            this.txtPort.Text = "48132";
            this.txtPort.TextAlign = System.Windows.Forms.HorizontalAlignment.Right;
            // 
            // txtNode
            // 
            this.txtNode.Location = new System.Drawing.Point(130, 67);
            this.txtNode.Name = "txtNode";
            this.txtNode.Size = new System.Drawing.Size(231, 23);
            this.txtNode.TabIndex = 14;
            this.txtNode.Text = "https://node.vite.net/gvite";
            this.txtNode.TextAlign = System.Windows.Forms.HorizontalAlignment.Right;
            // 
            // lblBal
            // 
            this.lblBal.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.lblBal.Location = new System.Drawing.Point(227, 94);
            this.lblBal.Margin = new System.Windows.Forms.Padding(5, 0, 5, 0);
            this.lblBal.Name = "lblBal";
            this.lblBal.Size = new System.Drawing.Size(220, 25);
            this.lblBal.TabIndex = 12;
            this.lblBal.TextAlign = System.Drawing.ContentAlignment.TopRight;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(8, 19);
            this.label1.Margin = new System.Windows.Forms.Padding(5, 0, 5, 0);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(277, 15);
            this.label1.TabIndex = 11;
            this.label1.Text = "VIT C Address To Get Balance or Transaction History";
            // 
            // txtViteAddress
            // 
            this.txtViteAddress.Location = new System.Drawing.Point(8, 39);
            this.txtViteAddress.Margin = new System.Windows.Forms.Padding(5);
            this.txtViteAddress.Name = "txtViteAddress";
            this.txtViteAddress.Size = new System.Drawing.Size(364, 23);
            this.txtViteAddress.TabIndex = 10;
            this.txtViteAddress.Text = "vite_34e439bd849306edd61f24d9d1da35040b576bf014a13cb9a0";
            // 
            // btnGetBal
            // 
            this.btnGetBal.Location = new System.Drawing.Point(382, 39);
            this.btnGetBal.Margin = new System.Windows.Forms.Padding(5);
            this.btnGetBal.Name = "btnGetBal";
            this.btnGetBal.Size = new System.Drawing.Size(89, 23);
            this.btnGetBal.TabIndex = 9;
            this.btnGetBal.Text = "Get Balance";
            this.btnGetBal.UseVisualStyleBackColor = true;
            this.btnGetBal.Click += new System.EventHandler(this.btnGetBal_Click);
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(8, 67);
            this.label3.Margin = new System.Windows.Forms.Padding(5, 0, 5, 0);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(114, 15);
            this.label3.TabIndex = 16;
            this.label3.Text = "Vit C Node to query:";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(8, 98);
            this.label4.Margin = new System.Windows.Forms.Padding(5, 0, 5, 0);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(89, 15);
            this.label4.TabIndex = 17;
            this.label4.Text = "VITE Node Port:";
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(166, 98);
            this.label5.Margin = new System.Windows.Forms.Padding(5, 0, 5, 0);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(51, 15);
            this.label5.TabIndex = 18;
            this.label5.Text = "Balance:";
            // 
            // button1
            // 
            this.button1.Location = new System.Drawing.Point(8, 155);
            this.button1.Margin = new System.Windows.Forms.Padding(5);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(141, 23);
            this.button1.TabIndex = 19;
            this.button1.Text = "Get Transaction History!";
            this.button1.UseVisualStyleBackColor = true;
            this.button1.Click += new System.EventHandler(this.button1_Click);
            // 
            // txtHistoryStuff
            // 
            this.txtHistoryStuff.Font = new System.Drawing.Font("Segoe UI", 8F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.txtHistoryStuff.Location = new System.Drawing.Point(6, 187);
            this.txtHistoryStuff.Multiline = true;
            this.txtHistoryStuff.Name = "txtHistoryStuff";
            this.txtHistoryStuff.ScrollBars = System.Windows.Forms.ScrollBars.Vertical;
            this.txtHistoryStuff.Size = new System.Drawing.Size(421, 193);
            this.txtHistoryStuff.TabIndex = 20;
            // 
            // btnSend
            // 
            this.btnSend.Location = new System.Drawing.Point(8, 129);
            this.btnSend.Margin = new System.Windows.Forms.Padding(5);
            this.btnSend.Name = "btnSend";
            this.btnSend.Size = new System.Drawing.Size(82, 21);
            this.btnSend.TabIndex = 21;
            this.btnSend.Text = "Send Vit C";
            this.btnSend.UseVisualStyleBackColor = true;
            this.btnSend.Click += new System.EventHandler(this.btnSend_Click);
            // 
            // txtVITCsendamount
            // 
            this.txtVITCsendamount.Location = new System.Drawing.Point(98, 127);
            this.txtVITCsendamount.Name = "txtVITCsendamount";
            this.txtVITCsendamount.Size = new System.Drawing.Size(40, 23);
            this.txtVITCsendamount.TabIndex = 22;
            this.txtVITCsendamount.Text = "1";
            this.txtVITCsendamount.TextAlign = System.Windows.Forms.HorizontalAlignment.Right;
            // 
            // button2
            // 
            this.button2.Location = new System.Drawing.Point(325, 38);
            this.button2.Name = "button2";
            this.button2.Size = new System.Drawing.Size(332, 23);
            this.button2.TabIndex = 23;
            this.button2.Text = "Get Exchange Rates From Vitex!";
            this.button2.UseVisualStyleBackColor = true;
            this.button2.Click += new System.EventHandler(this.button2_Click);
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.label7);
            this.groupBox1.Controls.Add(this.label6);
            this.groupBox1.Controls.Add(this.label2);
            this.groupBox1.Controls.Add(this.lblResultSend);
            this.groupBox1.Controls.Add(this.txtSendViteTo);
            this.groupBox1.Controls.Add(this.label1);
            this.groupBox1.Controls.Add(this.txtViteAddress);
            this.groupBox1.Controls.Add(this.txtHistoryStuff);
            this.groupBox1.Controls.Add(this.btnSend);
            this.groupBox1.Controls.Add(this.button1);
            this.groupBox1.Controls.Add(this.txtVITCsendamount);
            this.groupBox1.Controls.Add(this.btnGetBal);
            this.groupBox1.Controls.Add(this.label3);
            this.groupBox1.Controls.Add(this.txtNode);
            this.groupBox1.Controls.Add(this.label4);
            this.groupBox1.Controls.Add(this.label5);
            this.groupBox1.Controls.Add(this.txtPort);
            this.groupBox1.Controls.Add(this.lblBal);
            this.groupBox1.Location = new System.Drawing.Point(12, 67);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(642, 401);
            this.groupBox1.TabIndex = 24;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "VITE Stuff";
            // 
            // label7
            // 
            this.label7.Location = new System.Drawing.Point(435, 189);
            this.label7.Margin = new System.Windows.Forms.Padding(5, 0, 5, 0);
            this.label7.Name = "label7";
            this.label7.Size = new System.Drawing.Size(184, 191);
            this.label7.TabIndex = 30;
            this.label7.Text = resources.GetString("label7.Text");
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Location = new System.Drawing.Point(166, 159);
            this.label6.Margin = new System.Windows.Forms.Padding(5, 0, 5, 0);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(98, 15);
            this.label6.TabIndex = 29;
            this.label6.Text = "Send Result Hash";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(146, 130);
            this.label2.Margin = new System.Windows.Forms.Padding(5, 0, 5, 0);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(91, 15);
            this.label2.TabIndex = 28;
            this.label2.Text = "To This Address:";
            // 
            // lblResultSend
            // 
            this.lblResultSend.Location = new System.Drawing.Point(274, 156);
            this.lblResultSend.Margin = new System.Windows.Forms.Padding(5);
            this.lblResultSend.Name = "lblResultSend";
            this.lblResultSend.Size = new System.Drawing.Size(357, 23);
            this.lblResultSend.TabIndex = 24;
            // 
            // txtSendViteTo
            // 
            this.txtSendViteTo.Location = new System.Drawing.Point(247, 127);
            this.txtSendViteTo.Margin = new System.Windows.Forms.Padding(5);
            this.txtSendViteTo.Name = "txtSendViteTo";
            this.txtSendViteTo.Size = new System.Drawing.Size(384, 23);
            this.txtSendViteTo.TabIndex = 23;
            this.txtSendViteTo.Text = "vite_34e439bd849306edd61f24d9d1da35040b576bf014a13cb9a0";
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(669, 482);
            this.Controls.Add(this.groupBox1);
            this.Controls.Add(this.button2);
            this.Name = "Form1";
            this.Text = "VITE NODE TESTER";
            this.Load += new System.EventHandler(this.Form1_Load);
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.TextBox txtPort;
        private System.Windows.Forms.TextBox txtNode;
        private System.Windows.Forms.Label lblBal;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox txtViteAddress;
        private System.Windows.Forms.Button btnGetBal;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Button button1;
        private System.Windows.Forms.TextBox txtHistoryStuff;
        private System.Windows.Forms.Button btnSend;
        private System.Windows.Forms.TextBox txtVITCsendamount;
        private System.Windows.Forms.Button button2;
        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.TextBox txtSendViteTo;
        private System.Windows.Forms.TextBox lblResultSend;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label7;
    }
}


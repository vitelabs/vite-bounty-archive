import 'package:flutter/material.dart';

import '../utils/ABIs.dart';
import '../utils/default_appbar.dart';

class CreateProposal extends StatefulWidget {
  const CreateProposal({ Key? key }) : super(key: key);

  @override
  State<CreateProposal> createState() => _CreateProposalState();
}

class _CreateProposalState extends State<CreateProposal> {
  ABIs abi = ABIs();
  String action = "Transfer Token";
  String token = "GOD";
  String amount = "";
  String to = "";
  String title = "";
  String description = "";

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topRight,
          end: Alignment.bottomLeft,
          // stops: [0.1, 0.5, 0.7, 0.9],
          colors: [
            Colors.greenAccent,
            Colors.black45,
            Colors.black45,
            Colors.black54,
            Colors.black54,
            Colors.black87,
            Colors.black
          ],
        ),
      ),
      child: Scaffold(
        backgroundColor: Colors.transparent,
        appBar: PreferredSize(
          preferredSize: const Size.fromHeight(60),
          child: DefaultAppbar()
        ),
        body: Center(
          child: Container(
            width: 600,
            height: 540,
            decoration: BoxDecoration(
              color: Colors.black,
              borderRadius: BorderRadius.circular(20),  
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                SizedBox(height: 20,),
                // proposal title
                Text("Create Proposal", style: TextStyle(fontSize: 20, color: Colors.white),),
                SizedBox(height: 20,),
                InkWell(
                  onTap: (){
      
                  },
                  child: Container(
                    width: 580,
                    height: 50,
                    decoration: BoxDecoration(
                      color: Colors.grey,
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Align(
                          
                          alignment: Alignment.centerLeft,
                          child: Text("   Proposed Action", style: TextStyle(fontWeight: FontWeight.bold, color: Colors.black),),
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text("  "+action, style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.black),),
                            Icon(
                              Icons.arrow_drop_down_sharp,
                              color: Colors.black,
                              size: 30,
                            )
                          ],
                        )
                      ],
                    ),
                  ),
                ),
                SizedBox(height: 5),
                Container(
                  width: 580,
                  height: 55,
                  decoration: BoxDecoration(
                    color: Colors.grey,
                    borderRadius: BorderRadius.circular(10),  
                  ),
                  child: Row(
                    children: [
                      Align(
                        alignment: Alignment.centerLeft,
                        child: Text("  To:", style: TextStyle(fontWeight: FontWeight.bold, color: Colors.black, fontSize: 18),),
                      ),
                      Container(
                        padding: const EdgeInsets.only(left:8.0),
                        width: 530,
                        child: TextFormField(
                          textAlign: TextAlign.left,
                          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                          
                          cursorColor: Colors.green,
                          decoration: InputDecoration(
                            hintStyle: TextStyle(fontSize: 18),
                            hintText: "0x0",
                            border: InputBorder.none,
                          ),
                          onChanged: (value) {
                            setState((){
                              to = value;
                            });
                          },
                        ),
                      ),
                    ],
                  ),
                ),
                SizedBox(height: 5,),
                Container(
                  width: 580,
                  height: 55,
                  decoration: BoxDecoration(
                    color: Colors.grey,
                    borderRadius: BorderRadius.circular(10),  
                  ),
                  child: Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.only(left:8.0),
                        width: 480,
                        child: TextFormField(
                          textAlign: TextAlign.left,
                          style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                          
                          cursorColor: Colors.green,
                          decoration: InputDecoration(
                            hintStyle: TextStyle(fontSize: 20),
                            hintText: "0.0",
                            border: InputBorder.none,
                          ),
                          onChanged: (value) {
                            setState((){
                              amount = value;
                            });
                          },
                        ),
                      ),
                      InkWell(
                        onTap: (){
      
                        },
                        child: Container(
                          width: 100,
                          child: Row(
                            children: [
                              Text(token, style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                              Icon(
                                Icons.arrow_drop_down_sharp,
                                color: Colors.black,
                                size: 30,
                              )
                            ]
                          )
                        ),
                      )
                    ],
                  ),
                ),
                SizedBox(height: 5,),
                Container(
                  width: 580,
                  height: 55,
                  decoration: BoxDecoration(
                    color: Colors.grey,
                    borderRadius: BorderRadius.circular(10),  
                  ),
                  child: Container(
                    padding: const EdgeInsets.only(left:8.0),
                    width: 530,
                    child: TextFormField(
                      textAlign: TextAlign.left,
                      style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                      
                      cursorColor: Colors.green,
                      decoration: InputDecoration(
                        hintStyle: TextStyle(fontSize: 18),
                        hintText: "Proposal Title",
                        border: InputBorder.none,
                      ),
                      onChanged: (value) {
                        setState((){
                          title = "#$value#";
                        });
                      },
                    ),
                  ),
                ),
                SizedBox(height: 5),
                Container(
                  width: 580,
                  height: 200,
                  decoration: BoxDecoration(
                    color: Colors.grey,
                    borderRadius: BorderRadius.circular(10),  
                  ),
                  child: Container(
                    padding: const EdgeInsets.only(left:8.0),
                    width: 530,
                    child: TextFormField(
                      keyboardType: TextInputType.multiline,
                      maxLines: 10,
                      textAlign: TextAlign.left,
                      style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                      
                      cursorColor: Colors.green,
                      decoration: InputDecoration(
                        hintStyle: TextStyle(fontSize: 18),
                        hintText: "Proposal Description",
                        border: InputBorder.none,
                      ),
                      onChanged: (value) {
                        setState((){
                          description = value;
                        });
                      },
                    ),
                  ),
                ),
                Container(
                  height: 30.0,
                  width: 580,
                  margin: EdgeInsets.symmetric(vertical: 5),
                  child: RaisedButton(
                    onPressed: () async {
                      
                    },
                    shape:
                        RoundedRectangleBorder(borderRadius: BorderRadius.circular(10.0)),
                    padding: EdgeInsets.all(0.0),
                    child: Ink(
                      decoration: BoxDecoration(
                          gradient: LinearGradient(
                            begin: Alignment.topRight,
                            end: Alignment.bottomLeft,
                            colors: [
                              Colors.green,
                              Colors.yellow,
                              Colors.green,
                            ]
                          ),
                          borderRadius: BorderRadius.circular(10.0)),
                      child: Container(
                        constraints:
                            BoxConstraints(maxWidth: 580, minHeight: 20.0),
                        alignment: Alignment.center,
                        child: Text(
                          "Create",
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            color: Colors.black,
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ),
                  ),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }

  
}
import 'package:vitedefi/screens/vote_components/create_proposal_screen.dart';
import "package:flutter/material.dart";

import '../utils/default_appbar.dart';

class VoteScreen extends StatefulWidget {
  const VoteScreen({ Key? key }) : super(key: key);

  @override
  State<VoteScreen> createState() => _VoteScreenState();
}

class _VoteScreenState extends State<VoteScreen> {
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
            width: 500,
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      "Proposals",
                      style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white),
                    ),
                    Container(
                      height: 40.0,
                      width: 160,
                      margin: EdgeInsets.symmetric(vertical: 5),
                      child: RaisedButton(
                        onPressed: () {
                          Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) => CreateProposal()),);
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
                                BoxConstraints(maxWidth: 160, minHeight: 20.0),
                            alignment: Alignment.center,
                            child: Text(
                              "Create Proposal",
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
                )
              ],
            )
          ),
        ),
      ),
    );
  }
}
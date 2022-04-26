import "package:flutter/material.dart";

import '../utils/default_appbar.dart';
import 'add_liquidity_screen.dart';


class Pool extends StatefulWidget {
  const Pool({ Key? key }) : super(key: key);

  @override
  State<Pool> createState() => _PoolState();
}

class _PoolState extends State<Pool> {
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
              height: 500,
              decoration: BoxDecoration(
                color: Colors.black,
                borderRadius: BorderRadius.circular(20),  
              ),
              child: Column(
                children: [
                  SizedBox(height: 20),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      Container(
                        height: 55.0,
                        width: 100,
                        child: RaisedButton(
                          onPressed: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) => AddLiquidity()),);
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
                                  ],
                                ),
                                borderRadius: BorderRadius.circular(10.0)),
                            child: Container(
                              alignment: Alignment.center,
                              child: Text(
                                "Create New Pool",
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
                      ),
                      Container(
                        height: 55.0,
                        width: 100,
                        child: RaisedButton(
                          onPressed: () {
                            Navigator.push(
                                      context,
                                      MaterialPageRoute(
                                          builder: (context) => AddLiquidity()),);
                                      
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
                                  ],
                                ),
                                borderRadius: BorderRadius.circular(10.0)),
                            child: Container(
                              alignment: Alignment.center,
                              child: Text(
                                "Add Liguidity",
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
                      ),
                    ],
                  ),
                  SizedBox(height: 10),
                  Container(
                    width: 580,
                    height: 400,
                    decoration: BoxDecoration(
                      color: Colors.grey,
                      borderRadius: BorderRadius.circular(20),  
                    ),
                    // this should change dinamicaly if there is positions
                    child: Center(child: Text("No open Positions yet", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),),),
                  )
                ],
              ),
          ),
        ),
      ),
    );
  }
}
import 'dart:convert';
import 'dart:typed_data';
import 'package:vitedefi/screens/utils/ABIs.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';

import '../utils/AMM.dart';


class LiquidityButton extends StatefulWidget {

  String amount1;
  String amount2;
  String tokenSymbol;

  LiquidityButton({Key? key, required this.amount1, required this.amount2, required this.tokenSymbol}) : super(key: key);

  @override
  _LiquidityButtonState createState() => _LiquidityButtonState();
}

class _LiquidityButtonState extends State<LiquidityButton> {
  ABIs abi = ABIs();

  Map tokenToIndex = {"GOD":1};

  

  @override
  void initState(){
    super.initState();
    // initContracts();
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Container(
      height: 55.0,
      width: size.width * 0.341,
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
                ],
              ),
              borderRadius: BorderRadius.circular(10.0)),
          child: Container(
            constraints:
                BoxConstraints(maxWidth: size.width * 0.4, minHeight: 20.0),
            alignment: Alignment.center,
            child: Text(
              "ADD LIQUIDITY",
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
    );
  }

  
}
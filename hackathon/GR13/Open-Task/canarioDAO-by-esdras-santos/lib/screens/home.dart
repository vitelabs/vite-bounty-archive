import 'dart:convert';

import "package:flutter/material.dart";
import 'package:flutter/services.dart';


import 'swap_components/form/swap_form.dart';
import 'dart:typed_data';



class Home extends StatefulWidget {
  const Home({Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  Widget form = SwapForm();
  String mode = "swap";
  bool connected = false;

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    SystemChrome.setSystemUIOverlayStyle(
      SystemUiOverlayStyle(
        statusBarColor: Colors.transparent,
        statusBarBrightness: Brightness.dark,
        systemNavigationBarColor: Colors.white,
        systemNavigationBarIconBrightness: Brightness.dark,
      ),
    );
    return Material(
      child: SwapForm());
  }

  

  
}


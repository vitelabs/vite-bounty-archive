import 'package:flutter/material.dart';
import '../pool_components/pool_screen.dart';
import '../swap_components/form/swap_form.dart';
import '../vote_components/vote_screen.dart';


class DefaultAppbar extends StatefulWidget {
  const DefaultAppbar({ Key? key }) : super(key: key);

  @override
  State<DefaultAppbar> createState() => _DefaultAppbarState();
}

class _DefaultAppbarState extends State<DefaultAppbar> {
  bool connected = false;
  String uiaddr = '0x0000000000000000000000000000000000000000';
  


  @override
  void initState(){
    super.initState();
    
  }

  

  @override
  Widget build(BuildContext context) {
    return AppBar(
      backgroundColor: Colors.white,
      automaticallyImplyLeading: false,
      title: shader(
        "Canario DAO",
        TextStyle(fontWeight: FontWeight.bold),
      ),
      flexibleSpace: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
              colors: [
                Colors.greenAccent,
                Colors.black45,
                Colors.black45,
                Colors.black54,
                Colors.black54,
                Colors.black87,
                Colors.black
              ],
              begin: Alignment.topRight,
              end: Alignment.bottomLeft,
              // stops: [0.0, 1.0],
              tileMode: TileMode.clamp),
        ),
      ),
      actions: <Widget>[
        NavigatorButton("Swap", SwapForm()),
        SizedBox(width: 5,),
        NavigatorButton("Pool", Pool()),
        SizedBox(width: 5,),
        NavigatorButton("Vote", VoteScreen()),
        SizedBox(width: 100,),
        connectButton(),
        SizedBox(width: 20,),
      ],
    );
  }

  Widget NavigatorButton(String label, Widget screen) {
    Size size = MediaQuery.of(context).size;
    return Container(
      height: 40.0,
      width: size.width * 0.1,
      margin: EdgeInsets.symmetric(vertical: 5),
      child: RaisedButton(
        onPressed: () {
          setState((){
            Navigator.push(
              context,
              MaterialPageRoute(
                  builder: (context) => screen),);
          });
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
                BoxConstraints(maxWidth: size.width * 0.4, minHeight: 20.0),
            alignment: Alignment.center,
            child: Text(
              label,
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

  Widget connectButton() {
    Size size = MediaQuery.of(context).size;
    return Container(
      height: 40.0,
      width: size.width * 0.1,
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
                BoxConstraints(maxWidth: size.width * 0.4, minHeight: 20.0),
            alignment: Alignment.center,
            child: Text(
              "Connect",
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

  

  Widget shader(String text, TextStyle style) {
    return ShaderMask(
      blendMode: BlendMode.srcIn,
      shaderCallback: (bounds) => LinearGradient(
        begin: Alignment.topRight,
        end: Alignment.bottomLeft,
        colors: [
          Colors.green,
          Colors.yellow,
          Colors.green,
        ],
      ).createShader(Rect.fromLTWH(0, 0, bounds.width, bounds.height)),
      child: Text(text, style: style),
    );
  }
}
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../utils/ABIs.dart';
import '../utils/AMM.dart';
import '../utils/custom_rect_tween.dart';
import '../utils/default_appbar.dart';
import '../utils/hero_dialog_route.dart';
import 'liquidity_button.dart';

class AddLiquidity extends StatefulWidget {
  const AddLiquidity({ Key? key }) : super(key: key);

  @override
  State<AddLiquidity> createState() => _AddLiquidityState();
}



class _AddLiquidityState extends State<AddLiquidity> {
  
  String viteAmount = '';
  String tokenAmount = '';
  String token = "GOD";
  String exchangeaddr = '0x02895eF49A562eb6f65C7988c581f5356B284862';
  
  List<Widget> tokensList = [];
  List<String> cryptoList = ["GOD"];
  Map tokenToIndex = {"GOD":1};
 
  ABIs abi = ABIs();
  
  @override
  void initState(){
    super.initState();
    tokensList = tl();
  }

  

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
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
        body: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Center(
              child: Container(
                width: 500,
                child: Container(
                  width: 600,
                  margin: EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(20),
                    color: Colors.black45,
                    boxShadow: [
                      BoxShadow(
                        color: Colors.grey,
                        blurRadius: 5.0,
                        spreadRadius: 0.0,
                        offset: Offset(5.0, 5.0), // shadow direction: bottom right
                      )
                    ],
                  ),
                  child: Container(
                    height: 300,
                    width: 600,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceAround,
                          children: [     
                            Text("VITE", style: TextStyle(color: Colors.white,fontSize: 20, fontWeight: FontWeight.bold)),
                            
                            InkWell(
                              onTap: (){
                                Navigator.of(context).push(HeroDialogRoute(builder: (context) {
                                  return _listCoinsPopupCard(2, _heroAddLiquidity+"2");
                                }));
                              },
                              child: Hero(
                                tag: _heroAddLiquidity+"2",
                                // createRectTween: (begin, end) {
                                //   return CustomRectTween(begin: begin!, end: end!);
                                // },
                                child: Container(
                                    width: 100,
                                    child: Row(
                                      children: [
                                        Material(
                                          color: Colors.black12,
                                          child: Text(token, style: TextStyle(color: Colors.white,fontSize: 20, fontWeight: FontWeight.bold))),
                                        Icon(
                                          Icons.arrow_drop_down_sharp,
                                          color: Colors.white,
                                          size: 30,
                                        )
                                      ]
                                    )
                                  ),
                              
                              ),
                            ),
                          ],
                        ),
                        Container(
                          margin: EdgeInsets.symmetric(horizontal: 10),
                          padding: EdgeInsets.symmetric(horizontal: 20, vertical: 5),
                          height: 70,
                          width: 590,
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(10),
                            color: Colors.grey[200],
                          ),
                          child: Row(
                            children: [
                              Container(
                                padding: const EdgeInsets.only(left:8.0),
                                width: 360,
                                child: TextFormField(
                                  textAlign: TextAlign.left,
                                  style: TextStyle(fontSize: 25, fontWeight: FontWeight.bold),
                                  // keyboardType: TextInputType.number,
                                  inputFormatters: [
                                    CurrencyTextInputFormatter(maxInputValue: 99999999999999),
                                  ],
                                  cursorColor: Colors.green,
                                  decoration: InputDecoration(
                                    labelStyle: TextStyle(fontSize: 25),
                                    hintStyle: TextStyle(fontSize: 25),
                                    hintText: "0.0",
                                    border: InputBorder.none,
                                  ),
                                  onChanged: (value) async {
                                    
                                  },
                                ),
                              ),
                              Align(
                                alignment: Alignment.centerLeft, 
                                child: Text("VITE", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                              ),
                            ],
                          ),
                        ),
                        
                        Container(
                          margin: EdgeInsets.symmetric(horizontal: 10),
                          padding: EdgeInsets.symmetric(horizontal: 20, vertical: 5),
                          height: 70,
                          width: 590,
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(10),
                            color: Colors.grey[200],
                          ),
                          child: Row(
                            children: [
                              Container(
                                padding: const EdgeInsets.only(left:8.0),
                                width: 360,
                                height: 100,
                                decoration: BoxDecoration(
                                  borderRadius: BorderRadius.circular(10.0),
                                ),
                                child: Text(tokenAmount, style: TextStyle(fontSize: 25, fontWeight: FontWeight.bold, color: Colors.black)),
                                
                              ),
                              Align(
                                alignment: Alignment.centerLeft, 
                                child: Text(token, style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                              ),
                            ],
                          ),
                        ),
                        LiquidityButton(amount1: viteAmount, amount2: tokenAmount, tokenSymbol: token)
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _listCoinsPopupCard(int t, String tag){
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(10.0),
        child: Hero(
          tag: tag,
          // createRectTween: (begin, end){
          //   return CustomRectTween(begin: begin!, end: end!);
          // },
          child: Material(
            color: Colors.black,
            elevation: 2,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
            child: Container(
              height: 150,
              width: 200,
              child: SingleChildScrollView(
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text("Chose Token", style: TextStyle(color: Colors.white,fontSize: 20, fontWeight: FontWeight.bold)),
                      SizedBox(height: 10),
                      Column(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: tokensList,
                      ),
                      SizedBox(height: 10),
                    ]
                  ),
                ),
              ),
            )
          ),
        ),
      )
    );
  }

  List<Widget> tl(){
    List<Widget> tokensList = [];
    tokensList.add(
      InkWell(
        onTap: () async {
          setState((){
            token = cryptoList[0];
            exchangeaddr = exchangeaddr;
          });
          Navigator.pop(context);
        },
        child: Text(cryptoList[0], style: TextStyle(color: Colors.white,fontSize: 18, fontWeight: FontWeight.bold),)
      )
    );
    
    return tokensList;
  }

  
}

const String _heroAddLiquidity = 'add-liquidity-hero';



class CurrencyTextInputFormatter extends TextInputFormatter{
  final double maxInputValue;

  CurrencyTextInputFormatter({required this.maxInputValue});
  @override
  TextEditingValue formatEditUpdate(TextEditingValue oldValue, TextEditingValue newValue) {
    final regEx = RegExp(r'^\d*\.?\d*');
    String newString = regEx.stringMatch(newValue.text) ?? '';
    
    if(maxInputValue != null){
      if(double.tryParse(newValue.text) == null){
        return TextEditingValue(
          text: newString,
          selection: newValue.selection,
        );
      }
      if(double.tryParse(newValue.text)! > maxInputValue){
        newString = maxInputValue.toString();
      }
    }
    return TextEditingValue(
      text: newString,
      selection: newValue.selection
    );
  }

}
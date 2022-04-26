
int amm(int amount, int input_reserve, int output_reserve){
  int input_amount_with_fee = amount * 997;
  int numerator = input_amount_with_fee * output_reserve;
  int denominator = (input_reserve * 1000) + input_amount_with_fee;
  return (numerator ~/ denominator);
}

int liquidityTokenAmount(int amount, int token_reserve, int ckb_reserve){
  if(token_reserve == 0){
    return (amount + 1);
  }
  return (amount * token_reserve ~/ ckb_reserve + 1);
}
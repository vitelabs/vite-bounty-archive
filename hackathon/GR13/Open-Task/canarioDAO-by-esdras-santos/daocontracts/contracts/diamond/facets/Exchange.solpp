// SPDX-License-Identifier: MIT
pragma soliditypp ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


interface Fac{
    function getExchange(address token) external returns(address);
}

interface Dex{
    function getEthToTokenOutputPrice(uint256 tokensBought) external returns(uint256);
    function ethToTokenTransferInput(uint256 minTokens, uint256 deadline, address recipient) external payable returns(uint256);
    function ethToTokenTransferOutput(uint256 tokensBought, uint256 deadline, address recipient) external payable returns(uint256);
}

contract Exchange {
    event AddLiquidity(address indexed provider, uint256 indexed ethAmount, uint256 indexed tokenAmount);
    event RemoveLiquidity(address indexed provider, uint256 indexed ethAmount, uint256 indexed tokenAmount);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event TokenPurchase(address indexed buyer, uint256 indexed ethSold, uint256 indexed tokensBought);
    event EthPurchase(address indexed buyer, uint256 indexed tokensSold, uint256 indexed ethBought);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    string public name;
    string public symbol;
    uint256 public decimals;
    uint256 public totalSupply;
    address public token;
    address public factory;
    mapping (address=>uint256) balances;
    mapping (address=>mapping (address=>uint256)) allowances;

    //this function will be used as a constructor
    function setup(address _token) public{
        require(factory == address(0x00) && token == address(0x00) && _token != address(0x00));
        factory = msg.sender;
        token = _token;
        name = "CarameloSwap";
        symbol = "CASW";
        decimals = 18;
    }

    function destruct() public {
        require(msg.sender == factory);
        selfdestruct(payable(factory));
    }

    function addLiquidity(uint256 minLiquidity, uint256 maxTokens, uint256 deadline) public payable returns(uint256){
        require(deadline > block.timestamp && maxTokens > 0 && msg.value > 0);
        uint256 totalLiquidity = totalSupply;
        if (totalLiquidity > 0) {
            require(minLiquidity > 0);
            uint256 ethReserve = address(this).balance - msg.value;
            uint256 tokenReserve = IERC20(token).balanceOf(address(this));
            uint256 tokenAmount = msg.value * tokenReserve / ethReserve + 1;
            uint256 liquidityMinted = msg.value * totalLiquidity / ethReserve;
            require(maxTokens >= tokenAmount && liquidityMinted >= minLiquidity);
            balances[msg.sender] += liquidityMinted;
            totalSupply = totalLiquidity + liquidityMinted;
            require(IERC20(token).transferFrom(msg.sender, address(this), tokenAmount));
            emit AddLiquidity(msg.sender, msg.value, tokenAmount);
            emit Transfer(address(0),msg.sender, liquidityMinted);
            return liquidityMinted;
        } else {
            require(factory != address(0x00) && token != address(0x00) && msg.value >= 1000000000);
            require (Fac(factory).getExchange(token) == address(this));
            uint256 tokenAmount = maxTokens;
            uint256 initialLiquidity = address(this).balance;
            totalSupply = initialLiquidity;
            balances[msg.sender] = initialLiquidity;
            require(IERC20(token).transferFrom(msg.sender, address(this), tokenAmount));
            emit AddLiquidity(msg.sender, msg.value, tokenAmount);
            emit Transfer(address(0x00), msg.sender, initialLiquidity);
            return initialLiquidity;
        }
    }

    function removeLiquidity(uint256 amount, uint256 minEth, uint256 minTokens, uint256 deadline) public returns(uint256, uint256) {
        require(amount > 0 && deadline > block.timestamp && minEth > 0 && minTokens > 0);
        uint256 totalLiquidity = totalSupply;
        require(totalLiquidity > 0);
        uint256 tokenReserve = IERC20(token).balanceOf(address(this));
        uint256 ethAmount = amount * address(this).balance / totalLiquidity;
        uint256 tokenAmount = amount * tokenReserve / totalLiquidity;
        require(ethAmount >= minEth && tokenAmount >= minTokens);
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(ethAmount);
        require(IERC20(token).transfer(msg.sender, tokenAmount));
        emit RemoveLiquidity(msg.sender, ethAmount, tokenAmount);
        emit Transfer(msg.sender, address(0x00), amount);
        return (ethAmount, tokenAmount);
    }

    function getInputPrice(uint256 inputAmount, uint256 inputReserve, uint256 outputReserve) private pure returns(uint256) {
        require(inputReserve > 0 && outputReserve > 0);
        uint256 inputAmountWithFee = inputAmount * 997;
        uint256 numerator = inputAmountWithFee * outputReserve;
        uint256 denominator = (inputReserve * 1000) + inputAmountWithFee;
        return numerator / denominator;
    }

    function getOutputPrice(uint256 outputAmount, uint256 inputReserve, uint256 outputReserve) private pure returns(uint256){
        require(inputReserve > 0 && outputReserve > 0);
        uint256 numerator = inputReserve * outputAmount * 1000;
        uint256 denominator = (outputReserve - outputAmount) * 977;
        return numerator / denominator + 1;
    }

    function ethToTokenInput(uint256 ethSold, uint256 minTokens, uint256 deadline, address buyer, address recipient) private returns(uint256){
        require(deadline >= block.timestamp && ethSold > 0 && minTokens > 0);
        uint256 tokenReserve = IERC20(token).balanceOf(address(this));
        uint256 tokensBought = getInputPrice(ethSold,(address(this).balance - ethSold), tokenReserve);
        require(tokensBought >= minTokens);
        require(IERC20(token).transfer(recipient, tokensBought));
        emit TokenPurchase(buyer, ethSold, tokensBought);
        return tokensBought;
    }

    fallback() external payable{
        ethToTokenInput(msg.value, 1, block.timestamp, msg.sender, msg.sender);
    }

    function ethToTokenSwapInput(uint256 minTokens, uint256 deadline) public payable returns(uint256){
        return ethToTokenInput(msg.value, minTokens, deadline, msg.sender, msg.sender);
    }

    function ethToTokenTransferInput(uint256 minTokens, uint256 deadline, address recipient) public payable returns(uint256) {
        require(recipient != address(this) && recipient != address(0x00));
        return ethToTokenInput(msg.value, minTokens, deadline, msg.sender, recipient);
    }

    function ethToTokenOutput(uint256 tokensBought, uint256 maxEth, uint256 deadline, address buyer, address recipient) private returns(uint256){
        require(deadline >= block.timestamp && tokensBought > 0 && maxEth > 0);
        uint256 tokenReserve = IERC20(token).balanceOf(address(this));
        uint256 ethSold = getOutputPrice(tokensBought, (address(this).balance - maxEth), tokenReserve);
        uint256 ethRefund = maxEth - ethSold;
        if (ethRefund > 0){
            payable(buyer).transfer(ethRefund);
        }
        require(IERC20(token).transfer(recipient, tokensBought));
        emit TokenPurchase(buyer, ethSold, tokensBought);
        return ethSold;
    }

    function ethToTokenSwapOutput(uint256 tokensBought, uint256 deadline) public payable returns(uint256){
        return ethToTokenOutput(tokensBought, msg.value, deadline, msg.sender, msg.sender);
    }

    function ethToTokenTransferOutput(uint256 tokensBought, uint256 deadline, address recipient) public payable returns(uint256){
        require(recipient != address(this) && recipient != address(0x00));
        return ethToTokenOutput(tokensBought, msg.value, deadline, msg.sender, recipient);
    }

    function tokenToEthInput(uint256 tokensSold, uint256 minEth, uint256 deadline, address buyer, address recipient) private returns(uint256){
        require(deadline >= block.timestamp && tokensSold > 0 && minEth > 0);
        uint256 tokenReserve = IERC20(token).balanceOf(address(this));
        uint256 ethBought = getInputPrice(tokensSold, tokenReserve, address(this).balance);
        require(ethBought >= minEth);
        payable(recipient).transfer(ethBought);
        require(IERC20(token).transferFrom(buyer, address(this), tokensSold));
        emit EthPurchase(buyer, tokensSold, ethBought);
        return ethBought;
    }

    function tokenToEthSwapInput(uint256 tokensSold, uint256 minEth, uint256 deadline) public returns(uint256) {
        return tokenToEthInput(tokensSold, minEth, deadline, msg.sender, msg.sender);
    }

    function tokenToEthTransferInput(uint256 tokensSold, uint256 minEth, uint256 deadline, address recipient) public returns(uint256){
        require(recipient != address(this) && recipient != address(0x00));
        return tokenToEthInput(tokensSold, minEth, deadline, msg.sender, recipient);
    }

    function tokenToEthOutput(uint256 ethBought, uint256 maxTokens, uint256 deadline, address buyer, address recipient) private returns(uint256) {
        require(deadline >= block.timestamp && ethBought > 0);
        uint256 tokenReserve =  IERC20(token).balanceOf(address(this));
        uint256 tokensSold = getOutputPrice(ethBought,tokenReserve, address(this).balance);
        require(maxTokens >= tokensSold);
        payable(recipient).transfer(ethBought);
        require(IERC20(token).transferFrom(buyer, address(this), tokensSold));
        emit EthPurchase(buyer, tokensSold, ethBought);
        return tokensSold;
    }

    function tokenToEthSwapOutput(uint256 ethBought, uint256 maxTokens, uint256 deadline) public returns(uint256) {
        return tokenToEthOutput(ethBought, maxTokens, deadline, msg.sender, msg.sender);
    }

    function tokenToEthTransferOutput(uint256 ethBought, uint256 maxTokens, uint256 deadline, address recipient) public returns(uint256){
        require(recipient != address(this) && recipient != address(0x00));
        return tokenToEthOutput(ethBought, maxTokens, deadline, msg.sender, recipient);
    }

    function tokenToTokenInput(uint256 tokensSold, uint256 minTokensBought, uint256 minEthBought, uint256 deadline, address buyer, address recipient, address exchangeAddr) private returns(uint256){
        require(deadline >= block.timestamp && tokensSold > 0 && minTokensBought > 0 && minEthBought > 0);
        require(exchangeAddr !=  address(this) && exchangeAddr != address(0x00));
        uint256 tokenReserve = IERC20(token).balanceOf(address(this));
        uint256 ethBought = getInputPrice(tokensSold, tokenReserve, address(this).balance);
        require(ethBought >= minEthBought);
        require(IERC20(token).transferFrom(buyer, address(this), tokensSold));
        uint256 tokensBought = Dex(exchangeAddr).ethToTokenTransferInput{value: ethBought}(minTokensBought, deadline, recipient);
        emit EthPurchase(buyer, tokensSold, ethBought);
        return tokensSold;
    }

    function tokenToTokenSwapInput(uint256 tokensSold, uint256 minTokensBought, uint256 minEthBought, uint256 deadline, address tokenAddr) public returns(uint256) {
        address exchangeAddr = Fac(factory).getExchange(tokenAddr);
        return tokenToTokenInput(tokensSold, minTokensBought, minEthBought, deadline, msg.sender, msg.sender, exchangeAddr);
    }

    function tokenToTokenTransferInput(uint256 tokensSold, uint256 minTokensBought, uint256 minEthBought, uint256 deadline, address recipient, address tokenAddr) public returns(uint256){
        address exchangeAddr = Fac(factory).getExchange(tokenAddr);
        return tokenToTokenInput(tokensSold, minTokensBought, minEthBought, deadline, msg.sender, recipient, exchangeAddr);
    }

    function tokenToTokenOutput(uint256 tokensBought, uint256 maxTokensSold, uint256 maxEthSold, uint256 deadline, address buyer, address recipient, address exchangeAddr) private returns(uint256) {
        require(deadline >= block.timestamp && tokensBought > 0 && maxEthSold > 0);
        require(exchangeAddr != address(this) && exchangeAddr != address(0x00));
        uint256 ethBought = Dex(exchangeAddr).getEthToTokenOutputPrice(tokensBought);
        uint256 tokenReserve = IERC20(token).balanceOf(address(this));
        uint256 tokensSold = getOutputPrice(ethBought, tokenReserve, address(this).balance);
        require(maxTokensSold >= tokensSold && maxEthSold >= ethBought);
        require(IERC20(token).transferFrom(buyer, address(this), tokensSold));
        uint256 ethSold = Dex(exchangeAddr).ethToTokenTransferOutput{value: ethBought}(tokensBought, deadline, recipient);
        emit EthPurchase(buyer, tokensSold, ethBought);
        return tokensSold;
    }

    function tokenToTokenSwapOutput(uint256 tokensBought, uint256 maxTokensSold, uint256 maxEthSold, uint256 deadline, address tokenAddr) public returns(uint256){
        address exchangeAddr = Fac(factory).getExchange(tokenAddr);
        return tokenToTokenOutput(tokensBought, maxTokensSold, maxEthSold, deadline, msg.sender, msg.sender, exchangeAddr);
    }

    function tokenToTokenTransferOutput(uint256 tokensBought, uint256 maxTokensSold, uint256 maxEthSold, uint256 deadline, address recipient, address tokenAddr) public returns(uint256){
        address exchangeAddr = Fac(factory).getExchange(tokenAddr);
        return tokenToTokenOutput(tokensBought, maxTokensSold, maxEthSold, deadline, msg.sender, recipient, exchangeAddr);
    }

    function tokenToExchangeSwapInput(uint256 tokensSold, uint256 minTokensBought, uint256 minEthBought, uint256 deadline, address exchangeAddr) public returns(uint256){
        return tokenToTokenInput(tokensSold, minTokensBought, minEthBought, deadline, msg.sender, msg.sender, exchangeAddr);
    }

    function tokenToExchangeTransferInput(uint256 tokensSold, uint256 minTokensBought, uint256 minEthBought, uint256 deadline, address recipient, address exchangeAddr) public returns(uint256){
        require(recipient != address(this));
        return tokenToTokenInput(tokensSold, minTokensBought, minEthBought, deadline, msg.sender,recipient, exchangeAddr);
    }

    function tokenToExchangeSwapOutput(uint256 tokensBought, uint256 maxTokensSold, uint256 maxEthSold, uint256 deadline, address exchangeAddr) public returns(uint256) {
        return tokenToTokenOutput(tokensBought, maxTokensSold, maxEthSold, deadline, msg.sender, msg.sender, exchangeAddr);
    }

    function tokenToExchangeTransferOutput(uint256 tokensBought, uint256 maxTokensSold, uint256 maxEthSold, uint256 deadline, address recipient, address exchangeAddr) public returns(uint256) {
        require(recipient != address(this));
        return tokenToTokenOutput(tokensBought, maxTokensSold, maxEthSold, deadline, msg.sender, recipient, exchangeAddr);
    }

    function getEthToTokenInputPrice(uint256 ethSold) public view returns(uint256) {
        require(ethSold > 0);
        uint256 tokenReserve = IERC20(token).balanceOf(address(this));
        return getInputPrice(ethSold, address(this).balance, tokenReserve);
    }

    function getEthToTokenOutputPrice(uint256 tokensBought) public view returns(uint256){
        require(tokensBought > 0);
        uint256 tokenReserve = IERC20(token).balanceOf(address(this));
        uint256 ethSold = getOutputPrice(tokensBought, address(this).balance, tokenReserve);
        return ethSold;
    }

    function getTokenToEthInputPrice(uint256 tokensSold) public view returns(uint256){
        require(tokensSold > 0);
        uint256 tokenReserve = IERC20(token).balanceOf(address(this));
        uint256 ethBought = getInputPrice(tokensSold, tokenReserve, address(this).balance);
        return ethBought;
    }

    function getTokenToEthOutputPrice(uint256 ethBought) public view returns(uint256) {
        require(ethBought > 0);
        uint256 tokenReserve = IERC20(token).balanceOf(address(this));
        return getOutputPrice(ethBought, tokenReserve, address(this).balance);
    }

    function tokenAddress() public view returns(address) {
        return token;
    }

    function balanceOf(address owner) public view returns(uint256){
        return balances[owner];
    }

    function transfer(address to, uint256 value) public returns(bool){
        require(balances[msg.sender] >= value);
        balances[msg.sender] -= value;
        balances[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }

    function transferFrom(address from, address to, uint256 value) public returns(bool){
        require(allowances[from][to] >= value);
        balances[from] -= value;
        balances[to] += value;
        allowances[from][msg.sender] -= value;
        emit Transfer(from, to, value);
        return true;
    }

    function approve(address spender, uint256 value) public returns(bool){
        allowances[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    function allowance(address owner, address spender) public view returns(uint256){
        return allowances[owner][spender];
    }
    
}
export function createCurve(data, current_price, reserve){
    for(var i=0; i <= reserve; i++){
        if(i === 0){
            var price = current_price
        }else{
            var price = current_price * (i * 10 ** 2)
        }
        var point = {name: i, price: price}
        data.push(point)
    }
}


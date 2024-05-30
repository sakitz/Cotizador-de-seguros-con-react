
//internalizacion para que la cantidad mostrada se vean como dolares
const formaterMoney = (valor) => {
    const formater = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });
    return formater.format(valor)
}

const TotalPagar = (cantidad, plazo) => {
    //este se ira calculando dependiendo al pazo que elijamos 
    let total;

    // Mientras mayor es la cantidad, menor es el interes
    if(cantidad < 5000) {
                        //50% de interes
        total = cantidad * 1.5;
    } else if(cantidad >= 5000 && cantidad < 10000) {
        total = cantidad * 1.4;
    } else if(cantidad >= 10000 && cantidad < 15000) {
        total = cantidad * 1.3;
    } else {
        total = cantidad * 1.2;
    }

    //plazo - mas plazo, mayor intereses

    if (plazo === 6) {
        total *= 1.1;
    }else if (plazo === 12) {
        total *= 1.2;
    }else if (plazo === 24) {
        total *= 1.3;
    } else {
        total *= 1.5;
    }

    return total
}


export {
    formaterMoney,
    TotalPagar
}
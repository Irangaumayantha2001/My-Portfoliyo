function orderModel(orderID,customerName ,total,date) {
    return{
        id: orderID,
        name: customerName,
        total: total,
        date: date
    };
}


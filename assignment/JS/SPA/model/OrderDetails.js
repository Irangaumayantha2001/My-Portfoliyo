function orderDetailModel(orderID,itemID,itemName ,itemPrice,itemQuantity,itemTotal) {
    return{
        oid:orderID,
        id : itemID,
        name : itemName,
        price : itemPrice,
        quantity: itemQuantity,
        total: itemTotal
    };
}
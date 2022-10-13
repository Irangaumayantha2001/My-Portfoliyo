function loadAllCustomerIDS() {
    $("#selectCustomer").empty();
    for (let customer of customers) {
        $("#selectCustomer").append(`<option>${customer.id}</option>`);
    }
}

function loadAllItemIDS() {
    $("#selectItem").empty();
    for (let item of items) {
        $("#selectItem").append(`<option>${item.id}</option>`);
    }
}

$("#selectCustomer").click(function (){
    for (let customer of customers){
        if (customer.id == $("#selectCustomer").val()){
            $("#txtPOCustomerID").val(customer.id);
            $("#txtPOCustomerName").val(customer.name);
            $("#txtPOCustomerSalary").val(customer.salary);
            $("#txtPOCustomerAddress").val(customer.address);
        }
    }
});

$("#selectItem").click(function (){
    for (let item of items){
        if (item.id == $("#selectItem").val()){
            $("#txtPOItemID").val(item.id);
            $("#txtPOItemName").val(item.name);
            $("#txtPOItemPrice").val(item.price);
            $("#txtPOItemQtyOH").val(item.quantity);
        }
    }
});

$("#btnAddToCart").click(function (){

    let orderID = $("#txtOrderId").val();
    let itemID = $("#txtPOItemID").val();
    let itemName = $("#txtPOItemName").val();
    let itemPrice = $("#txtPOItemPrice").val();
    let itemQuantity = $("#txtPOItemOrderQuantity").val();

    let itemTotalPrice = parseInt(itemPrice)* parseInt(itemQuantity);
        if(parseInt($("#txtPOItemQtyOH").val())>=itemQuantity && (itemQuantity > 0)){

            if(searchItem(itemID)){
                for (let item of orderDetails){
                    if (item.id == itemID){
                        let itemNewQuantity = parseInt(item.quantity) + parseInt(itemQuantity);
                        let itemNewTotal = parseInt(itemPrice) * itemNewQuantity;
                        item.quantity=itemNewQuantity;
                        item.total = itemNewTotal;
                    }
                }
            }else{
                orderDetails.push(orderDetailModel(orderID,itemID,itemName,itemPrice,itemQuantity,itemTotalPrice));
            }
            updateItemArray(itemID,itemQuantity);
            clearCartItemTextFields();
            loadOrderDetailsTable();


        }else {
            Swal.fire('Cannot Add To Cart');
        }


});

    function updateItemArray(itemID,itemQuantity){
        for (item of items){
            if(item.id == itemID){
                item.quantity = item.quantity - parseInt(itemQuantity)
                loadAllItem();
                loadAllItemIDS();
            }
        }
    }

function searchItem(itemID){
        console.log(itemID);
    for (item of orderDetails){
        if (item.id == itemID){

            return true;
        }
    }
    return null;
}
function loadOrderDetailsTable(){

    $("#tableCart").empty();

    for(var orderDetail of orderDetails){
        var row = `<tr><td>${orderDetail.id}</td><td>${orderDetail.name}</td><td>${orderDetail.price}
                   </td><td>${orderDetail.quantity}</td><td>${orderDetail.total}</td></tr>`;
        $("#tableCart").append(row);
    }

}

function clearCartItemTextFields(){
    $("#txtPOItemID").val("");
    $("#txtPOItemName").val("");
    $("#txtPOItemPrice").val("");
    $("#txtPOItemQtyOH").val("");
    $("#txtPOItemOrderQuantity").val("");
}


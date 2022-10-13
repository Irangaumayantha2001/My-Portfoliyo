// loadAllItems in Table
function loadAllItem(){

    $("#tableItems").empty();

    for(var item of items){
        var row = `<tr><td>${item.id}</td><td>${item.name}</td><td>${item.price}</td><td>${item.quantity}</td></tr>`;
        $("#tableItems").append(row);
    }

}

//Save Item Event
$("#btnSaveItem").click(function (){

    let itemID = $("#txtItemID").val();
    let itemName = $("#txtItemName").val();
    let itemPrice = $("#txtItemPrice").val();
    let itemQuantity = $("#txtItemQuantity").val();

    items.push(itemModel(itemID,itemName ,itemPrice,itemQuantity));
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Customer Saved',
        showConfirmButton: false,
        timer: 1500
    })
    loadAllItem();
    clearAddTextFields();
    loadAllItemIDS();
    bindRowClickEvent();
});

function clearAddTextFields() {
    $("#txtItemID").val("");
    $("#txtItemName").val("");
    $("#txtItemPrice").val("");
    $("#txtItemQuantity").val("");
}
//Load All Item Function
$("#btnAllItems").click(function (){

    loadAllItem();
    bindRowClickEvent();

});

//Table Row Click Function
function bindRowClickEvent(){
    $("#tableItems>tr").click(function(){
        let itemID =$(this).children(":eq(0)").text();
        let itemName =$(this).children(":eq(1)").text();
        let itemPrice =$(this).children(":eq(2)").text();
        let itemQuantity =$(this).children(":eq(3)").text();

        $("#txtSearchItem").val(itemID);
        $("#txtItemUID").val(itemID);
        $("#txtItemUName").val(itemName);
        $("#txtItemUPrice").val(itemPrice);
        $("#txtItemUQuantity").val(itemQuantity);

    });
}

//Search
function searchItem(ItemID){
    for(let item of items){
        if (item.id == ItemID){
            return item;
        }
    }
    return null;

}

$("#txtSearchItem").on('keyup',function (event){
    if(event.code == "Enter"){
        let item=searchItem($("#txtSearchItem").val())
        if (item!==null){
            $("#txtSearchItem").val(item.id);
            setUpdateTextFieldValues(item.id, item.name,item.price,item.quantity)

            $("#tableItems").empty();
            var row = `<tr><td>${item.id}</td><td>${item.name}</td><td>${item.price}</td><td>${item.quantity}</td></tr>`;
            $("#tableItems").append(row);
        }else {
            Swal.fire('item not found')
            $("#txtSearchItem").val("");
        }
    }
});

function setUpdateTextFieldValues(id, name, price, quantity) {
    $("#txtItemUID").val(id);
    $("#txtItemUName").val(name);
    $("#txtItemUPrice").val(price);
    $("#txtItemUQuantity").val(quantity);
}


//Delete
function deleteItem(itemId) {
    let item = searchItem(itemId);
    if (item != null) {
        let indexNumber = items.indexOf(item);
        items.splice(indexNumber, 1);
        loadAllItem();
        return true;
    } else {
        return false;
    }
}

$("#btnDeleteItem").click(function (){
    let deleteID = $("#txtSearchItem").val();

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteItem(deleteID)
            $("#txtSearchItem").val("");
            Swal.fire(
                'Deleted!',
                'Item is deleted.',
                'success'
            )

        }
    })

});

//Update

function updateItem(itemID) {
    let item = searchItem(itemID);
    if (item != null) {
        item.id = $("#txtItemUID").val();
        item.name = $("#txtItemUName").val();
        item.price = $("#txtItemUPrice").val();
        item.quantity = $("#txtItemUQuantity").val();
        loadAllItem();
        return true;
    } else {
        return false;
    }

}

$("#btnUpdateItem").click(function () {
    let itemID = $("#txtItemUID").val();
    let response = updateItem(itemID);
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Item Updated',
        showConfirmButton: false,
        timer: 1500
    })
    setUpdateTextFieldValues()("", "", "", "");
});

$('#btnClearItem').click(function (){
    $("#txtSearchItem").val("");
});



// ---------------Validation Start-----------
//validation started
// customer regular expressions

const itemNameRegEx = /^[A-z ]{2,20}$/;
const qtyRegEx = /^[0-9]{1,}$/;
const priceRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;


$('#txtItemID,#txtItemName,#txtItemQuantity,#txtItemPrice').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault(); // stop execution of the button
    }
});

$('#txtItemID,#txtItemName,#txtItemQuantity,#txtItemPrice').on('blur', function () {
    formValidItem();
});

//focusing events
$("#txtItemID").on('keyup', function (eventOb) {
    setButtonItem();
});

$("#txtItemName").on('keyup', function (eventOb) {
    setButtonItem();
    if (eventOb.key == "Enter") {
        checkIfItemValid();
    }
});

$("#txtItemQuantity").on('keyup', function (eventOb) {
    setButtonItem();
    if (eventOb.key == "Enter") {
        checkIfItemValid();
    }
});

$("#txtItemPrice").on('keyup', function (eventOb) {
    setButtonItem();
    if (eventOb.key == "Enter") {
        checkIfItemValid();
    }
});
// focusing events end
$("#btn-item-save").attr('disabled', true);

function clearAllItemFeild() {
    $('#txtItemCode,#txtItemName,#txtItemQuantity,#txtItemPrice').val("");
    $('#txtItemCode,#txtItemName,#txtItemPrice,#txtItemPrice').css('border', '2px solid #ced4da');
    $('#txtItemName').focus();
    $("#btn-item-save").attr('disabled', true);
    loadAllItems();
   
}

function formValidItem() {
    var Name = $("#txtItemName").val();
    if (itemNameRegEx.test(Name)) {
        $("#txtItemName").css('border', '2px solid green');
        $("#ItemNameError").text("");
        var Qty = $("#txtItemQuantity").val();
        if (qtyRegEx.test(Qty)) {
            var price = $("#txtItemPrice").val();
            var priceReg = priceRegEx.test(price);
            $("#txtQty").css('border', '2px solid green');
            $("#ItemQTYError").text("");
            if (priceReg ) {
                $("#txtItemPrice").css('border', '2px solid green');
                $("#ItemPriceError").text("");
                return true;
            } else {
                $("#txtItemPrice").css('border', '2px solid red');
                $("#ItemPriceError").text("Item Price is a required field : Pattern 100.00 or 100");
                return false;
            }
        } else {
            $("#txtItemPrice").css('border', '2px solid red');
            $("#ItemQTYError").text("Item Qty is a required field : Only Number");
            return false;
        }
    } else {
        $("#txtItemName").css('border', '2px solid red');
        $("#ItemNameError").text("Item Name is a required field : Mimimum 2, Max 20, Spaces Allowed");
        return false;
    }

}

function checkIfItemValid() {
    $("#txtItemName").focus();
    var Name = $("#txtItemName").val();
    if (itemNameRegEx.test(Name)) {
        $("#txtQtxtItemPricety").focus();
        var qty = $("#txtxtItemPricetQty").val();
        if (qtyRegEx.test(qty)) {
            $("#txtItemPrice").focus();
            var price = $("#txtPrice").val();
            var r = priceRegEx.test(price);
            if (r) {
                let res = confirm("Do you really need to add this Item..?");
                if (res) {
                    saveItem();
                    clearAllItemFeild();
                }
            } else {
                $("#txtxtItemPricetPrice").focus();
            }
        } else {
            $("#txtItemPrice").focus();
        }
    } else {
        $("#txtItemName").focus();
    }

}

function setButtonItem() {
    let b = formValidItem();
    if (b) {
        $("#btn-item-save").attr('disabled', false);
    } else {
        $("#btn-item-save").attr('disabled', true);
    }
}

$('#btn-item-save').click(function () {
    checkIfItemValid();
});
//validation ended

function forDashboard(){
    loadAll();
}
function loadAll() {
    console.log(customerDb.length)
    $("#lblAllCustomers").text(customerDb.length);
    $("#lblAllItems").text(itemDb.length);
    $("#lblAllOrder").text(orderDb.length)
}
function loadAllCustomer(){

    $("#customerTable").empty();

    for(var customer of customers){
        var row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.salary}</td></tr>`;
        $("#customerTable").append(row);
    }

}

$("#btnSaveCustomer").click(function (){

    let customerID = $("#txtCustomerID").val();
    let customerName = $("#txtCustomerName").val();
    let customerAddress = $("#txtCustomerAddress").val();
    let customerSalary = $("#txtCustomerSalary").val();

    customers.push(customerModel(customerID,customerName ,customerAddress,customerSalary));
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Customer Saved',
        showConfirmButton: false,
        timer: 1500
    })
    clearCustomerAddTextFields();
    bindRowClickEvent();
    loadAllCustomer();
    loadAllCustomerIDS();

});

function clearCustomerAddTextFields() {
    $("#txtCustomerID").val("");
    $("#txtCustomerName").val("");
    $("#txtCustomerAddress").val("");
    $("#txtCustomerSalary").val("");
}

$("#btnAllCustomers").click(function (){

    loadAllCustomer();
    bindRowClickEvent();

});

function bindRowClickEvent(){
    alert("saved");

}

function searchCustomer(CustomerID){
    for(let customer of customers){
        if (customer.id == CustomerID){
            return customer;
        }
    }
    return null;

}


$("#txtCustomerSearch").on('keyup',function (event){
    if(event.code == "Enter"){
        let customer=searchCustomer($("#txtCustomerSearch").val())
        if (customer!==null){
            $("#txtCustomerSearch").val(customer.id);
            setUpdateTextFieldValues(customer.id, customer.name, customer.address, customer.salary);

            $("#customerTable").empty();
            var row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.salary}</td></tr>`;
            $("#customerTable").append(row);
        }else {
            Swal.fire('customer not found');
            $("#txtCustomerSearch").val("");
        }
    }
});
function setUpdateTextFieldValues(id, name, address, salary) {
    $("#txtCustomerID").val(id);
    $("#txtCustomerName").val(name);
    $("#txtCustomerAddress").val(address);
    $("#txtCustomerSalary").val(salary);
}

function deleteCustomer(customerID) {
    let customer = searchCustomer(customerID);
    if (customer != null) {
        let indexNumber = customers.indexOf(customer);
        customers.splice(indexNumber, 1);
        loadAllCustomer();
        return true;
    } else {
        return false;
    }
}


$("#btnDeleteCustomer").click(function (){
    let deleteID = $("#txtCustomerSearch").val();

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
            deleteCustomer(deleteID)
            $("#txtSearchCustomer").val("");
            Swal.fire(
                'Deleted!',
                'Customer is deleted.',
                'success'
            )

        }
    })

});

function updateCustomer(customerID) {
    let customer = searchCustomer(customerID);
    if (customer != null) {
        customer.id = $("#txtCustomerUID").val();
        customer.name = $("#txtCustomerUName").val();
        customer.address = $("#txtCustomerUAddress").val();
        customer.salary = $("#txtCustomerUSalary").val();
        loadAllCustomer();
        return true;
    } else {
        return false;
    }

}

$("#btnUpdateCustomer").click(function () {
    let customerID = $("#txtCustomerUID").val();
    let response = updateCustomer(customerID);
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Customer Updated',
        showConfirmButton: false,
        timer: 1500
    })
    setUpdateTextFieldValues("", "", "", "");
});

$('#btnClearCustomer').click(function (){
    $("#txtSearchCustomer").val("");
});



// ---------------Validation Start-----------
//validation started
// customer regular expressions
const cusIDRegEx = /^(C00-)[0-9]{1,3}$/;
const cusNameRegEx = /^[A-z ]{2,20}$/;
const cusAddressRegEx = /^[0-9/A-z. ,]{7,}$/;
const cusSalaryRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;


$('#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalary').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault(); // stop execution of the button
    }
});

$('#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalary').on('blur', function () {
    formValid();
});

//focusing events
$("#txtCustomerID").on('keyup', function (eventOb) {
    setButton();

    // if (eventOb.key == "Enter") {
    //     checkIfValid();
    // }

    // if (eventOb.key == "Control") {
    //     var typedCustomerID = $("#txtCusID").val();
    //     var srcCustomer = searchCustomerFromID(typedCustomerID);
    //     $("#txtCusID").val(srcCustomer.getCustomerID());
    //     $("#txtCusName").val(srcCustomer.getCustomerName());
    //     $("#txtCusAddress").val(srcCustomer.getCustomerAddress());
    //     $("#txtCusSalary").val(srcCustomer.getCustomerSalary());
    // }


});

$("#txtCustomerName").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfCustValid();
    }
});

$("#txtCustomerAddress").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfCustValid();
    }
});

$("#txtCustomerSalary").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfCustValid();
    }
});
// focusing events end
$("#btn-save-customer").attr('disabled', true);

function clearAll() {
    $('#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalary').val("");
    $('#txtCustomerID,#v,#txtCustomerAddress,#txtCustomerSalary').css('border', '2px solid #ced4da');
    $('#txtCustomerName').focus();
    $("#btn-save-customer").attr('disabled', true);
    loadAllCustomers();
   
}

function formValid() {
    var cusName = $("#txtCustomerName").val();
        if (cusNameRegEx.test(cusName)) {
            $("#txtCustomerName").css('border', '2px solid green');
            $("#lblcusname").text("");
            var cusAddress = $("#txtCustomerAddress").val();
            if (cusAddressRegEx.test(cusAddress)) {
                var cusSalary = $("#txtCustomerSalary").val();
                var resp = cusSalaryRegEx.test(cusSalary);
                $("#txtCustomerAddress").css('border', '2px solid green');
                $("#lblcusaddress").text("");
                if (resp) {
                    $("#txtCustomerSalary").css('border', '2px solid green');
                    $("#lblcussalary").text("");
                    return true;
                } else {
                    $("#txtCustomerSalary").css('border', '2px solid red');
                    $("#lblcussalary").text("Cus Salary is a required field : Pattern 100.00 or 100");
                    return false;
                }
            } else {
                $("#txtCustomerAddress").css('border', '2px solid red');
                $("#lblcusaddress").text("Customer Address is a required field : Mimum 5");
                return false;
            }
        } else {
            $("#txtCustomerName").css('border', '2px solid red');
            $("#lblcusname").text("Cus Name is a required field : Mimimum 5, Max 20, Spaces Allowed");
            return false;
        }

}

function checkIfCustValid() {
    $("#txtCustomerName").focus();
        var cusName = $("#txtCustomerName").val();
        if (cusNameRegEx.test(cusName)) {
            $("#txtCustomerAddress").focus();
            var cusAddress = $("#txtCustomerAddress").val();
            if (cusAddressRegEx.test(cusAddress)) {
                $("#txtCustomerSalary").focus();
                var cusSalary = $("#txtCustomerSalary").val();
                var resp = cusSalaryRegEx.test(cusSalary);
                if (resp) {
                    let res = confirm("Do you really need to add this Customer..?");
                    if (res) {
                        saveCustomer();
                        clearAll();
                    }
                } else {
                    $("#txtCustomerSalary").focus();
                }
            } else {
                $("#txtCustomerAddress").focus();
            }
        } else {
            $("#txtCustomerName").focus();
        }

}

function setButton() {
    let b = formValid();
    if (b) {
        $("#btn-save-customer").attr('disabled', false);
    } else {
        $("#btn-save-customer").attr('disabled', true);
    }
}

$('#btn-save-customer').click(function () {
    checkIfCustValid();
});
//validation ended





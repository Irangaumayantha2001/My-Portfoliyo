

document.getElementById("btn-placeOrder").addEventListener("click", function () {
    document.getElementsByClassName("placeOrder-area")[0].style.display = "block"
    document.getElementsByClassName("customer-area")[0].style.display = "none"
    document.getElementsByClassName("item-area")[0].style.display = "none"
    document.getElementsByClassName("order-area")[0].style.display = "none"
    document.getElementsByClassName("Dashboard-area")[0].style.display = "none"
})

document.getElementById("btn-customer").addEventListener("click", function () {
    document.getElementsByClassName("customer-area")[0].style.display = "block"
    document.getElementsByClassName("placeOrder-area")[0].style.display = "none"
    document.getElementsByClassName("item-area")[0].style.display = "none"
    document.getElementsByClassName("order-area")[0].style.display = "none"
    document.getElementsByClassName("Dashboard-area")[0].style.display = "none"
})

document.getElementById("btn-Item").addEventListener("click", function () {
    document.getElementsByClassName("item-area")[0].style.display = "block"
    document.getElementsByClassName("placeOrder-area")[0].style.display = "none"
    document.getElementsByClassName("customer-area")[0].style.display = "none"
    document.getElementsByClassName("order-area")[0].style.display = "none"
    document.getElementsByClassName("Dashboard-area")[0].style.display = "none"
})

document.getElementById("btn-Order").addEventListener("click", function () {
    document.getElementsByClassName("item-area")[0].style.display = "none"
    document.getElementsByClassName("placeOrder-area")[0].style.display = "none"
    document.getElementsByClassName("customer-area")[0].style.display = "none"
    document.getElementsByClassName("order-area")[0].style.display = "block"
    document.getElementsByClassName("Dashboard-area")[0].style.display = "none"
})

document.getElementById("btn-home").addEventListener("click", function () {
    document.getElementsByClassName("item-area")[0].style.display = "none"
    document.getElementsByClassName("placeOrder-area")[0].style.display = "none"
    document.getElementsByClassName("customer-area")[0].style.display = "none"
    document.getElementsByClassName("order-area")[0].style.display = "none"
    document.getElementsByClassName("Dashboard-area")[0].style.display = "block"
})

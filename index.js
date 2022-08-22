let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

cartIcon.onclick = ()=>{
    cart.classList.add("active")
}

closeCart.onclick = ()=>{
    cart.classList.remove("active")
}

if(document.readyState == 'loading'){
    document.addEventListener("DOMContentLoaded", ready)
}else{
    ready();
}

function ready(){
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    for(var i = 0; i< removeCartButtons.length; i++){
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for(var i = 0; i< quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    // Add to Cart
    var addCart = document.getElementsByClassName('add-cart');
    for(var i = 0; i< addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click", addCartClicked)
    }

    document.getElementsByClassName('btn-buy')[0]
    .addEventListener("click", buyButtonClicked)

}

function buyButtonClicked(){
    alert('order is placed');
    var cartContent = document.getElementsByClassName('cart-content')[0]
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}

function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updatetotal();
}


function addCartClicked(event){
    var button = event.target;
    var shopProducts =  button.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
}

function addProductToCart(title, price, productImg){
    var createShopBox = document.createElement("div");
    createShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for(var i = 0; i< cartItemsNames.length; i++){
        if(cartItemsNames[i].innerText == title){
        alert("Product already add in Cart");
        return;
    }
}

    var cartBoxContent = `
    <img src=${productImg} alt="" class="cart-img">
    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity">
    </div>
    
    <i class='bx bxs-trash-alt cart-remove'></i>`; 

    createShopBox.innerHTML = cartBoxContent;
    cartItems.append(createShopBox);
    createShopBox
    .getElementsByClassName('cart-remove')[0]
    .addEventListener("click", removeCartItem);
    createShopBox.
    getElementsByClassName('cart-quantity')[0]
    .addEventListener("change", quantityChanged)
}



    
function updatetotal(){
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box') ;
    var total =0;
    for(var i =0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        console.log(quantityElement,'quantityElement');
        var price = parseFloat(priceElement.innerText.replace("$",""));
        var quantity =quantityElement.value;
        console.log(quantity,'quantity');
        
            total = total + price * quantity;
            
            if( cartBox.getElementsByClassName('cart-price')[0].innerHTML == "$32.95" && quantity > 1)
            {
                total = total-16.475;
            }
    }
    // let tex ;
    if(!quantity){
        total = 0
    }else if(total < 50 ){
        // tex = 4.95;
        total = total + 4.95
    }else if(total >= 50 && total < 90){
        // tex = 2.95;
        total = total + 2.95
    }else{
        // tex = 0;
        total = total + 0
    }
        total = Math.round(total * 100)/100;

        document.getElementsByClassName('total-price')[0].innerText = "$" + total;
    
}
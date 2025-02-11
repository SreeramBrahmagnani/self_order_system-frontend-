const form = document.querySelector("form");
const nameInput = document.querySelector(".name");
const phoneInput = document.querySelector(".phone");
const confirmPhoneInput = document.querySelector(".cPhone");

let listCart = [];
function checkCart(){
        var cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('listCart='));
        if(cookieValue){
            listCart = JSON.parse(cookieValue.split('=')[1]);
        }
}
function validateName() {
    const nameField = document.querySelector(".name-field");
    if (nameInput.value.length < 3) {
      nameField.classList.add("invalid");
      nameField.classList.remove("valid");
    } else {
      nameField.classList.remove("invalid");
      nameField.classList.add("valid");
    }
  }
  function validatePhone(input) {
    const phoneField = document.querySelector(".phone-field");
    
    // Remove non-numeric characters
    input.value = input.value.replace(/\D/g, "");
    
    // Limit input to 10 digits
    if (input.value.length > 10) {
      input.value = input.value.slice(0, 10);
    }
  
    // Check if the input is exactly 10 digits
    if (input.value.length === 10) {
      phoneField.classList.remove("invalid");
      phoneField.classList.add("valid");
    } else {
      phoneField.classList.add("invalid");
      phoneField.classList.remove("valid");
    }
  }

  function validateConfirmPhone(input) {
    const confirmPhoneField = document.querySelector(".confirm-phone");
    const phoneInput = document.querySelector(".phone").value;
  
    // Remove non-numeric characters
    input.value = input.value.replace(/\D/g, "");
  
    // Limit input to 10 digits
    if (input.value.length > 10) {
      input.value = input.value.slice(0, 10);
    }
  
    // Check if confirm phone matches original phone
    if (input.value === phoneInput && input.value.length === 10) {
      confirmPhoneField.classList.remove("invalid");
      confirmPhoneField.classList.add("valid");
    } else {
      confirmPhoneField.classList.add("invalid");
      confirmPhoneField.classList.remove("valid");
    }
  }
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent default form submission
  
    // Validate all fields before submission
    validateName(nameInput);
    validatePhone(phoneInput);
    validateConfirmPhone(confirmPhoneInput);
  
    const nameField = document.querySelector(".name-field");
    const phoneField = document.querySelector(".phone-field");
    const confirmPhoneField = document.querySelector(".confirm-phone");
  
    // ✅ Redirect only if all fields are valid
    if (
      nameField.classList.contains("valid") &&
      phoneField.classList.contains("valid") &&
      confirmPhoneField.classList.contains("valid")
    ) {
      //window.location.href = form.getAttribute("action"); 
      alert( "Order Placed Successfully✅" );
    }
  });
checkCart();
addCartToHTML();
function addCartToHTML(){
    // clear data default
    let listCartHTML = document.querySelector('.returnCart .list');
    listCartHTML.innerHTML = '';

    let totalQuantityHTML = document.querySelector('.totalQuantity');
    let totalPriceHTML = document.querySelector('.totalPrice');
    let totalQuantity = 0;
    let totalPrice = 0;
    let tablenumber = document.querySelector('.tableNumber');
    
    // if has product in Cart
    if(listCart){
        listCart.forEach(product => {
            if(product){
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML = 
                    `<img src="${product.image}">
                    <div class="info">
                        <div class="name">${product.name}</div>
                        <div class="price">₹${product.price}/1 product</div>
                    </div>
                    <div class="quantity">${product.quantity}</div>
                    <div class="returnPrice">₹${product.price * product.quantity}</div>`;
                listCartHTML.appendChild(newCart);
                totalQuantity = totalQuantity + product.quantity;
                totalPrice = totalPrice + (product.price * product.quantity);
            }
        })
    }
    totalQuantityHTML.innerText = totalQuantity;
    totalPriceHTML.innerText = '₹' + totalPrice;
}
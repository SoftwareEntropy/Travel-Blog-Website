window.addEventListener("load", function(){
	var orderData = location.search.slice(1);
	orderData = orderData.replace(/\+/g," ");
	orderData = decodeURIComponent(orderData);
	var orderFields = orderData.split(/[&=]/g);
	if (orderFields[5] != 0) {
		document.forms.order.elements.item1Name.value = orderFields[3];
		document.forms.order.elements.item1Qty.value = orderFields[5];
	} else {
		document.getElementById("item1row").innerHTML = "";
	}
	if (orderFields[13] != 0) {
		document.forms.order.elements.item2Name.value = orderFields[11];
		document.forms.order.elements.item2Qty.value = orderFields[13];
	} else {
		document.getElementById("item2row").innerHTML = "";
	}
	if (orderFields[21] != 0) {
		document.forms.order.elements.item3Name.value = orderFields[19];
		document.forms.order.elements.item3Qty.value = orderFields[21];
	} else {
		document.getElementById("item3row").innerHTML = "";
	}
	document.forms.order.elements.orderCost.value = formatNumber((orderFields[7]*1 + orderFields[15]*1 + orderFields[23]*1), 2);
	document.forms.order.elements.shippingType.value = orderFields[25];
	document.forms.order.elements.shippingCost.value = formatNumber(orderFields[29]);
	document.forms.order.elements.subTotal.value = formatNumber(orderFields[31]);
	document.forms.order.elements.salesTax.value = formatNumber(orderFields[33]);
	document.forms.order.elements.cartTotal.value = orderFields[35];
});

window.addEventListener("load", function(){
	document.getElementById("subButton").onclick = runSubmit;
	document.getElementById("cardHolder").oninput = validateName;
	document.getElementById("cardNumber").oninput = validateNumber;
	document.getElementById("expDate").oninput = validateDate;
	document.getElementById("cvc").oninput = validateCVC;
});

function runSubmit(){
	validateName();
	validateCredit();
	validateNumber();
	validateDate();
	validateCVC();
}

function validateDate(){
	var cardDate = document.getElementById("expDate");
	if(cardDate.validity.valueMissing){
		cardDate.setCustomValidity("Enter the expiration date.");
	} else if (/^(0[1-9]|1[0-2])\/20[12]\d$/.test(cardDate.value) === false){
		cardDate.setCustomValidity("Enter a valid expiration date.");
	} else {
		cardDate.setCustomValidity("");
	}
}

function validateName() {
	var cardName = document.getElementById("cardHolder");
	if (cardName.validity.valueMissing) {
		cardName.setCustomValidity("Enter the card holder");
	} else {
		cardName.setCustomValidity("");
	}
}


function validateCredit() {
	var creditCard = document.forms.credit.elements.company[0];
	if (creditCard.validity.valueMissing) {
		creditCard.setCustomValidity("Select your credit card");
	} else {
		creditCard.setCustomValidity("");
   }
}

function validateNumber() {
	var cardNumber = document.getElementById("cardNumber");
	if (cardNumber.validity.valueMissing) {
		cardNumber.setCustomValidity("Enter your card number");
	} else if (cardNumber.validity.patternMismatch) {
		cardNumber.setCustomValidity("Enter a valid card number");
	} else if (luhn(cardNumber.value) === false) {
		cardNumber.setCustomValidity("Enter a legitimate card number");
	} else {
		cardNumber.setCustomValidity("");
	}
}

function validateCVC() {
	var cardCVC = document.getElementById("cvc");
	var creditCard = document.querySelector('input[name="company"]:checked').value;
	if (cardCVC.validity.valueMissing) {
		cardCVC.setCustomValidity("Enter your code CVC number");
	} else if ((creditCard === "amex") && (/^\d{4}$/.test(cardCVC.value) === false)) {
		cardCVC.setCustomValidity("Enter a 4-digit CVC number");
	} else if ((creditCard !== "amex") && (/^\d{3}$/.test(cardCVC.value) === false)) {
		cardCVC.setCustomValidity("Enter a 3-digit CVC number");
	} else {
		cardCVC.setCustomValidity("");
	}
}

function sumDigits(numStr) {
	var digitTotal = 0;
	for (var i = 0; i < numStr.length; i++) {
		digitTotal += parseInt(numStr.charAt(i));
	}
	return digitTotal;
}

function luhn(idNum) {
	var string1 = "";
	var string2 = "";
	for (var i = idNum.length - 1; i >= 0; i-= 2) {
		string1 += idNum.charAt(i);
	}
	for (var i = idNum.length - 2; i >= 0; i-= 2) {
		string2 += 2*idNum.charAt(i);
	}
	return sumDigits(string1 + string2) % 10 === 0;
}

function formatNumber(val, decimals) {
   return val.toLocaleString(undefined, {minimumFractionDigits: decimals, 
                                         maximumFractionDigits: decimals});
}
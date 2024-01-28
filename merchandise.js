window.addEventListener("load", function(){
	calcCart();
	document.forms.cart.elements.item1Qty.onchange = calcCart;
	document.forms.cart.elements.item2Qty.onchange = calcCart;
	document.forms.cart.elements.item3Qty.onchange = calcCart;
	var loginData = location.search.slice(1);
	loginData = decodeURIComponent(loginData);
	var user = loginData.split(/[&=]/g);
	if (user[0] === "username") {
		document.getElementById("loginBar").innerHTML = "Welcome, " + user[1];
		document.getElementById("loginBar").style.cssFloat = "right";
		document.getElementById("loginBar").style.marginRight = "150px";
		document.getElementById("loginBar").style.marginTop = "15px";
	}
	var shipping = document.querySelectorAll("input[name='shipping']");
	for (var i=0; i <= shipping.length; i++){
		shipping[i].onclick = calcCart;
	}
});

function calcCart(){
	var cost1 = document.forms.cart.elements.capCost.value;
	var qty1Index = document.forms.cart.elements.item1Qty.selectedIndex;
	var qty1 = document.forms.cart.elements.item1Qty[qty1Index].value;
	
	var cost2 = document.forms.cart.elements.mugCost.value;
	var qty2Index = document.forms.cart.elements.item2Qty.selectedIndex;
	var qty2 = document.forms.cart.elements.item2Qty[qty2Index].value;
	
	var cost3 = document.forms.cart.elements.keychainCost.value;
	var qty3Index = document.forms.cart.elements.item3Qty.selectedIndex;
	var qty3 = document.forms.cart.elements.item3Qty[qty3Index].value;
	
	var orderCost = (cost1 * qty1) + (cost2 * qty2) + (cost3 * qty3);
	var totalqty = qty1*1 + qty2*1 + qty3*1;
	
	document.forms.cart.elements.item1CostTotal.value = formatNumber((cost1 * qty1), 2);
	document.forms.cart.elements.item2CostTotal.value = formatNumber((cost2 * qty2), 2);
	document.forms.cart.elements.item3CostTotal.value = formatNumber((cost3 * qty3), 2);
	
	var shipCost = document.querySelector("input[name='shipping']:checked").value * 1;
	if (totalqty > 20) {
		shipCost = shipCost * 3;
		document.getElementById("buttonAdd").disabled = false;
	} else if (totalqty > 10) {
		shipCost = shipCost * 2
		document.getElementById("buttonAdd").disabled = false;
	} else if (totalqty === 0) {
		shipCost = shipCost * 0;
		document.getElementById("buttonAdd").disabled = true;
	} else {
		document.getElementById("buttonAdd").disabled = false;
	};
	
	document.forms.cart.elements.shippingCost.value = formatNumber(shipCost, 2);
	document.forms.cart.elements.subTotal.value = formatNumber(shipCost + orderCost, 2);
	var salesTax = 0.08 * (orderCost + shipCost);
	document.forms.cart.elements.salesTax.value = formatNumber(salesTax, 2);
	document.forms.cart.elements.cartTotal.value = formatUSCurrency(orderCost + shipCost + salesTax);

	if (document.getElementById("overnight").checked) {
		document.forms.cart.elements.shippingType.value = "Overnight Shipping ($29.99 per 10 items)";
	} else if (document.getElementById("day_2").checked) {
		document.forms.cart.elements.shippingType.value = "2-Day Shipping ($19.99 per 10 items)";
	} else {
		document.forms.cart.elements.shippingType.value = "Ground Shipping ($9.99 per 10 items)";
	}
	
}

function formatNumber(val, decimals) {
   return val.toLocaleString(undefined, {minimumFractionDigits: decimals, 
                                         maximumFractionDigits: decimals});
}

function formatUSCurrency(val) {
   return val.toLocaleString('en-US', {style: "currency", currency: "USD"} );
}

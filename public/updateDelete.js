//________________________________Manufacturer Functions__________________________________________________________________________
//*********************************************************************************************************************************

function deleteManufacturer(id){
	var req = new XMLHttpRequest();

	var URL = "/manufacturer-delete"
	+ "?id=" + id;

	req.open("GET", URL, true);

	req.addEventListener('load', function(){
		if (req.status >= 200 && req.status < 400) {
			console.log("Successfull delete.");
		}else{
			console.log("Error in netweork req: " + req.statusTest);
		}
	});

	req.send(null);
	location.reload(true);
}

function updateManufacturer(id){

	var req = new XMLHttpRequest();

	var URL = "/manufacturer-update"
	+ "?id=" + id
	+ "&name=" + document.getElementById("man"+id+"_name").value
	+ "&discount=" + document.getElementById("man"+id+"_discount").value
	+ "&preferred=" + document.getElementById("man"+id+"_preferred").value
	+ "&phone=" + document.getElementById("man"+id+"_phone").value
	+ "&zip=" + document.getElementById("man"+id+"_zip").value;

	//console.log(URL);

	req.open("GET", URL, true);

	req.addEventListener('load', function(){
		if (req.status >= 200 && req.status < 400) {
			console.log("Successfull update.");
		}else{
			console.log("Error in network request: " + req.statusTest);
		}
		location.reload(true);
	});

	req.send(null);
}

//________________________________Order Functions__________________________________________________________________________
//*********************************************************************************************************************************

function deleteOrder(oid){
	var req = new XMLHttpRequest();

	var URL = "/order-delete"
	+ "?oid=" + oid

	req.open("GET", URL, true);

	req.addEventListener('load', function(){
		if (req.status >= 200 && req.status < 400) {
			console.log("Successfull order delete");
		}else{
			console.log("Error in netweork req: " + req.statusTest);
		}
	});

	req.send(null);
	location.reload(true);
}

function updateOrder(id){

	var req = new XMLHttpRequest();


	var payload = "id=" + id
				+"&pDate="	+ document.getElementById("order"+id+"_pDate").value
				+"&oStatus="		+ document.getElementById("order"+id+"_oStatus").value;

	req.open("POST", '/order-update', true);
	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded")

	req.addEventListener('load', function(){
		if (req.status >= 200 && req.status < 400) {
			console.log("Successfull update.");
		}else{
			console.log("Error in network request: " + req.statusTest);
		}
		location.reload(true);
	});

	req.send(payload);
}

//________________________________Component Functions__________________________________________________________________________
//*********************************************************************************************************************************

function updateComponent(id){

	var req = new XMLHttpRequest();


	var payload = "id=" + id
				+"&mid="		+ document.getElementById("comp"+id+"_Manufacturer_id").value
				+"&partNumber="	+ document.getElementById("comp"+id+"_partNumber").value
				+"&type="		+ document.getElementById("comp"+id+"_type").value
				+"&stock="		+ document.getElementById("comp"+id+"_stock").value
				+"&cost="		+ document.getElementById("comp"+id+"_cost").value
				+"&leadTime="	+ document.getElementById("comp"+id+"_leadTime").value;

	req.open("POST", '/component-update', true);
	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded")

	req.addEventListener('load', function(){
		if (req.status >= 200 && req.status < 400) {
			console.log("Successfull update.");
		}else{
			console.log("Error in network request: " + req.statusTest);
		}
		location.reload(true);
	});

	req.send(payload);
}
//________________________________Product Functions__________________________________________________________________________
//*********************************************************************************************************************************

function updateProduct(id){

	var req = new XMLHttpRequest();


	var payload = "id=" + id
				+"&name="			+ document.getElementById("prod"+id+"_name").value
				+"&description="	+ document.getElementById("prod"+id+"_description").value
				+"&cost="		+ document.getElementById("prod"+id+"_cost").value
				+"&price="		+ document.getElementById("prod"+id+"_price").value;

	req.open("POST", '/product-update', true);
	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded")

	req.addEventListener('load', function(){
		if (req.status >= 200 && req.status < 400) {
			console.log("Successfull update.");
		}else{
			console.log("Error in network request: " + req.statusTest);
		}
		location.reload(true);
	});

	req.send(payload);
}
//________________________________Product_Component Functions__________________________________________________________________________
//*********************************************************************************************************************************

function deleteCP(cid, pid){
	var req = new XMLHttpRequest();

	var URL = "/component_product-delete"
	+ "?cid=" + cid
	+ "&pid=" + pid;

	req.open("GET", URL, true);

	req.addEventListener('load', function(){
		if (req.status >= 200 && req.status < 400) {
			console.log("Successfull order delete");
		}else{
			console.log("Error in netweork req: " + req.statusTest);
		}
	});

	req.send(null);
	location.reload(true);
}

function updateCP(cid, pid){

	var req = new XMLHttpRequest();

	var payload = "cid=" + cid
				+ "&pid=" + pid
				+ "&qty=" + document.getElementById("c"+cid+"p"+pid+"_cQty").value;

	console.log(payload);

	req.open("POST", '/component_product-update', true);
	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded")

	req.addEventListener('load', function(){
		if (req.status >= 200 && req.status < 400) {
			console.log("Successfull update.");
		}else{
			console.log("Error in network request: " + req.statusTest);
		}
		location.reload(true);
	});

	req.send(payload);

}
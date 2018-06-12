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

	req.open("POST", URL, true);

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


function deleteOrder(oid, pid){
	var req = new XMLHttpRequest();

	var URL = "/order-delete"
	+ "?oid=" + oid
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

//________________________________Component Functions__________________________________________________________________________
//*********************************************************************************************************************************


//________________________________Product Functions__________________________________________________________________________
//*********************************************************************************************************************************

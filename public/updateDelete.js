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
			console.log("Error in netweork request: " + request.statusTest);
		}
	});

	req.send(null);
	location.reload(true);
}

function updateManufacturer(id){

	//Data validation and formatting.
	//needs updated and extended and could do expression formatting
	if(document.getElementById("man"+id+"_name").value.length < 255){
		var name = document.getElementById("man"+id+"_name").value;
	}else{
		var name = false;
	}

	if(document.getElementById("man"+id+"_discount").value <= 1 && document.getElementById("man"+id+"_discount").value>=0 ){
		var discount = document.getElementById("man"+id+"_discount").value;
	}else{
		var discount = false;
	}

	if(document.getElementById("man"+id+"_preferred").value == 'yes' || document.getElementById("man"+id+"_preferred").value == 'Yes'){
		var preferred = 1;
	}else if(document.getElementById("man"+id+"_preferred").value == 'No' | document.getElementById("man"+id+"_preferred").value == 'no'){
		var preferred = 0;
	}else{
		var preferred = false;
	}

	if(document.getElementById("man"+id+"_phone").value.length < 255){
		var phone = document.getElementById("man"+id+"_phone").value;
	}else{
		var phone = false;
	}

	if(document.getElementById("man"+id+"_zip").value <= 99999 && document.getElementById("man"+id+"_zip").value >= 10000){
		var zip = document.getElementById("man"+id+"_zip").value;
	}else{
		var zip = false;
	}

	var req = new XMLHttpRequest();

	var URL = "/manufacturer-update"
	+ "?id=" + id
	+ "&name=" + name
	+ "&discount=" + discount
	+ "&preferred=" + preferred
	+ "&phone=" + phone
	+ "&zip=" + zip;

	req.open("GET", URL, true);

	req.addEventListener('load', function(){
		if (req.status >= 200 && req.status < 400) {
			console.log("Successfull update.");
		}else{
			console.log("Error in network request: " + request.statusTest);
		}
		location.reload(true);
	});

	req.send(null);
}

//________________________________Componenet Functions__________________________________________________________________________
//*********************************************************************************************************************************

function deleteComponent(id){
	req = new XMLHttpRequest();

	var URL = "/component-delete"
	+ "?id=" + id;

	req.open("GET", URL, true);

	req.addEventListener('load', function(){
		if(req.status >= 200 || req.status < 400){
			console.log("Successfull deleteComponent.");
		}else{
			console.log("Error in network request: " + request.statusTest);
		}
		location.reload(true);
	});

	req.send(null);
}
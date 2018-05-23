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
	var req = new XMLHttpRequest();

	var URL = "/manufacturer-update"
	+ "?id=" + id
	+ "&name=" + document.getElementById("man"+id+"_name").value
	+ "&discount=" + document.getElementById("man"+id+"_discount").value
	+ "&preferred=" + document.getElementById("man"+id+"_preferred").value
	+ "&phone=" + document.getElementById("man"+id+"_phone").value
	+ "&zip=" + document.getElementById("man"+id+"_zip").value;

	req.open("GET", URL, true);

	req.addEventListener('load', function(){
		if (req.status >= 200 && req.status < 400) {
			console.log("Successfull update.");
		}else{
			console.log("Error in netweork request: " + request.statusTest);
		}
	});

	req.send(null);
	location.reload(true);
}
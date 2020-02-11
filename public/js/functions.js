function submit_form() {

	var first = document.getElementById('first_name').value;
	var last = document.getElementById('last_name').value;
	var rollno = document.getElementById('roll_no').value;
	var dept = document.getElementById('department').value;
	var ph = document.getElementById('ph_no').value;
	
	$.post("/signup",
	{
		first_name: first,
		last_name: last,
		roll_no: rollno,
		department: dept,
		ph_no: ph,

	},
	function(data)
	{
		alert(data);
		// console.log(data);
	})
}

function data_display() {

	var display_data = '';

    $.post("/viewer", {
		
	},
    function(data) {
		for (i = 0; i < data.length; i++) {
			display_data = display_data + '<tbody><tr><td>' + data[i].firstname + '</td><td>' + data[i].lastname + '</td><td>' + data[i].roll + '</td><td>' + data[i].dept + '</td><td>' + data[i].phone + '</td><td><button onclick= "updating(\''+ data[i]._id +'\');" '+ i +'" class= "btn btn-info">Edit</button>' + '</td><td><button  onclick= "deleting(\''+ data[i]._id +'\');" '+ i +'" class= "btn btn-danger">Delete</button>' + '</td></tr></tbody>';
		}
		

		document.getElementById("align").innerHTML = display_data;
       
 	})
}

function updating(nana) {

	var thing = nana;

	sessionStorage.setItem("_id",thing);

	window.location = "/update.html";

}

function deleting(deep) {

	var thing2 = deep;

	$.post("/removing", {
		
		deep : thing2,

	},
    function(data) {
		window.location="details.html";
       
 	})
}

function update_form() {

	var id =sessionStorage.getItem("_id");
	var first = document.getElementById('first_name').value;
	var last = document.getElementById('last_name').value;
	var rollno = document.getElementById('roll_no').value;
	var dept = document.getElementById('department').value;
	var ph = document.getElementById('ph_no').value;
	
	$.post("/updatee",
	{
		id :id,
		first_name: first,
		last_name: last,
		roll_no: rollno,
		department: dept,
		ph_no: ph,

	},
	function(data)
	{
		alert(data);
		// console.log(data);
	})
}
function fetch_data() {
	var id =sessionStorage.getItem("_id");
	$.post("/fetch_data_update",
	{
		id : id

	},
	function(data)
	{
		document.getElementById('first_name').value = data[0].firstname;
		document.getElementById('last_name').value = data[0].lastname;
		document.getElementById('roll_no').value = data[0].roll;
		document.getElementById('department').value = data[0].dept;
		document.getElementById('ph_no').value = data[0].phone;
		// console.log(data);
	})
}


function view_data1(){
	window.location="details.html";
}
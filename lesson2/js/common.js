document.getElementById('send').onclick = function(){
	sendForm();
}
function sendForm() {
var xhr = new XMLHttpRequest();
	xhr.open('POST', 'php/validator.php', true);
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200){
			var result = xhr.responseText;
			result = JSON.parse(result);
			console.log(result);
		}
	}
	var	username    = 'username=' + document.getElementById('username').value;
	var	password    = 'password=' + document.getElementById('password').value;
	var	email       = 'email=' + document.getElementById('email').value;
	var	gender      = 'gender=' + document.getElementById('gender').value;
	var	credit_card = 'credit_card=' + document.getElementById('credit_card').value;
	var bio     	= 'bio=' + document.getElementById('bio').value;
	var birth		= 'birth=' + document.getElementById('birth').value;
var poster = username + '&' + password + '&' + email +'&' + gender + '&' + credit_card + '&' + bio + '&' + birth;
console.log(poster);
poster = JSON.stringify(poster);
xhr.send(poster);
console.log(poster);
}
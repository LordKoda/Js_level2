

//Вешаем события на кнопки
document.getElementById('send').addEventListener("click", sendForm) //функция отправки данных
document.getElementById('valid_num').addEventListener("click", autoPaste) //автозаполнение полей для проверки работы функции
document.getElementById('close_window').addEventListener("click", closeWindow) //закрытие модального окна с оповещением об отправке

//ФУНКЦИЯ ОТПРАВКИ ДАННЫХ
function sendForm() {
	document.querySelector('#send').className = "loading"; // вешаем анимацию загрузки на кнопку
	//убираем классы оповещения об ошибке
	deleteClass('invalid'); 
	deleteClass('active');
	//делаем запрос
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'php/validator.php', true);
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200){
			var result = xhr.responseText;
			result = JSON.parse(result);
			//вызываем проверку ответа от сервера
			setTimeout(serverErrorToValid, 2000, result);//задержка для красоты
		}
	}
	//собираем данные с полей формы
	var	username    = 'username=' + document.getElementById('username').value;
	var	password    = 'password=' + document.getElementById('password').value;
	var	email       = 'email=' + document.getElementById('email').value;
	var	gender      = 'gender=' + document.getElementById('gender').value;
	var	credit_card = 'credit_card=' + document.getElementById('credit_card').value;
	var bio     	= 'bio=' + document.getElementById('bio').value;
	var birth		= 'birth=' + document.getElementById('birth').value;

	var poster = username + '&' + password + '&' + email +'&' + gender + '&' + credit_card + '&' + bio + '&' + birth;
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send(poster);

}

//функция проверки ответ от сервера
function serverErrorToValid(array) {
	document.querySelector('#send').className = "";//останавливаем анимацию загрузки
	var serverAnswer = array;
	if(serverAnswer['result']===false){ //если ответ отрицательный перебираем неверные поля
		var serverError = serverAnswer['error']; //берем объект с невернозаполнеными полями

		for (key in serverError) {//и перебираем его

			//проверка если в сообщении есть подстрока 'required'
			if(serverError[key].indexOf('required')+1){
				//выводим сообщение что поле обязательно к заполнению
				var newKey= key.toLowerCase().replace(/ /g,"_");//берем имя поля, приводим к нижнему регистру и меняем пробелы на '_'
				document.getElementById(newKey).className += " invalid";
				document.querySelector('#' + newKey + '+ .error>.required').className += " active";
				
				//а если в сообщении другая ошибка
			}else{
				//выводим сообщение о неверном формате
				var newKey= key.toLowerCase().replace(/ /g,"_");
				document.getElementById(newKey).className += " invalid";
				document.querySelector('#' + newKey + '+ .error>.type_error').className += " active";
			}
		}
		//если же сервер ответил что все хорошо
	}else{
		//выводим сообщение об успешной отправке
		document.querySelector('.successWindow.hiddenWindow').className = "successWindow";
	}
}

//функция удаления сообщений об ошибке
function deleteClass(nameClass) {
	var classArray = document.querySelectorAll('.'+ nameClass);
	if(classArray.length>=1){
		for(key in classArray){
			if(classArray[key] == classArray.length){
				break;
			}else{
				classArray[key].classList.remove(nameClass);
			}
		}
	}
}

//функция автозаполнения полей
function autoPaste(){
	username.value='Somebody'
	password.value='mypassword'
	email.value='some@some.ru'
	credit_card.value = 4561261212345467;
	bio.value= 'This is good! I think I will switch to another language'
	birth.value	= '2017-05-10';
};

//функция закрывает окно с оповещением
function closeWindow() {
	document.querySelector('.successWindow').className += " hiddenWindow";
}

//функция убирает анимацию с кнопки
function removeLoad() {
	document.querySelector('#send').className = "";
}


(function($) {
	//стилизация полей
	$('.form-area').blur(function () {
		$('.form-area').each(function () {
			if ( this.value != '' ) {
				$(this).addClass('focused');
			} else {
				$(this).removeClass('focused');
			}
		});
	});
	//заносим в объект паттерны для проверки валидации и примеры заполнения 
	var validPattern = {
		username: /[\w]{6,}/,
		usernameValid: 'Myname - не меньше 6 символов',
		email: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
		emailValid: 'В формате my@email.com',
		birth: /[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])/,
		birthValid: 'Дата в формате YYYY-mm-dd',
		gender: /[mw]/i,
		genderValid: 'Одна буква M или F',
		passport: /[0-9]{4}\s[0-9]{6}/,
		passportValid: 'В формате 0000_000000',
		credit_card: /([0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4})|([0-9]{16})/,
		credit_cardValid: 'В формате 0000_0000_0000_0000',
		password: /^[\w]{3,}$/,
		passwordValid: 'Не менее 3 символов'
	}
	//объекты UI
	$( "#progressbar" ).progressbar({
		value: false
	});
	$("#birth").datepicker({
		monthNames:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь"
		,"Ноябрь","Декабрь"],
		dayNamesMin:["Вс","Пн","Вт","Ср","Чт","Пт","Сб"],
		firstDay:1,
		dateFormat:"yy-mm-dd"
	});
	$("#dialogWin").dialog({modal:true,
		width:400,
		height:200,
		autoOpen:false});

	//проверка валидации "на лету"
	$("#my_form").on('keyup', '.form-group', function(event){ //событие срабатывает при вводе символов в поле
		//заносим данные в переменные что бы было проще писать
		var inValue= $(this).find('input, textarea').val(); 
		var validValue = $(this).find('input, textarea').attr('name');
		var pasVal = $('#password').val().length;
		//проверка валидации после ввода символа
		if(inValue.search(validPattern[validValue])){ //сраниваем введенные данные с паттернами
			$(this).find('input, textarea').removeClass('valid').addClass('invalid'); //если не верный формат выводим значек ошибки
		}else{
			$(this).find('input, textarea').removeClass('invalid').addClass('valid');//и что все хорошо если верный
		}

		//отдельная проверка для поля в паролем
		if(validValue == 'password'){  
			//в зависимости от длины и сложности пароля, выводим сообщение и перекрашиваем progresbar
			if(inValue.search(/^[\w]{3,6}$/)==0){
				console.log('vaeryshort')
				$('#progressbar').find('.progress-label').text('ненадежный');
				$('#progressbar').find('.ui-progressbar-value').css({'background-color':'#f33'});
			}else if(inValue.search(/^[\w]{6,9}$/)==0|inValue.search(/^[\w\W]{3,6}$/)==0){
				console.log('short');
				$('#progressbar').find('.progress-label').text('обычный');
				$('#progressbar').find('.ui-progressbar-value').css({'background-color':'#ffc733'});
			}else if(inValue.search(/^[\w\W]{6,}$/)==0){
				$('#progressbar').find('.progress-label').text('надежный');
				$('#progressbar').find('.ui-progressbar-value').css({'background-color':'#3f3'});
			}else{
				$('#progressbar').find('.progress-label').text('короткий');
				$('#progressbar').find('.ui-progressbar-value').css({'background-color':'#f33'});
			}
		}
		//изменяем длину progresbar-а по количеству введеных символов в поле "password"
		$('#progressbar').progressbar('value' , pasVal*10);
	});
	//перехватываем стандартное событие отправки
	$("#my_form").submit(function(){
		var error = false; //по умолчанию ошибок нет
		//еще раз проверяем поля
		$(this).find('div input, div textarea').each( function(){
			if ($(this).val()==''){ //если поле пустое
				$(this).effect('highlight',{color:'#faa'});//подсвечиваем его с помощью эфекта
				$(this).parent().append('<div class="modalError">Это поле обязательно к заполнению</div>'); //и создаем сообщение об ошибке
				return error = true; // oшибкa
			}else if ($(this).val().search(validPattern[$(this).attr('name')])){//если неверный формат
				$(this).effect('highlight',{color:'#faa'});//так же светим
				//и выводим сообщение с примером заполнения
				$(this).parent().append('<div class="modalError">Неверный формат<br>'+validPattern[$(this).attr('name')+'Valid']+'</div>');
				return error = true; // oшибкa
			}
		});
		if (!error) { // eсли oшибки нeт выводим сообщение
			$('#dialogWin').dialog('open');
		}

		return false;
	});
})(jQuery);


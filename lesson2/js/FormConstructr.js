function FormConstructr(tag, name, type){
	this.formField = document.createElement(tag);
	this.formField.setAttribute('id', name);
	this.formField.setAttribute('name', name);
	if (type != undefined){
		this.formField.setAttribute('type', type);
	}
	this.formField.setAttribute('placeholder', name.toUpperCase());
	if (tag === 'textarea'){
		this.formField.setAttribute('cols', 30);
		this.formField.setAttribute('rows', 10);
	}
	if (tag === 'select'){
		var optionM = document.createElement('option');
		optionM.setAttribute('value', 'm');
		optionM.innerHTML = 'Male';
		this.formField.appendChild(optionM);
		var optionF = document.createElement('option');
		optionF.setAttribute('value', 'f');
		optionF.innerHTML = 'Female';
		this.formField.appendChild(optionM);
	}
	return this.formField;
}


var formName = new FormConstructr('input','username','text');
var formPassword = new FormConstructr('input','password','password');
var formEmail = new FormConstructr('input','email','text');
var formGender = new FormConstructr('select','gender');
var formCreditCard = new FormConstructr('input','credit_card','number');
var formBirth = new FormConstructr('input','birth','date');
var formBio = new FormConstructr('textarea','bio');

var fieldArray= [
formName,
formPassword,
formEmail,
formGender,
formCreditCard,
formBirth,
formBio,
];
var fieldName =[
	'username',
	'password',
	'email',
	'gender',
	'credit_card' ,
	'birth',
	'bio'
];
var formConteiner = document.createElement('div');
     formConteiner.className = 'contact_form';
for(var i=0;i<fieldName.length;i++){
	var labelLi = document.createElement('li');
	var labelName = document.createElement('label');
 	    labelName.setAttribute('for', fieldName[i]);
 	    labelName.innerHTML = fieldName[i];
 	    labelLi.appendChild(labelName);
 	formConteiner.appendChild(labelLi);
 	var fieldLi= document.createElement('li');
 	var test = fieldArray[i];
 	fieldLi.appendChild(test);

 	var errorMessage = document.createElement('div');
        errorMessage.className = 'error';
    var requiredMessage = document.createElement('div');
        requiredMessage.className = 'required';
        requiredMessage.innerHTML = 'Field is required';
    var typeMessage = document.createElement('div');
        typeMessage.className = 'type_error';
        typeMessage.innerHTML = 'Invalid format';
    errorMessage.appendChild(requiredMessage);
    errorMessage.appendChild(typeMessage);
    fieldLi.appendChild(errorMessage);
 	formConteiner.appendChild(fieldLi);
 }
var submitButton = document.createElement('button');
        submitButton.setAttribute('id', 'send');
        submitButton.innerHTML = 'Submit';
    formConteiner.appendChild(submitButton);
var pasteButton = document.createElement('button');
        pasteButton.setAttribute('id', 'valid_num');
        pasteButton.innerHTML = 'Auto paste';
    formConteiner.appendChild(pasteButton);


var successWindow = document.createElement('div'); 
    successWindow.className = 'successWindow hiddenWindow';

    var successMessage = document.createElement('div'); 
    successMessage.className = 'successMessage';
    successMessage.innerHTML = 'Your message has been successfully sent';
    successWindow.appendChild(successMessage);

var closeButton = document.createElement('button');
    closeButton.setAttribute('id', 'close_window');
    closeButton.innerHTML = 'OK';
    successWindow.appendChild(closeButton);

formConteiner.appendChild(successWindow);
document.body.insertBefore(formConteiner, null);

var decimalBtn = document.getElementById('calc-decimal');
var ceBtn = document.getElementById('calc-ce');
var cBtn = document.getElementById('calc-c');
var backspaceBtn = document.getElementById('calc-backspace');
var displayValElement = document.getElementById('calc-display-val');

var displayVal = '0';
var evalStringArray = [];
var wholeOperation ='';
var numberOfDigits = 0;

var calcNumBtns = document.getElementsByClassName('calc-btn-num');
var calcOperatorBtns = document.getElementsByClassName('calc-btn-operator');

function assignZero() {
	evalStringArray.push('0');
	wholeOperation = '0';
	displayVal = '0';
}

var updateDisplayVal = (clickObj) => {
	var btnText = clickObj.target.innerText;
	if(numberOfDigits != 0) {
		var tmp = evalStringArray.pop();
		tmp += btnText + '';
		evalStringArray.push(tmp);
		numberOfDigits++;
	} else {
		evalStringArray.push(btnText);
		numberOfDigits++;
	}
    wholeOperation += btnText;
	if(displayVal === '0') {
		displayVal = '';
    }
    displayVal += btnText;
	displayValElement.innerText = wholeOperation; 
}

var performOperation = (clickObj) => {
	var operator = clickObj.target.innerText;
	switch(operator){
		case '+':
			if(evalStringArray.length === 0) {
				assignZero();	
			}
			displayVal = '0';
            wholeOperation += '+';
            displayValElement.innerText = wholeOperation;
			evalStringArray.push('+');
			numberOfDigits = 0;
			break;
		case'-':
			if(evalStringArray.length === 0) {
				assignZero();	
			}
			displayVal = '0';
			wholeOperation += '-';
			displayValElement.innerText = wholeOperation;
			evalStringArray.push('-');
			numberOfDigits = 0;
			break;
		case'x':
			if(evalStringArray.length === 0) {
				assignZero();	
			}
			displayVal = '0';
			wholeOperation += '*';
			displayValElement.innerText = wholeOperation;
			evalStringArray.push('*');
			numberOfDigits = 0;
			break;
		case'/':
			if(evalStringArray.length === 0) {
				assignZero();	
			}
			displayVal = '0';
			wholeOperation += '/';
			displayValElement.innerText = wholeOperation;
			evalStringArray.push('/');
			numberOfDigits = 0;
			break;
		case'=':
            var evaluation = eval(evalStringArray.join(' '));
            displayVal = evaluation + '';
            wholeOperation = evaluation + '';
			displayValElement.innerText = wholeOperation;
			evalStringArray = [];
			evalStringArray.push(evaluation);
			break;
	}
}

for(var i = 0; i < calcNumBtns.length; i++) {
	calcNumBtns[i].addEventListener('click', updateDisplayVal, false);
}

for(var i = 0; i < calcOperatorBtns.length; i++) {
	calcOperatorBtns[i].addEventListener('click', performOperation, false);
}

cBtn.onclick = () => {
    displayVal = '0';
	pendingVal = undefined;
	evalStringArray = [];
    displayValElement.innerHTML = displayVal;
	wholeOperation = '';
	numberOfDigits = 0;
}
ceBtn.onclick = () => {
    evalStringArray.pop();
	wholeOperation = evalStringArray.join('');
	if(wholeOperation == '') {
		displayVal = 0;
		numberOfDigits = 0;
		displayValElement.innerText = displayVal;
	} else {
		displayVal = 0;
		displayValElement.innerText = wholeOperation;
	}	 
}

backspaceBtn.onclick = () => {
	displayVal = displayVal.slice(0, displayVal.length - 1);
	wholeOperation = wholeOperation.slice(0, wholeOperation.length - 1);
	var tmp = evalStringArray.pop();
	if(tmp.length === 1) {
		evalStringArray.push(0);
		numberOfDigits--;
	} else {
		tmp = tmp.slice(0, tmp.length - 1);
		evalStringArray.push(tmp);
		numberOfDigits--;
	}
	if(evalStringArray.length == 1 && (evalStringArray[0] === '' || evalStringArray[0] == 0)) {
		evalStringArray = [];
		numberOfDigits = 0;
	}
	if(wholeOperation === '') { wholeOperation = '0'; }
	if(displayVal === '') { displayVal = '0'; }
	displayValElement.innerText = wholeOperation;
	if(evalStringArray.length === 0) {
		wholeOperation = '';
	}
}

decimalBtn.onclick = () => {
	if(!displayVal.includes('.')) {
        displayVal += '.';
		if(numberOfDigits != 0) {
			wholeOperation += '.';
			var tmp = evalStringArray.pop();
			tmp += '.';
			evalStringArray.push(tmp);
			numberOfDigits++;
		} else {
			wholeOperation += '0.';
			evalStringArray.push(displayVal);
			numberOfDigits++;
		}
    }
	displayValElement.innerHTML = wholeOperation;
}
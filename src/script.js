import { calc } from './calc.js';

var updateDisplayVal = (clickObj) => {
	var btnText = clickObj.target.innerText;
	if(calc.numberOfDigits !== 0) {
		var tmp = calc.evalStringArray.pop();
		tmp += btnText + '';
		calc.evalStringArray.push(tmp);
		calc.numberOfDigits++;
	} else {
		calc.evalStringArray.push(btnText);
		calc.numberOfDigits++;
	}
    calc.wholeOperation += btnText;
	if(calc.displayVal === '0') {
		calc.displayVal = '0';
    }
    calc.displayVal += btnText;
	calc.displayValElement.innerText = calc.wholeOperation; 
};

var performOperation = (clickObj) => {
	var operator = clickObj.target.innerText;
	switch(operator){
		case '+':
			if(calc.evalStringArray.length === 0) {
				calc.assignZero();	
			}
			calc.displayVal = '0';
            calc.wholeOperation += '+';
            calc.displayValElement.innerText = calc.wholeOperation;
			calc.evalStringArray.push('+');
			calc.numberOfDigits = 0;
			break;
		case'-':
			if(calc.evalStringArray.length === 0) {
				calc.assignZero();	
			}
			calc.displayVal = '0';
			calc.wholeOperation += '-';
			calc.displayValElement.innerText = calc.wholeOperation;
			calc.evalStringArray.push('-');
			calc.numberOfDigits = 0;
			break;
		case'x':
			if(calc.evalStringArray.length === 0) {
				calc.assignZero();	
			}
			calc.displayVal = '0';
			calc.wholeOperation += '*';
			calc.displayValElement.innerText = calc.wholeOperation;
			calc.evalStringArray.push('*');
			calc.numberOfDigits = 0;
			break;
		case'/':
			if(calc.evalStringArray.length === 0) {
				calc.assignZero();	
			}
			calc.displayVal = '0';
			calc.wholeOperation += '/';
			calc.displayValElement.innerText = calc.wholeOperation;
			calc.evalStringArray.push('/');
			calc.numberOfDigits = 0;
			break;
		case'=':
			if (calc.evalStringArray.length >= 3) {
				var evaluation = calculate();
				calc.displayVal = evaluation  + '';
            	calc.wholeOperation = evaluation  + '';
			}
			calc.displayValElement.innerText = calc.wholeOperation;
			break;
	}
}; 

function calculate() {
	if (calc.evalStringArray.length === 1) {
		return;
	}
	switch(calc.evalStringArray[1]) {
		case'+':
			var evaluation = Number(calc.evalStringArray[0]) + Number(calc.evalStringArray[2]);
			actionWithEvalStringArray(evaluation);
			return calc.evalStringArray[0];
			break;
		case'-':
			var evaluation = Number(calc.evalStringArray[0]) - Number(calc.evalStringArray[2]);
			for(var i = 0; i < 3; i++) { calc.evalStringArray.shift(); }
			calc.evalStringArray.unshift(evaluation);
			calculate();
			return calc.evalStringArray[0];
			break;
		case'*':
			var evaluation = Number(calc.evalStringArray[0]) * Number(calc.evalStringArray[2]);
			for(var i = 0; i < 3; i++) { calc.evalStringArray.shift(); }
			calc.evalStringArray.unshift(evaluation);
			calculate();
			return calc.evalStringArray[0];
			break;
		case'/':
			var evaluation = Number(calc.evalStringArray[0]) / Number(calc.evalStringArray[2]);
			for(var i = 0; i < 3; i++) { calc.evalStringArray.shift(); }
			calc.evalStringArray.unshift(evaluation);
			calculate();
			return calc.evalStringArray[0];
			break;
	}
} 

function actionWithEvalStringArray(value) {
	for(var i = 0; i < 3; i++) { calc.evalStringArray.shift(); }
	calc.evalStringArray.unshift(value);
	calculate();	
}

for(var i = 0; i < calc.calcNumBtns.length; i++) {
	calc.calcNumBtns[i].addEventListener('click', updateDisplayVal, false);
}

for(var i = 0; i < calc.calcOperatorBtns.length; i++) {
	calc.calcOperatorBtns[i].addEventListener('click', performOperation, false);
}

calc.cBtn.onclick = () => {
    calc.displayVal = '0';
	calc.evalStringArray = [];
    calc.displayValElement.innerHTML = calc.displayVal;
	calc.wholeOperation = '';
	calc.numberOfDigits = 0;
};

calc.ceBtn.onclick = () => {
    calc.evalStringArray.pop();
	calc.wholeOperation = calc.evalStringArray.join('');
	if(calc.wholeOperation === '') {
		calc.displayVal = 0;
		calc.numberOfDigits = 0;
		calc.displayValElement.innerText = calc.displayVal;
	} else {
		calc.displayVal = 0;
		calc.displayValElement.innerText = calc.wholeOperation;
	}	 
};

calc.backspaceBtn.onclick = () => {
	calc.displayVal = calc.displayVal.slice(0, calc.displayVal.length - 1);
	calc.wholeOperation = calc.wholeOperation.slice(0, calc.wholeOperation.length - 1);
	var tmp = calc.evalStringArray.pop();
	if(tmp.length === 1) {
		calc.evalStringArray.push(0);
		calc.numberOfDigits--;
	} else {
		tmp = tmp.slice(0, tmp.length - 1);
		calc.evalStringArray.push(tmp);
		calc.numberOfDigits--;
	}
	if(calc.evalStringArray.length === 1 && (calc.evalStringArray[0] === '' || calc.evalStringArray[0] === 0)) {
		calc.evalStringArray = [];
		calc.numberOfDigits = 0;
	}
	if(calc.wholeOperation === '') { calc.wholeOperation = '0'; }
	if(calc.displayVal === '') { calc.displayVal = '0'; }
	calc.displayValElement.innerText = calc.wholeOperation;
	if(calc.evalStringArray.length === 0) {
		calc.wholeOperation = '';
	}
};

calc.decimalBtn.onclick = () => {
	if(!calc.displayVal.includes('.')) {
        calc.displayVal += '.';
		if(calc.numberOfDigits !== 0) {
			calc.wholeOperation += '.';
			var tmp = calc.evalStringArray.pop();
			tmp += '.';
			calc.evalStringArray.push(tmp);
			calc.numberOfDigits++;
		} else {
			calc.wholeOperation += '0.';
			calc.evalStringArray.push(calc.displayVal);
			calc.numberOfDigits++;
		}
    }
	calc.displayValElement.innerHTML = calc.wholeOperation;
}; 

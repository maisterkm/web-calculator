export let calc = {
    decimalBtn : document.getElementById('calc-decimal'),
    ceBtn : document.getElementById('calc-ce'),
    cBtn : document.getElementById('calc-c'),
    backspaceBtn : document.getElementById('calc-backspace'),
    displayValElement : document.getElementById('calc-display-val'),
    calcNumBtns : document.getElementsByClassName('calc-btn-num'),
    calcOperatorBtns : document.getElementsByClassName('calc-btn-operator'),
    
    displayVal : '0',
    evalStringArray : [],
    wholeOperation : '',
    numberOfDigits : 0,
}
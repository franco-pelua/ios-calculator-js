let first_number = 0;
let second_number = 0;
let result = 0;
let current_operator;
let evaluation = [];
const screen = document.querySelector(".screen");
const keyboard = document.querySelector(".keyboard");

/*
    TODO: Render and clear function pending of refactor
    TODO: Handle styling when there appear bigger numbers
    TODO: Check if it's possible to delete global variables and use scoped variables instead. 
*/

keyboard.addEventListener('click', function(e) {
    e.stopImmediatePropagation()
    onButtonPress(e);
});

function onButtonPress (e) {
    switch(e.target.getAttribute('data-button-type')) {
        case "digit":
            AssignNumber(e)
            break;
        case "operator":
            AssignOperation(e)
            break;
        case "clear":
            Clear();
            break;
        case "equals":
            Operate();
            break;
    }

    Render();
}

function AssignNumber(e) {
    
    console.log(evaluation.length)
    if(evaluation.length <= 1) {
        first_number = first_number == 0 
            ? parseInt(e.target.getAttribute("data-value"))
            : parseInt(first_number + e.target.getAttribute("data-value"))

        if(evaluation.length == 1) evaluation.shift();
        evaluation.push(first_number)
        result = first_number;
        return;
    }

    if (evaluation.length >= 2) {
        second_number = second_number == 0
            ? parseInt(e.target.getAttribute("data-value"))
            : parseInt(second_number + e.target.getAttribute("data-value"));

        if(evaluation.length == 3) evaluation.pop();
        evaluation.push(second_number);
        result = second_number;
    }
}

function AssignOperation(e) {
    if(evaluation.length >= 1) {
        current_operator = e.target.getAttribute('data-value');

        if(current_operator == "%" || current_operator == "+/-") return Operate();

        if(evaluation.length == 3) Operate();
        if(evaluation.length == 2) evaluation.pop();
        evaluation.push(current_operator);
        
    }
}

function Clear() {
    if(second_number != 0) {
        second_number = 0;
        result = first_number;
        return;
    }

    first_number = 0;
    result = 0;
}

function Operate() { 

    if(current_operator == "%") {
        result = evaluation[0] / 100;
        first_number = result; 
        second_number = 0;
        evaluation = [first_number];
        return;
    }

    if(current_operator == "+/-") {
        result = evaluation[0] * -1;
        first_number = result;
        second_number = 0;
        evaluation = [first_number]
        return;
    }

    result = eval(evaluation.join().replace(/,/g, ""))
    first_number = result;
    second_number = 0;
    evaluation = [first_number]
}

function Render() {
    const clear_button = document.querySelector('div[data-button-type="clear"]');

    let new_operator_button = Array.from(document.querySelectorAll('div[data-button-type="operator"]'))
        .filter(button => button.getAttribute("data-value") == current_operator);

    let last_operator_button =  document.querySelector('.selected_operation');

    // Render in screen the latest number updated.
    screen.textContent = result;

    second_number != 0
        ? clear_button.textContent = 'C'
        : clear_button.textContent = 'AC'
    
    // Change styling of selected operators.
    last_operator_button ? last_operator_button.classList.remove('selected_operation') : null;
    new_operator_button[0] ? new_operator_button[0].classList.add('selected_operation') : null;
}

// function debug() {
//     console.log("first_number: " + first_number);
//     console.log("second_number: " + second_number);
//     console.log("current_operator: " + current_operator);
//     console.log("end of log")
// }
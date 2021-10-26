let first_number = 0;
let second_number = 0;
let result = 0;
let current_operator;
let evaluation = [];
const screen = document.querySelector(".screen");
const keyboard = document.querySelector(".keyboard");

/*
    TODO: Handle styling when there appear bigger numbers
    TODO: Remove selected_operation class when another button is pressed
    TODO: Handle a way to introduce decimal numbers
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
    }

    Render();
}

function AssignNumber(e) {
    
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
    current_operator = e.target.getAttribute('data-value');

    // Exclusive operations that can be performed with one number, in the case of clear it can be executed even when the evaluation array is empty
    if(current_operator == "%" || current_operator == "+/-" || current_operator == "clear" || current_operator == "=") return Operate();

    if(evaluation.length == 3) Operate();
    if(evaluation.length == 2) evaluation.pop();
    evaluation.splice(1, 1, current_operator);
}

function Operate() { 
    if(current_operator == "%" && evaluation.length) {
        result = evaluation[evaluation.length - 1] / 100;
        evaluation.splice(evaluation.length - 1, 1, result);
        return;
    }

    if(current_operator == "+/-" && evaluation.length) {
        result = evaluation[evaluation.length - 1] * -1;
        evaluation.splice(evaluation.length - 1, 1, result);
        return;
    }

    if(current_operator == "clear") {
        
        if(evaluation.length <= 2) {
            first_number = 0;
            evaluation = [];
            result = 0;
            return;
        }
    
        if(evaluation.length == 3) {
            second_number = 0;
            evaluation = [first_number]
            result = first_number;
            return;
        }

    }

    if(evaluation.length == 3) {
        result = eval(evaluation.join().replace(/,/g, ""))
        console.log(result)
        first_number = result;
        second_number = 0;
        evaluation = [first_number]
    }
}

function Render() {
    // select clear button
    const clear_button = document.querySelector('div[data-value="clear"]');

    // select operators buttons
    let new_operator_button = Array.from(document.querySelectorAll('div[data-button-type="operator"]'))
        .filter(button => button.getAttribute("data-value") == current_operator)[0];

    let last_operator_button = document.querySelector('.selected_operation');

    // change style of operators
    last_operator_button ? last_operator_button.classList.remove('selected_operation') : null;
    new_operator_button ? new_operator_button.classList.add('selected_operation') : null;


    // render last number in screen
    screen.textContent = result;

    // change clear button content
    evaluation.length == 0
        ? clear_button.textContent = 'AC'
        : clear_button.textContent = 'C'

}

function debug() {
    // console.log("first_number: " + first_number);
    // console.log("second_number: " + second_number);
    // console.log("current_operator: " + current_operator);
    // console.log("end of log")
}
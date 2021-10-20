let first_number = 0;
let second_number = 0;
let last_number = 0;
let current_operation;
let last_operation;
const screen = document.querySelector(".screen");
const keyboard = document.querySelector(".keyboard");

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
            Operate()
            break;
    }

    Render();
}

function AssignNumber(e) {
    if (current_operation && first_number == 0) current_operation = null;
    
    if (!current_operation) {
        first_number = first_number == 0 
            ? parseInt(e.target.getAttribute("data-value"))
            : parseInt(first_number + e.target.getAttribute("data-value"))

        last_number = first_number;
        return;
    }

    second_number = second_number == 0
        ? parseInt(e.target.getAttribute("data-value"))
        : parseInt(second_number + e.target.getAttribute("data-value"))

    last_number = second_number;
}

function AssignOperation(e) {
    if(!current_operation) return current_operation = e.target.getAttribute('data-value');

    last_operation = current_operation;
    current_operation = e.target.getAttribute('data-value');
}

function Clear() {
    if(second_number != 0) {
        second_number = 0;
        last_number = first_number;
        return;
    }

    first_number = 0;
    last_number = 0;
}

/*
    BUG SPOTTED: The render function renders on screen the last_number variable,
    which after passing through the Operate function it doesn't actually sets itself
    to the value but to the second_number, since its original functionality was 
    to perform as a memory holder rather than the result holder. 

    POSSIBLE FIX: Introduce a result variable. 
*/
function Operate() { 
    /* Operations that can be only performed with two numbers */
    if(first_number != 0 && second_number != 0) {
        switch(current_operation) {
            case "+":
                first_number = first_number + second_number;
                last_number = second_number;
                second_number = 0;
                break;
        }
    }
}

function Render() {
    console.log(first_number)
    const clear_button = document.querySelector('div[data-button-type="clear"]');

    let new_operation_button = Array.from(document.querySelectorAll('div[data-button-type="operator"]'))
        .filter(button => button.getAttribute("data-value") == current_operation);

    let last_operation_button =  document.querySelector('.selected_operation');

    // Render in screen the latest number updated.
    screen.textContent = last_number;

    second_number != 0
        ? clear_button.textContent = 'C'
        : clear_button.textContent = 'AC'
    
    // Change styling of selected operators.
    last_operation_button ? last_operation_button.classList.remove('selected_operation') : null;
    new_operation_button[0] ? new_operation_button[0].classList.add('selected_operation') : null;
}

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
        /*
        case "clear":
            Clear();
            break;
        case "equals":
            Operate()
            break;
        */
    }

    // Operate();
    Render();
}

function AssignNumber(e) {
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

function Render() {
    const clear_button = document.querySelector('div[data-button-type="clear"]');

    let new_operation_button = Array.from(document.querySelectorAll('div[data-button-type="operator"]'))
        .filter(button => button.getAttribute("data-value") == current_operation);

    let last_operation_button =  Array.from(document.querySelectorAll('div[data-button-type="operator"]'))
        .filter(button => button.getAttribute("data-value") == last_operation);

    // Render in screen the latest number updated.
    screen.textContent = last_number;

    second_number != 0
        ? clear_button.textContent = 'C'
        : clear_button.textContent = 'AC'
    
    // Change styling of selected operators.
    last_operation_button[0].classList.toggle('selected_operation');
    new_operation_button[0].classList.toggle('selected_operation');
}

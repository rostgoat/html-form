const customAnswerButton = document.getElementById('add-custom-answer');
const saveButton = document.getElementById('save-button');
const cancelButton = document.getElementById('cancel-button');
const answersList = document.querySelector('.form-bottom__answers');
const errors = document.querySelector('.form-errors');
const form = document.getElementById('questionForm');
let longAnswer = document.getElementById('long_answer');
let errorCount = 0;

/**
 * Initial answers when page renders
 */
const answers = [
    'Neutralization reaction',
    'Salt reaction',
    'Hydroxide reaction',
    'Single replacement reaction'
];

/**
 * Initialize multiple choice answers when DOM renders
 */
function init() {
    // Loop through the array and set the elements into the DOM
    answers.forEach(function(answer, index) {
        createAnswerItem(answer, index, false);
    });
}

/**
 * Print default answers to DOM or print a new answer to DOM with input
 * 
 * @param {String} answer Default answer from answers array
 * @param {Number} index Answer index from answers array
 * @param {Boolean} custom Adding default answers to DOM or creating a new one
 */
function createAnswerItem(answer, index, custom) {
    let name;
    let nameContainer;
    const newIndex = answers.length

    // item parent element
    const item = document.createElement('div');
    custom ? item.setAttribute('id', newIndex + 1): item.setAttribute('id', index);
    item.setAttribute('class', 'form-bottom__item');

    // item draggable logo
    const image = document.createElement('img');
    image.setAttribute('class', 'form-bottom__item-img');
    image.setAttribute('src', 'images/drag_icon.png');
    image.setAttribute('alt', 'drag_icon.png');
    image.setAttribute('role', 'answer icon')
    image.setAttribute('aria-label', 'answer icon');

    // item radio input
    const radioInput = document.createElement('input');
    radioInput.setAttribute('class', 'form-bottom__item-radio-btn');
    radioInput.setAttribute('type', 'radio');
    radioInput.setAttribute('name', 'mc-answer')
    custom ? radioInput.setAttribute('value', `item_${newIndex + 1}`) : radioInput.setAttribute('value', `item_${index}`);
    radioInput.setAttribute('role', 'button')
    radioInput.setAttribute('aria-label', 'answer radio button');

    // item input or text content
    // if new answer is being added, create input
    if (custom) {
        name = document.createElement('input');
        name.setAttribute('class', 'form-bottom__item-text form-input custom-input');
        name.setAttribute('placeholder', 'Enter your custom answer here..');
        name.setAttribute('type', 'input');
        name.setAttribute('value', '');
    } else { 
        // if default items are being printed, print text content in a p tag
        nameContainer = document.createElement('div');
        nameContainer.setAttribute('class', 'form-bottom__item-text form-input');
        
        name = document.createElement('p');
        name.setAttribute('class', 'form-text');
        name.setAttribute('role', 'answer option')
        name.setAttribute('aria-label', 'answer option');
        name.appendChild(document.createTextNode(`${answer}`));
    }

    // item remove button which deletes the entire row
    const removeBtn = document.createElement('button');
    removeBtn.setAttribute('class', 'form-bottom__item-remove-btn');
    custom ? removeBtn.setAttribute('onClick', `removeAnswer("${newIndex + 1}")`) : removeBtn.setAttribute('onClick', `removeAnswer("${index}")`);
    removeBtn.setAttribute('role', 'button')
    removeBtn.setAttribute('aria-label', 'remove answer')
    removeBtn.appendChild(document.createTextNode('x'));
    
    // append text container to DOM if printing default answers
    if (!custom) {
        nameContainer.appendChild(name);
    }

    // append elements to item parent row
    item.appendChild(image);
    item.appendChild(radioInput);
    custom ? item.appendChild(name) : item.appendChild(nameContainer);
    item.appendChild(removeBtn);

    // append item to DOM list element
    answersList.appendChild(item);
}

/**
 * Add custom multiple choice answer
 */
customAnswerButton.addEventListener('click', function(e) {
    e.preventDefault();
    createAnswerItem('', 0, true);
}) 
    
/**
 * Remove answer from answers array and from the DOM
 * @param {Number} itemToRemove 
 */
function removeAnswer(itemToRemove) {
    // html element to remove
    const item = document.getElementById(itemToRemove);
    // index in answers array to remove
    const itemIndex = item.id;
    // remove item from answers array
    answers.splice(itemIndex, 1)
    // remove item from DOM
    answersList.removeChild(item);
}

/**
 * Validate inputs before submission
 * @param {Event} e 
 */
saveButton.addEventListener('click', function(e) {
    e.preventDefault();

    // data to submit
    const data = validateData();

    // if no form errors exist, submit the form
    if (errorCount === 0) {
        // simulate form submission
        document.getElementById('questionForm').submit();
    }
    // reset error count for new submissions
    errorCount = 0;
});

/**
 * Validate inputs before submission
 */
function validateData() {
    // get the answer from the question textarea
    let multipleChoiceAnswer;
    longAnswer.value;

    // loop through all the multiple choice answers and find the selected one
    const array = Array.prototype.slice.call(answersList.querySelectorAll('.form-bottom__item'));
    array.forEach(function(item) {

        // get currently selected multiplechoice answeer
        const current = item.querySelector('.form-bottom__item-radio-btn');

        // get the element tag
        const currentItemType = item.querySelector('.form-bottom__item-text').tagName;

        // if the answer selected in predefined - grab it's text content
        // if the answer is manually entered by the user - grab it's input text value
        if (current.checked && (currentItemType === 'DIV')) {
            multipleChoiceAnswer = current.parentElement.querySelector('.form-bottom__item-text').textContent;
        } else if (current.checked && (currentItemType === 'INPUT')) {
            multipleChoiceAnswer = current.parentElement.querySelector('.form-bottom__item-text').value;
        }
    })

    // verify that user has entered an answer into the question box
    if (longAnswer === '') {
        const error = document.createElement('span');
        error.textContent = "Please type an answer to the question!"
        errors.appendChild(error);
        errorCount += 1;
    }

    // verify that at least 1 multiple choice answer was selected or display error
    if (typeof multipleChoiceAnswer === 'undefined') {
        const error = document.createElement('span');
        error.textContent = "Please select at least 1 answer or type your own!"
        errors.appendChild(error);
        errorCount += 1;
    }

    // return submission data
    return {
        longAnswer: longAnswer,
        multipleChoiceAnswer: multipleChoiceAnswer
    }
}

/**
 * Clear input forms
 */
cancelButton.addEventListener('click', function(e) {
    e.preventDefault();
    // remove text from question form
    longAnswer.value = '';

    // uncheck all radio buttons
    const array = Array.prototype.slice.call(answersList.querySelectorAll('.form-bottom__item'));
    array.forEach(function(item) {
        const current = item.querySelector('.form-bottom__item-radio-btn');
        current.checked = false;
    })
})

// inialize page
init();
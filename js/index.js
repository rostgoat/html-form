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
        const item = document.createElement('div');
        item.setAttribute('id', index);
        item.setAttribute('class', 'form-bottom__item');
    
        const image = document.createElement('img');
        image.setAttribute('class', 'form-bottom__item-img');
        image.setAttribute('src', 'images/drag_icon.png');
        image.setAttribute('alt', 'drag_icon.png');
        image.setAttribute('role', 'asnwer icon')
        image.setAttribute('aria-label', 'answer icon');
    
        const radioInput = document.createElement('input');
        radioInput.setAttribute('class', 'form-bottom__item-radio-btn');
        radioInput.setAttribute('type', 'radio');
        radioInput.setAttribute('name', 'mc-answer')
        radioInput.setAttribute('value', `item_${index}`);
        radioInput.setAttribute('role', 'button')
        radioInput.setAttribute('aria-label', 'answer radio button');
    
        const nameContainer = document.createElement('div');
        nameContainer.setAttribute('class', 'form-bottom__item-text form-input');
        
        const name = document.createElement('p');
        name.setAttribute('class', 'form-text');
        name.setAttribute('role', 'asnwer option')
        name.setAttribute('aria-label', 'answer option');
        name.appendChild(document.createTextNode(`${answer}`));
        
        const removeBtn = document.createElement('button');
        removeBtn.setAttribute('class', 'form-bottom__item-remove-btn');
        removeBtn.setAttribute('onClick', `removeAnswer("${index}")`);
        removeBtn.setAttribute('role', 'button')
        removeBtn.setAttribute('aria-label', 'remove answer')
        removeBtn.appendChild(document.createTextNode('x'));
        
        nameContainer.appendChild(name);
        item.appendChild(image);
        item.appendChild(radioInput);
        item.appendChild(nameContainer);
        item.appendChild(removeBtn);
    
        answersList.appendChild(item);
    });
}

/**
 * Add custom multiple choice answer
 */
customAnswerButton.addEventListener('click', function(e) {
    e.preventDefault();
    
    const newIndex = answers.length

    const item = document.createElement('div');
    item.setAttribute('id', newIndex + 1);
    item.setAttribute('class', 'form-bottom__item');

    const image = document.createElement('img');
    image.setAttribute('class', 'form-bottom__item-img');
    image.setAttribute('src', 'images/drag_icon.png');
    image.setAttribute('alt', 'drag_icon.png');
    image.setAttribute('role', 'asnwer icon')
    image.setAttribute('aria-label', 'answer icon');

    const radioInput = document.createElement('input');
    radioInput.setAttribute('class', 'form-bottom__item-radio-btn');
    radioInput.setAttribute('type', 'radio');
    radioInput.setAttribute('name', 'mc-answer')
    radioInput.setAttribute('value', `item_${newIndex + 1}`);
    radioInput.setAttribute('role', 'button')
    radioInput.setAttribute('aria-label', 'answer radio button');

    const name = document.createElement('input');
    name.setAttribute('class', 'form-bottom__item-text form-input custom-input');
    name.setAttribute('placeholder', 'Enter your custom answer here..');
    name.setAttribute('type', 'input');
    name.setAttribute('value', '');

    const removeBtn = document.createElement('button');
    removeBtn.setAttribute('class', 'form-bottom__item-remove-btn');
    removeBtn.setAttribute('onClick', `removeAnswer("${newIndex + 1}")`);
    removeBtn.setAttribute('role', 'button')
    removeBtn.setAttribute('aria-label', 'remove answer')
    removeBtn.appendChild(document.createTextNode('x'));

    item.appendChild(image);
    item.appendChild(radioInput);
    item.appendChild(name);
    item.appendChild(removeBtn);

    answersList.appendChild(item);
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
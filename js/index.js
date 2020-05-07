const customAnswerButton = document.getElementById('add-custom-answer');
const saveButton = document.getElementById('save-button');
const cancelButton = document.getElementById('cancel-button');
const form = document.getElementById('questionForm');
form.action = '/success_page.html';
form.method = 'POST';
let errorCount = 0;
const answersList = document.querySelector('.form-bottom__answers');
const errors = document.querySelector('.form-errors');

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
 * Loop through the array and set the elements into the DOM
 */
answers.forEach(function(answer, index) {
    const item = document.createElement('div');
    item.setAttribute('id', index);
    item.setAttribute('class', 'form-bottom__item');

    const image = document.createElement('img');
    image.setAttribute('class', 'form-bottom__item-img');
    image.setAttribute('src', 'images/drag_icon.png');
    image.setAttribute('alt', 'drag_icon.png');

    const radioInput = document.createElement('input');
    radioInput.setAttribute('class', 'form-bottom__item-radio-btn');
    radioInput.setAttribute('type', 'radio');
    radioInput.setAttribute('name', 'mc-answer')
    radioInput.setAttribute('value', `item_${index}`);

    const name = document.createElement('div');
    name.setAttribute('class', 'form-bottom__item-text form-input');
    name.appendChild(document.createTextNode(`${answer}`));

    const removeBtn = document.createElement('button');
    removeBtn.setAttribute('class', 'form-bottom__item-remove-btn');
    removeBtn.setAttribute('onClick', `removeAnswer("${index}")`);
    removeBtn.appendChild(document.createTextNode('x'));

    item.appendChild(image);
    item.appendChild(radioInput);
    item.appendChild(name);
    item.appendChild(removeBtn);

    answersList.appendChild(item);
});


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

    const radioInput = document.createElement('input');
    radioInput.setAttribute('class', 'form-bottom__item-radio-btn');
    radioInput.setAttribute('type', 'radio');
    radioInput.setAttribute('name', 'mc-answer')
    radioInput.setAttribute('value', `item_${newIndex + 1}`);

    const name = document.createElement('input');
    name.setAttribute('class', 'form-bottom__item-text form-input');
    name.setAttribute('placeholder', 'Enter your answer here..');
    name.setAttribute('type', 'input');
    name.setAttribute('value', '');

    const removeBtn = document.createElement('button');
    removeBtn.setAttribute('class', 'form-bottom__item-remove-btn');
    removeBtn.setAttribute('onClick', `removeAnswer("${newIndex + 1}")`);
    removeBtn.appendChild(document.createTextNode('x'));

    item.appendChild(image);
    item.appendChild(radioInput);
    item.appendChild(name);
    item.appendChild(removeBtn);

    answersList.appendChild(item);
    console.log('answersList', answersList)
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

    const data = validateData();

    console.log('data', data)
    if (errorCount === 0) {
        document.getElementById('questionForm').submit();
    }
});

/**
 * Validate inputs before submission
 */
function validateData() {
    // get the answer from the question textarea
    const longAnswer = document.getElementById('long_answer').value;
    let multipleChoiceAnswer;

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

    console.log('clicked cancel');
})
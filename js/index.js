/**
 * Initial answers when page renders
 */
var answers = [
    'Neutralization reaction',
    'Salt reaction',
    'Hydroxide reaction',
    'Single replacement reaction'
];

/**
 * Get reference to answers div in DOM
 */
var answersList = document.querySelector('.form-bottom__answers');

/**
 * Loop through the array and set the elements into the DOM
 */
answers.forEach(function(answer, index) {
    var item = document.createElement('div');
    item.setAttribute('id', index);
    item.setAttribute('class', 'form-bottom__item');

    var image = document.createElement('img');
    image.setAttribute('class', 'form-bottom__item-img');
    image.setAttribute('src', 'images/drag_icon.png');
    image.setAttribute('alt', 'drag_icon.png');

    var radioInput = document.createElement('input');
    radioInput.setAttribute('class', 'form-bottom__item-radio-btn');
    radioInput.setAttribute('type', 'radio');
    radioInput.setAttribute('value', `item_${index}`);

    var name = document.createElement('div');
    name.setAttribute('class', 'form-bottom__item-text form-input');
    name.appendChild(document.createTextNode(`${answer}`));

    var removeBtn = document.createElement('button');
    removeBtn.setAttribute('class', 'form-bottom__item-remove-btn');
    removeBtn.setAttribute('onClick', `removeAnswer(e, "${index}")`);
    removeBtn.appendChild(document.createTextNode('x'));

    item.appendChild(image);
    item.appendChild(radioInput);
    item.appendChild(name);
    item.appendChild(removeBtn);

    answersList.appendChild(item);
});

function addAnswer(title) {
    answers.push(title);
}

/**
 * Remove answer from array
 * @param {Number} itemToRemove 
 */
function removeAnswer(e, itemToRemove) {
    e.preventDefault();
    var item = document.getElementById(itemToRemove);
    answersList.removeChild(item);
}

/**
 * Prevent form from submitting involuntarily
 * @param {Event} e 
 */
function submitForm() {
    var shortAnswer = document.getElementById('short_answer').value;
    var longAnswer = document.getElementById('long_answer').value;
    var multipleChoiceAnswer;

    var array = Array.prototype.slice.call(answersList.querySelectorAll('.form-bottom__item'));

    array.forEach(function(item) {
        var current = item.querySelector('.form-bottom__item-radio-btn')
        if (current.checked) {
            multipleChoiceAnswer = current.parentElement.querySelector('.form-bottom__item-text').textContent;
        }
    })

    console.log('shortAnswer', shortAnswer)
    console.log('longAnswer', longAnswer)
    console.log('multipleChoiceAnswer', multipleChoiceAnswer)

    var dataToSubmit = {
        shortAnswer: shortAnswer,
        longAnswer: longAnswer,
        multipleChoiceAnswer: multipleChoiceAnswer
    }

    document.getElementById('questionForm').submit();
}
# D2L FORM

## Assumptions

### Styling of Input-Like Elements

The elements below the labels can be inputs and non-inputs but they all contain the same styles, which are composed of a `div` with a grey border

### Short Description

Short description introduces the topic of the question.

### Question \*

This is a `textarea` which must be answered by the user in order to submit the form.

### Hint

A hint about the question.

### Answers

- A user can pick one of the 4 default answers, or the newly added answers.
- A user can delete any of the 4 default answers, or the newly added answers.
- The answer text cannot be edited, unless it's manually added.

### Add Answer

- A user can add a new answer if the 4 default answers are wrong.
- A user can type the answer into the newly created row and select it
using the radio button.

### Save button

Validates that:

 - Question has be answered
 - At least 1 multiple choice answer was selected

Error is "thrown" (displayed, rather, on the screen) if one or more of the above is invalid.

Form is submitted to a fake page called `success.html` using a `POST` request.

### Cancel button

Clears `Question*`  input and any multiple choice selections made by the user.


## Notes

### Having both Question and Multiple Choice as Requirements for Form Submission

I found it slightly odd that the `textform` question can be answered both in the `textform` and using the multiple choice selections. I am going to **assume** that the `textarea` can allow the user to answer the question in more depth to potentially receive partial marks, if this was a quiz type of form.



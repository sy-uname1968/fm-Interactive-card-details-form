import "./scss/styles.scss";

const cardNameInput = document.getElementById('cardholderName')
const cardNumberInput = document.getElementById('cardNumber')
const cardMonthInput = document.getElementById('expMonth')
const cardYearInput = document.getElementById('expYear')
const cardCVCInput = document.getElementById('cardCVC')
const form = document.getElementById('form');

const cardName = document.querySelector('.cardholder-name')
const cardNumber = document.querySelector('.card-number')
const validToMonth = document.querySelector('.valid-to-month')
const validToYear = document.querySelector('.valid-to-year')
const cardCVC = document.querySelector('.card-cvc')

function cc_format(value) {
  var i, len;
  var v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
//   console.log(v)
  var matches = v.match(/\d{4,16}/g);
  var match = (matches && matches[0]) || "";
//   console.log(match)
  var parts = [];
  for (i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }
  if (parts.length) {
    return parts.join(" ");
  } else {
    return value;
  }
}

const showError = (input, message) => {
    const formElement = input.closest(".form-element");
    formElement.className = 'form-element error';
    input.className = 'input input-error';
    const errorMessage = formElement.querySelector('.error-message');
    errorMessage.innerText = message;
}

const showSuccess = (input) => {
    const formElement = input.closest(".form-element");
    formElement.className = 'form-element';
    input.className = 'input';
}

const showLocalSuccess = (input) => {
    input.className = 'input';
}

const showFooterSuccess = (input) => {
    const formElement = input.closest(".form-element");
    formElement.className = 'form-element';
}

const validateForm = () => {

    let isFormCorrect = true;
    let isFooterCorrect = true;

    if (cardNameInput.value === '') {
        showError(cardNameInput, "Can't be blank");
        isFormCorrect = false;
    } else {
        showSuccess(cardNameInput) 
    }


    if (cardNumberInput.value === '') {
        showError(cardNumberInput, "Can't be blank");
        isFormCorrect = false;
    } else if (!cardNumberInput.value.match(/^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/g)) {
        showError(cardNumberInput, 'Wrong format. Correct format is 16 digits number.');
        isFormCorrect = false;
    } else {
        showSuccess(cardNumberInput)
    }

    if (cardCVCInput.value === '') {
        showError(cardCVCInput, 'CVC is required');
        isFormCorrect = false;
        isFooterCorrect = false;
    } else if (!cardCVCInput.value.match(/^[0-9]{3}$/g)) {
        showError(cardCVCInput, 'CVC is three digits code');
        isFormCorrect = false;
        isFooterCorrect = false;
    } else {
        showLocalSuccess(cardCVCInput)
    }

    if (cardYearInput.value === '') {
        showError(cardYearInput, "Card exparation year can't be blank");
        isFormCorrect = false;
        isFooterCorrect = false;
    } else if (!cardYearInput.value.match(/^[0-9]{2}$/g)) {
        showError(cardYearInput, 'Wrong format. Correct format is two digit number');
        isFormCorrect = false;
        isFooterCorrect = false;
    } else {
        showLocalSuccess(cardYearInput)
    }

    if (cardMonthInput.value === '') {
        showError(cardMonthInput, "Card exparation month can't be blank");
        isFormCorrect = false;
        isFooterCorrect = false;
    } else if (!cardMonthInput.value.match(/^([0]{1}[1-9]{1}|[1]{1}[0-2]{1})$/g)) {
        showError(cardMonthInput, "Wrong exparation month format. Correct format is two digit number from 01 to 12");
        isFormCorrect = false;
        isFooterCorrect = false;
    } else {
        showLocalSuccess(cardMonthInput)
    }

    if (isFooterCorrect) {
        showFooterSuccess(cardCVCInput)
    }

    return isFormCorrect;
}

cardNameInput.addEventListener("input", e => {
    cardName.textContent = e.target.value
});


cardNumberInput.addEventListener("input", e => {
    const formattedValue = cc_format(e.target.value)
    e.target.value = formattedValue
    cardNumber.textContent = formattedValue
});

cardMonthInput.addEventListener("input", e => {
    validToMonth.textContent = e.target.value
});

cardYearInput.addEventListener("input", e => {
    validToYear.textContent = e.target.value
});

cardCVCInput.addEventListener("input", e => {
    cardCVC.textContent = e.target.value
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isFormValid = validateForm();

    if (isFormValid) {
        e.target.parentElement.className = 'form-container success'
    }

});

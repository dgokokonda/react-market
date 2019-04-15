import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data, eventType, errors={}, equals=false) {
  const emailRegex = /^.+@.+\..+/i;

  if (eventType === 'submit') {

    // empty fields
    if (Validator.isEmpty(data.fullname)) {
      errors.fullname = 'Укажите полное наименование юрлица';
    }
    if (Validator.isEmpty(data.shortname)) {
      errors.shortname = 'Укажите сокращенное наименование юрлица';
    }
    if (Validator.isEmpty(data.inn)) {
      errors.inn = 'Укажите ИНН юрлица';
    }
    if (Validator.isEmpty(data.kpp)) {
      errors.kpp = 'Укажите КПП юрлица';
    }
    if (Validator.isEmpty(data.urAddress)) {
      errors.urAddress = 'Укажите юридический адрес юрлица';
    }
    if (Validator.isEmpty(data.factAddress)) {
      errors.factAddress = 'Укажите фактический адрес юрлица';
    }
    if (Validator.isEmpty(data.urPhone)) {
      errors.urPhone = 'Укажите телефон юрлица';
    }
    if (Validator.isEmpty(data.fio)) {
      errors.fio = 'Укажите ФИО контактного лица';
    }
    if (Validator.isEmpty(data.position)) {
      errors.position = 'Укажите должность';
    }
    if (Validator.isEmpty(data.email)) {
      errors.email = 'Укажите email, например my@mail.ru';
    }
    if (Validator.isEmpty(data.phone)) {
      errors.phone = 'Укажите номер мобильного телефона';
    }
    if (Validator.isEmpty(data.password)) {
      errors.password = 'Введите пароль';
    }

    // wrong length
    if (!Validator.isLength(data.fullname, {min: 2, max: 100})) {
      errors.fullname = 'Введите количество символов от 2 до 100';
    }
    if (!Validator.isLength(data.shortname, {min: 2, max: 100})) {
      errors.shortname = 'Введите количество символов от 2 до 100';
    }
    if (!Validator.isLength(data.inn, {min: 10, max: 10})) {
      errors.inn = 'ИНН должен содержать 10 символов';
    }
    if (!Validator.isLength(data.kpp, {min: 9, max: 9})) {
      errors.kpp = 'КПП должен содержать 9 символов';
    }
    if (!Validator.isLength(data.fio, {min: 2, max: 100})) {
      errors.fio = 'Введите количество символов от 2 до 100';
    }

    if (!emailRegex.test(data.email)) {
      errors.email = 'Введите корректный e-mail';
    }

    // equals checking
    if (Validator.equals(data.urAddress, data.factAddress)) {
      equals = true;
    }

    // if (Validator.isEmpty(data.passwordConfirmation)) {
    //   errors.passwordConfirmation = 'This field is required';
    // }
    // if (!Validator.equals(data.password, data.passwordConfirmation)) {
    //   errors.passwordConfirmation = 'Passwords must match';
    // }
  } else if (eventType === 'blur') {

    switch(data.name) {
      case 'fullname':
        if (!Validator.isEmpty(data.val) && !Validator.isLength(data.val, {min: 2, max: 100})) {
          errors.fullname = 'Введите количество символов от 2 до 100';
        } else {
          errors.fullname = '';
        }
        break;

      case 'shortname':
        if (!Validator.isEmpty(data.val) && !Validator.isLength(data.val, {min: 2, max: 100})) {
          errors.shortname = 'Введите количество символов от 2 до 100';
        } else {
          errors.shortname = '';
        }
        break;

      case 'inn':
        if (!Validator.isEmpty(data.val) && !Validator.isLength(data.val, {min: 10, max: 10})) {
          errors.inn = 'ИНН должен содержать 10 символов';
        } else {
          errors.inn = '';
        }
        break;

      case 'kpp':
        if (!Validator.isEmpty(data.val) && !Validator.isLength(data.val, {min: 9, max: 9})) {
          errors.kpp = 'КПП должен содержать 9 символов';
        } else {
          errors.kpp = '';
        }
        break;

      case 'urAddress':
        equals = Validator.equals(data.val, document.querySelector('input[name="factAddress"]').value);
        break;

      case 'factAddress':
        equals = Validator.equals(data.val, document.querySelector('input[name="urAddress"]').value);
        break;

      case 'urPhone':
        break;

      case 'fio':
        if (!Validator.isEmpty(data.val) && !Validator.isLength(data.val, {min: 2, max: 100})) {
          errors.fio = 'Введите количество символов от 2 до 100';
        } else {
          errors.fio = '';
        }
        break;

      case 'position':
        break;

      case 'email':
        if (!emailRegex.test(data.val)) {
          errors.email = 'Введите корректный e-mail';
        } else {
          errors.email = '';
        }
        break;

      case 'phone':
        break;

      case 'password':
        break;

      default:
        break;
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
    equals
  }
}

// isIn(str, values) 	check if the string is in a array of allowed values.
// isEmail
// isLength(str [, options]) 	check if the string's length falls in a range. options is an object which defaults to {min:0, max: undefined}. Note: this function takes into account surrogate pairs.

// isMobilePhone(str [, locale [, options]]) 	check if the string is a mobile phone number,

// isNumeric(str [, options]) 	check if the string contains only numbers. // options is an object which defaults to {no_symbols: false}. If no_symbols is true, the validator will reject numeric strings that feature a symbol (e.g. +, -, or .).

// isURL(str [, options]) 	check if the string is an URL.
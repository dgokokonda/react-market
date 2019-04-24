import $ from 'jquery';
require('jquery-validation');

export default function validator(selector) {
  const rules = {
    name: {
      required: true,
      rangelength: [2, 100],
      urlPattern: true,
      cyrillic: true,
    },
    fullname: {
      required: true,
      rangelength: [2, 100],
      urlPattern: true,
      cyrillic: true,
    },
    shortname: {
      required: true,
      rangelength: [2, 100],
      urlPattern: true,
      cyrillic: true,
    },
    inn: {
      required: true,
    },
    kpp: {
      required: true,
    },
    urAddress: {
      required: true,
      cyrillic: true,
      urlPattern: true,
    },
    factAddress: {
      required: true,
      cyrillic: true,
      urlPattern: true,
    },
    urPhone: {
      required: true,
    },
    fio: {
      required: true,
      rangelength: [2, 100],
      urlPattern: true,
      cyrillic: true,
    },
    position: {
      required: true,
      cyrillic: true,
      urlPattern: true,
    },
    email: {
      required: true,
      email: false,
      emailPattern: true, // свой паттерн
    },
    phone: {
      required: true,
      minlength: 17,
      maxlength: 17,
    },
    password: {
      required: true,
      rangelength: [8, 50],
    },
    repeatPass: {
      required: true,
      rangelength: [8, 50],
      equalTo: '#password',
    },
  };

  const messages = {
    name: {
      required: 'Укажите полное наименование',
      rangelength: 'Введите количество символов от 2 до 100',
    },
    fullname: {
      required: 'Укажите полное наименование юрлица',
      rangelength: 'Введите количество символов от 2 до 100',
    },
    shortname: {
      required: 'Укажите сокращенное наименование юрлица',
      rangelength: 'Введите количество символов от 2 до 100',
    },
    inn: {
      required: 'Укажите ИНН юрлица',
    },
    kpp: {
      required: 'Укажите КПП юрлица',
    },
    urAddress: {
      required: 'Укажите юридический адрес юрлица',
    },
    factAddress: {
      required: 'Укажите фактический адрес юрлица',
    },
    urPhone: {
      required: 'Укажите телефон юрлица',
    },
    fio: {
      required: 'Укажите ФИО контактного лица',
      rangelength: 'Введите количество символов от 2 до 100',
    },
    position: {
      required: 'Укажите должность',
    },
    phone: {
      required: 'Укажите номер мобильного телефона',
    },
    email: {
      required: 'Укажите email, например my@mail.ru',
      emailPattern: 'Введите корректный e-mail',
    },
    password: {
      required: 'Введите пароль',
      rangelength: 'Пароль должен содержать минимум 8 символов',
    },
    repeatPass: {
      required: 'Повторите пароль',
      rangelength: 'Пароль должен содержать минимум 8 символов',
      equalTo: 'Введенные пароли не совпадают',
    },
  };

  const validator = $(selector).validate({
    rules: rules,
    messages: messages,
  });

  $.validator.addMethod('urlPattern', function(val, el) {
    if (/(.*(ftp|https|http|www).*)/i.test(val)) {
      return this.optional(el);
    } else return !this.optional(el);
  }, 'Пожалуйста, проверьте правильность заполнения');

  $.validator.addMethod('cyrillic', function(val, el) {
    if (/[\wа-я]+/ig.test(val)) {
      return !this.optional(el);
    }
  });

  $.validator.addMethod('emailPattern', function(val, el) {
    if (/^.+@.+\..+/i.test(val)) {
      return !this.optional(el);
    }
  });

  return validator;
}


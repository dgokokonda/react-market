import $ from 'jquery';
import Walkway from 'walkway.js';
import validation from './validate-rules.js';
require('jquery-validation');

$(document).ready(function() {
  const validator = validation('#regForm');

  function readURL(input) {
    if (input.get(0).files[0]) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const imgsrc = e.target.result;
        input.closest('.forms__row').find('.forms__loadFile--previews')
            .append(`<li><span class="forms__loadFile--remove js-remove-file">
            </span><img src="${imgsrc}" alt="Изображение"></li>`);
        input.closest('.forms__row').find('.forms__loadFile--previews').fadeIn();
      },
      reader.readAsDataURL(input.get(0).files[0]);
    }
  }

  function validateForm(elem) {
    if (elem.is('.error')) {
      elem.closest('.forms__row').removeClass('ok').addClass('error');
    } else if (elem.is('.valid')) {
      elem.closest('.forms__row').removeClass('error').addClass('ok');
    }
  }

  function isValid() {
    const fileInput = $('input[type="file"]');
    let filesFlag = false;
    let textFieldFlag = false; // пока здесь будет
    const fields = $('#regForm input'); // более точный селектор
    let count = 0;

    validator.form();

    fields.each(function() {
      validateForm($(this));
      if ($(this).val() && !$(this).is('.error')) {
        count++;
      }
    });
    if (!$('input:radio:checked').length) return;

    textFieldFlag = count === fields.length;

    count = 0;
    fileInput.each(function() {
      $(this)[0].files.length ? count++ : count;
    });

    filesFlag = count === fileInput.length;

    return filesFlag & textFieldFlag;
  }

  $('.inputFile').change(function() {
    const fileExtension = ['jpg', 'gif', 'png', 'svg', 'jpeg'];
    const parts = $(this).val().toLocaleLowerCase().split('.');
    const extension = parts[parts.length - 1];
    const $el = $(this);

    if (fileExtension.join().search(extension) != -1) {
      $el.closest('.forms__row').removeClass('error').addClass('ok');
      readURL($el);
    } else {
      // wrong extension
      $el.closest('.forms__row').removeClass('ok');
      $el.wrap('<form>').closest('form').get(0).reset();
      $el.unwrap();
    }
  });

  $(document).on('click', '.js-remove-file', function() {
    $(this).closest('ul').fadeOut();
    $(this).closest('.forms__row').removeClass('ok').removeClass('error');
    $(this).closest('.forms__row').find('.inputFile').get(0).value='';
    $(this).parent().remove();
  });

  $('#addDigitalSignature').click(function() {
    $(this).closest('.forms__row').next().slideToggle();
    const textAdd = 'Добавить электронно-цифровую подпись';
    const textHide = 'Скрыть';
    $(this).text($(this).text() == textAdd ? textHide : textAdd);
    $(this).toggleClass('hide');
  });

  $('#regForm input').on('input', function() {
    const name = $(this).attr('name');
    const val = $(this).val();

    validator.element($(this));
    validateForm($(this));

    if (name === 'name') {
      $(this).val(val.replace(/[^\D]/g, ''));
    }
  });


  let currentRequest;
  $('#regForm').submit(function(e) {
    e.preventDefault();
    if (currentRequest) {
      currentRequest.abort();
    }
    if (isValid()) {
      currentRequest = $.ajax({
        type: 'POST',
        url: '/form.html',
        data: {},
        success: function() {
          console.log('success');
        },
        error: function(err, msg) {
          console.log('err: ', err, msg);
        },
      });
    }
  });

  const svg = new Walkway({
    selector: '#geo-lines',
    duration: 5000,
  });
  svg.draw();
});

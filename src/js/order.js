import {appendModal, modalContentHTML} from "./modal.js";

const NAME_LOCALSTORAGE_KEY = "user_name",
  EMAIL_LOCALSTORAGE_KEY = "user_email",
  PHONE_LOCALSTORAGE_KEY = "user_phone";
const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;


const onSuccessModalContent = `
<div class="success">
    <h2 class="success__title">Данные успешно сохранены в LocalStorage</h2>
    <div class="success__picture">
    <img src="img/success.gif" alt="успешно" class="success__img">
</div>
</div>
`

function getCoords(elem) {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset,
    right: box.right + window.pageXOffset,
    bottom: box.bottom + window.pageYOffset,
    left: box.left + window.pageXOffset,
  };
}

function createTooltip(input, text) {
  const tooltip = document.createElement("div");
  tooltip.classList.add("tooltip");
  const {top, left} = getCoords(input.target || input);
  tooltip.innerHTML = text || "Допустимый формат: +7(***) и 7 цифр";

  tooltip.style.left = left + "px";
  tooltip.style.top = top + "px";
  document.body.append(tooltip);
}

if (window.location.pathname.includes("Form.html")) {
  const form = document.forms["order-call"];
  const [name, email, tel, comment, policy, send] = form;

  const onBlurCheckFormat = (e) => {
    let value = e.target?.value || e.value;
    const phoneNumber =
      value?.length > 1
        ? `+7${value.slice(2).replace(/\D/g, "")}`
        : `+7${value?.replace(/\D/g, "")}`;

    if (!/^(\+7)(\d{3})(\d{3})(\d{2})(\d{2})$/.test(phoneNumber)) {
      tel.classList.add("error");
      return createTooltip(e);
    }

    document.querySelector(".tooltip")?.remove();
    tel.classList.remove("error");
    return true;
  };

  // helper для сохранения позиции курсора
  function saveCursorPos(phoneNumberLength) {
    if (phoneNumberLength >= 2 && phoneNumberLength < 5) {
      setTimeout(() => {
        tel.selectionEnd = phoneNumberLength + 3;
      }, 0);
    } else if (phoneNumberLength > 5) {
      let selectNow = tel.selectionStart;
      setTimeout(() => {
        tel.selectionEnd = selectNow;
      }, 0);
    } else if (phoneNumberLength === 5) {
      setTimeout(() => {
        tel.selectionEnd = 10;
      }, 0);
    }
  }

  // Маска для инпута, форматирование номера телефона
  function formatPhoneNumber(value) {
    const phoneNumber =
      value.length > 1
        ? `7${value.slice(2).replace(/\D/g, "")}`
        : `7${value.replace(/\D/g, "")}`;
    const phoneNumberLength = phoneNumber.length;

    if (!phoneNumber.slice(1)) {
      tel.setSelectionEnd = 0;
      return "";
    }

    saveCursorPos(phoneNumberLength);

    if (phoneNumberLength < 5) {
      let currentNums = phoneNumber.slice(1, 4);
      return `+${phoneNumber.slice(0, 1)} (${currentNums}${"_".repeat(
        3 - currentNums.length
      )}) _______`;
    }
    let lastNums = phoneNumber.slice(4, 11);
    return `+${phoneNumber.slice(0, 1)} (${phoneNumber.slice(
      1,
      4
    )}) ${lastNums}${"_".repeat(7 - lastNums.length)}`;
  }

  const onChangeTelHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    tel.value = formattedPhoneNumber;
  };

  function checkName() {
    if (!name.value || /\d/g.test(name.value)) {
      createTooltip(name, 'Укажите настоящее имя')
      name.classList.add('error');
      return false
    }
    name.classList.remove('error');
    document.querySelector(".tooltip")?.remove();
    return true;
  }

  function checkEmail() {
    if (!EMAIL_REGEXP.test(email.value)) {
      createTooltip(email, 'Неверный формат email')
      email.classList.add('error');
      return false;
    }

    email.classList.remove('error');
    document.querySelector(".tooltip")?.remove();
    return true;
  }

  policy.addEventListener('change', () => {
    send.disabled = policy.checked ? false : true;
  })

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    window.loaderElement.classList.add('is-loading');
    try {
      /*ВАЛИДАЦИЯ ПОЛЕЙ*/
      if (
        !checkName() ||
        !checkEmail() ||
        !onBlurCheckFormat(tel)
      ) return;

      await new Promise((resolve, reject) => {
        window.localStorage.setItem(PHONE_LOCALSTORAGE_KEY, tel.value.replace(/\D/g, ''));
        window.localStorage.setItem(EMAIL_LOCALSTORAGE_KEY, email.value.trim());
        window.localStorage.setItem(NAME_LOCALSTORAGE_KEY, name.value.trim());
        setTimeout(() => {
          resolve('Ваши данные успешно сохранены в LocalStorage')
        }, 800);
      }).then(res => {
        appendModal(onSuccessModalContent);
      })
    } catch (e) {
      throw new Error(e);
    } finally {
      window.loaderElement.classList.remove('is-loading');
      tel.value = ''
      name.value = ''
      email.value = ''
    }

  }

  tel.addEventListener('input', onChangeTelHandler);
  tel.addEventListener('blur', onBlurCheckFormat);
  name.addEventListener('blur', checkName);
  email.addEventListener('blur', checkEmail);
  send.addEventListener('click', onSubmitHandler);

}

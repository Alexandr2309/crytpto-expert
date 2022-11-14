export const modalContentHTML = `
<div class="modal modal--active">
    <div class="modal__wrapper">
        <div class="modal__content">
            <img class="modal__close"
                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/%D0%98%D0%BA%D0%BE%D0%BD%D0%BA%D0%B0_%D0%BA%D1%80%D0%B5%D1%81%D1%82%D0%B8%D0%BA%D0%B0_%28ei%29.svg/800px-%D0%98%D0%BA%D0%BE%D0%BD%D0%BA%D0%B0_%D0%BA%D1%80%D0%B5%D1%81%D1%82%D0%B8%D0%BA%D0%B0_%28ei%29.svg.png?20141227230235"
                 alt="крестик">
          content_main
        </div>
    </div>
</div>`;

export const appendModal = (content) => {
  let modalWithContent = modalContentHTML
    .replace('content_main', content);

  document.body.insertAdjacentHTML('beforeend', modalWithContent);
  const modal = document.querySelector('.modal');
  const loginClose = document.querySelector('.modal__close');

  function loginCloseHandler() {
    modal.classList.remove('modal--active');
  }

  loginClose.addEventListener('click', loginCloseHandler)
}
window.addEventListener('DOMContentLoaded', (e) => {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelector('.modal').classList.remove('modal--active')
    }
  });
})





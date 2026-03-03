const burgerBtn = document.querySelector('.burger');
const burgerMenu = document.querySelector('.burger-menu');
const burgerClose = document.querySelector('.burger-close');

burgerBtn.addEventListener('click', () => {
  burgerMenu.classList.add('menu-active');
  document.body.style.overflow = 'hidden';
});

burgerClose.addEventListener('click', () => {
  burgerMenu.classList.remove('menu-active');
  document.body.style.overflow = '';
});
//variables
const NAV = document.querySelector('.navbar > ul');

let images = document.querySelector('.portfolio-images');
let portfolioMenu = document.querySelector('.portfolio-menu');
let portfolio = document.querySelector('.portfolio-images');

const BUTTON = document.querySelector('.submit-button');
const CLOSE_BUTTONS = document.querySelectorAll('.close-button');
const MESSAGES = document.querySelectorAll('.message-block');

let links = NAV.querySelectorAll('li > a');
let sections = document.querySelectorAll('section');

const CHECKBOX = document.querySelector('#checkbox');

// navbar menu selector
NAV.addEventListener('click', event => {
  links.forEach(el => el.classList.remove('navbar-active'));
  event.target.classList.add('navbar-active');
  CHECKBOX.checked = false;
});

//portfolio picture outline
images.addEventListener('click', event => {
  images.querySelectorAll('img').forEach(el => (el.style.outline = 'none'));
  if (event.target == images) {
    return;
  }
  event.target.style.outline = '5px solid #F06C64';
});

// portfolio menu selector and images randomizer
portfolioMenu.addEventListener('click', event => {
  if (event.target == portfolioMenu) {
    return;
  }
  portfolioMenu
    .querySelectorAll('button')
    .forEach(el => el.classList.remove('portfolio-active'));
  event.target.classList.add('portfolio-active');

  let picturesNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  picturesNumbers.sort(function() {
    return 0.5 - Math.random();
  });
  for (let i = 0; i < 12; i++) {
    portfolio.children[i].outerHTML =
      '<img class="portfolio-image" src="assets/Project' +
      picturesNumbers[i] +
      '.png" alt="">';
  }
});

//main slider
let items = document.querySelectorAll('.carousel .item');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
  currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
  isEnabled = false;
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener('animationend', function() {
    this.classList.remove('active', direction);
  });
}

function showItem(direction) {
  items[currentItem].classList.add('next', direction);
  items[currentItem].addEventListener('animationend', function() {
    this.classList.remove('next', direction);
    this.classList.add('active');
    isEnabled = true;
  });
}

function nextItem(n) {
  hideItem('to-left');
  changeCurrentItem(n + 1);
  showItem('from-right');
  changeBackground();
}

function previousItem(n) {
  hideItem('to-right');
  changeCurrentItem(n - 1);
  showItem('from-left');
  changeBackground();
}

document.querySelector('.control.left').addEventListener('click', function() {
  if (isEnabled) {
    previousItem(currentItem);
  }
});

document.querySelector('.control.right').addEventListener('click', function() {
  if (isEnabled) {
    nextItem(currentItem);
  }
});

document
  .querySelector('.transparent-vertical')
  .addEventListener('click', function() {
    document.querySelector('.black-vertical').classList.toggle('shown');
  });

document
  .querySelector('.transparent-horizontal')
  .addEventListener('click', () => {
    document.querySelector('.black-horizontal').classList.toggle('shown');
  });

function changeBackground() {
  document.querySelector('.home').classList.toggle('blue');
}

// form sending

document.querySelector('form').addEventListener('submit', event => {
  event.preventDefault();

  let subject = document.getElementById('subject').value.toString();
  let description = document.getElementById('description').value.toString();

  if (
    document.getElementById('email').checkValidity() &&
    document.getElementById('name').checkValidity()
  ) {
    if (!subject) {
      document.getElementById('subject-result').innerText = 'Without subject';
    } else {
      document.getElementById('subject-result').innerText =
        'Subject: ' + subject;
    }

    if (!description) {
      document.getElementById('description-result').innerText =
        'Without description';
    } else {
      document.getElementById('description-result').innerText =
        'Description: ' + description;
    }

    document.querySelector('.message-send').classList.remove('hidden');
  }
});

CLOSE_BUTTONS.forEach(btn => {
  btn.addEventListener('click', () =>
    MESSAGES.forEach(el => {
      console.log(el);
      el.classList.add('hidden');
      document.querySelector('form').reset();
    })
  );
});

//change active menu links on scroll

document.addEventListener('scroll', onScroll);

function onScroll() {
  let currentPosition = window.scrollY;

  sections.forEach(el => {
    if (
      currentPosition >= el.offsetTop - 300 &&
      currentPosition < el.offsetTop + el.offsetHeight / 2
    ) {
      links.forEach(a => {
        a.classList.remove('navbar-active');

        if (el.getAttribute('class') === a.getAttribute('href').substring(1)) {
          a.classList.add('navbar-active');
        }
      });
    }
  });
}

// import 'tui-pagination/dist/tui-pagination.css';
import localStorage from './localctorage';
import generateMarkup from './generateMarkup';


const favCards = localStorage.load('favCards') || {};
const cardsList = document.querySelector('.cards__list');
const filterList = document.querySelector('.category-button-wrap');
let favRecipesItems = Object.values(favCards);
function showNextPage(recipes, page) {
    const data = splitArrOnPages(recipes, page, pagInfo.itemsPerPage);
    showFavRecipes(data);
  }
function filterPage(arr) {
    showFavRecipes(splitArrOnPages(arr, 1, pagInfo.itemsPerPage));
  }
  
const pagInfo = {
  itemsPerPage: window.innerWidth > 768 ? 12 : 9,
};
function splitArrOnPages(arr, page, itemsCount) {
  const start = (page - 1) * itemsCount; // page = 1 => 0
  const end = start + itemsCount; // 12

  const trimmedData = arr.slice(start, end);
  return trimmedData;
}

function addAllCategoriesBtn() {
  filterList.insertAdjacentHTML(
    'beforeend',
    `<button type="button" class="js-allcategories all-categories-btn btn btn-active">
    All categories
  </button>`
  );
}

function sortByCategory(e) {
  const target = e.target;

  if (target.nodeName === 'BUTTON') {
    const currentActiveBtn = document.querySelector('.btn-active');

    // Робимо активну тільки обрану кнопку.
    currentActiveBtn.classList.remove('btn-active');
    target.classList.add('btn-active');
    // Після натискання на кнопку оновлюємо масив з улюбленими стравами
    favRecipesItems = Object.values(favCards);

    // Якщо натискаємо на якийсь фільтр
    if (target.matches('button.js-category')) {
      // Створюємо масив значення якого є відфільтрований масив
      // з усіма улюбленими стравами
      const newArr = favRecipesItems.filter(({ category }) => {
        return target.textContent === category;
      });
      // Перезаписуємо масив для пагінації
      favRecipesItems = newArr;
      filterPage(newArr);

      return;
    }

    // Якщо натискаємо на allcategories
    if (target.matches('button.js-allcategories')) {
      filterPage(favRecipesItems);

      return;
    }
  }
}

function createBtnMarkUp(category) {
  return `<button type="button" class="js-category btn-outline-grey btn-fav btn">${category}</button>`;
}

function createBtnFilters() {
  const uniqueCategories = favRecipesItems
    .map(item => item.category)
    .filter((item, index, arr) => arr.indexOf(item) === index);

  return uniqueCategories.reduce(
    (markup, btn) => markup + createBtnMarkUp(btn),
    ''
  );
}

function showFilterBtns() {
  const buttons = createBtnFilters();
  addAllCategoriesBtn();
  filterList.insertAdjacentHTML('beforeend', buttons);
}

function showFavRecipes(recipeArr) {
  const markUp = recipeArr.reduce(
    (markup, card) => markup + generateMarkup(card),
    ''
  );

  cardsList.innerHTML = '';
  cardsList.insertAdjacentHTML('beforeend', markUp);

}

if (favRecipesItems.length) {
  showFavRecipes(splitArrOnPages(favRecipesItems, 1, pagInfo.itemsPerPage));
  showFilterBtns();
}

filterList.addEventListener('click', sortByCategory);

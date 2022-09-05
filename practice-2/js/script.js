/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

document.addEventListener("DOMContentLoaded", () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    // 1)
    
    const adv = document.querySelectorAll('.promo__adv img');
    const genre = document.querySelector('.promo__genre');
    const poster = document.querySelector('.promo__bg');
    const movieList = document.querySelector('.promo__interactive-list');

    const deleteAdv = (arr) => {
        adv.forEach(item => {
            item.remove();
        });
    };

    deleteAdv(adv);

    // 2), 3)

    const makeChanges = () => {
        genre.textContent = 'драма';
        poster.style.backgroundImage = 'url("img/bg.jpg")';
    }

    makeChanges();
    
    // 4), 5)

    const sortArr = (arr) => {
        arr.sort();
    }

    sortArr(movieDB.movies);

/* Task2 - Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

// 1), 5)
const form = document.querySelector('.add');
const formInput = document.querySelector('.adding__input');
const checkbox = document.querySelector('[type="checkbox"]');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    let newFilm = formInput.value;
    const favorite = checkbox.checked;

    if (newFilm) {

        // 2)
        if(newFilm.length > 21) {
            newFilm = `${newFilm.substring(0, 22)}...`
        }

        if(favorite) {
            console.log('Добавляем любимый фильм');
        }

        movieDB.movies.push(newFilm);
    
        createMovieList(movieDB.movies, movieList);
    }

    event.target.reset();
})

function createMovieList(films, parent) {
    parent.innerHTML = '';
    sortArr(films);
    
    films.forEach((film, i) => {
        parent.innerHTML += `
            <li class="promo__interactive-item">${i + 1} ${film}
                 <div class="delete"></div>
            </li>
        `;
    });

    document.querySelectorAll('.delete').forEach((btn, i) => {
        btn.addEventListener('click', () => {
            btn.parentElement.remove();
            movieDB.movies.splice(i, 1);

            createMovieList(films, parent);
        })
    })
}

createMovieList(movieDB.movies, movieList);
});


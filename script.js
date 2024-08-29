// объект с первичными данными
const products = [
    {
        title: "Телефон 1",
        review: [
            {
                id: 1,
                text: "Самый лучший в мире смартфон"
            },
        ]
    },
    {
        title: "Микроволновка",
        review: [
            {
                id: 4,
                text: "Самый лучший в мире товар"
            },
            {
                id: 7,
                text: "Бывало и хуже"
            }
        ]
    },
    {
        title: "Холодильник",
        review: [
            {
                id: 5,
                text: "Удобный и простой"
            },
            {
                id: 6,
                text: "Соответствует описанию"
            },
            {
                id: 8,
                text: "Еще не подключал"
            }
        ]
    }

]
// функция заполнения локального хранилища первичными данными
function addDataToLocalStorage(data) {
    localStorage.setItem('data', JSON.stringify(data));
}
// функция определения последнего id из всех комментариев
function LastReviewId() {
    let getDataLS;
    if (localStorage.getItem('newData')) {
        getDataLS = JSON.parse(localStorage.getItem('newData'));
    }
    else {
        getDataLS = JSON.parse(localStorage.getItem('data'));
    }
    getDataLS.forEach(data => {
        for (let i = 0; i < data.review.length; i++) {
            let id = data.review[i].id;
            if (!localStorage.getItem('id')) {
                localStorage.setItem('id', id);
            }
            if (Number(id) > Number(localStorage.getItem('id'))) {
                localStorage.setItem('id', id);
            }
        }
    });
}
// заполнение локального хранилища первичными данными
addDataToLocalStorage(products);

// запись в локальное хранилище последнего id из всех комментариев
LastReviewId();

// функция записи новых данных в локальное хранилище

function setNewReview() {
    const divEl = document.querySelector('.container');

    divEl.addEventListener('click', ({ target }) => {
        if (!target.classList.contains('add-review-btn')) {
            return;
        }
        const formEl = target.closest(".form")
        const nameEl = formEl.querySelector('.title');
        const textEl = formEl.querySelector('.text');
        
        const name = nameEl.value.trim();
        const comment = textEl.value;
        if (name === '' || comment === '' ) {
            alert("Необходимо заполнить все поля");
            return;
        }
        const oldReviewId = Number(localStorage.getItem("id"));

        const newReview = [
            {
                title: name,
                review: [
                    {
                        id: oldReviewId + 1,
                        text: comment
                    }
                ]
            }
        ];
        localStorage.setItem('last', JSON.stringify(newReview));
        localStorage.setItem('id', JSON.stringify(oldReviewId + 1));

    });
    
}
setNewReview();

// функция добавления новых данных в локальное хранилище
function addNewReview() {
    const lastReview = JSON.parse(localStorage.getItem('last'));
    let getDataLS;
    if (localStorage.getItem('newData')) {
        getDataLS = JSON.parse(localStorage.getItem('newData'));
    }
    else {
        getDataLS = JSON.parse(localStorage.getItem('data'));
    }
    let flag = false;
    getDataLS.forEach(item => {
        // если такой товар уже есть, то добавляем комментарий
        if (lastReview[0].title === item.title) {
            item.review.push(lastReview[0].review[0]);
            flag = true;
        }
    });
    // если товара НЕТ, то добавляем товар с комментарием
    if (!flag) {
        getDataLS.push(lastReview[0]);
    }
    localStorage.setItem('newData', JSON.stringify(getDataLS)); 
}
if (localStorage.getItem('last')) {
    addNewReview();
    localStorage.removeItem('last');
}

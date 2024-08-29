
// функция для генерации случайного цвета 
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// функция отрисовки продукта без комментариев
function renderProduts(key) {
    const containerReviewEl = document.querySelector('.container-review');
    getDataLS = JSON.parse(localStorage.getItem(key));
    getDataLS.forEach(item => {
        containerReviewEl.insertAdjacentHTML('beforeend', ` 
    <div class="block">
        <details class="review" >
            <summary class="title">${item.title}<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path
                     d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>
            </summary>
            <ul class="list" data-title="${item.title}">
            </ul>
        </details>
        <div class="line"></div>
    </div>
     `)
    }
    )
}

// функция отрисовки комментариев по каждому из продуктов
function renderReviews(key) {
    const listEls = document.querySelectorAll('.list');
    let getDataLS = JSON.parse(localStorage.getItem(key));
    getDataLS.forEach(data => {
        listEls.forEach(el => {
            for (let i = 0; i < data.review.length; i++) {
                const title = el.getAttribute("data-title");
                if (title == data.title) {
                    el.insertAdjacentHTML('beforeend', `
                    <li data-id="${data.review[i].id}" style="border: 2px solid ${getRandomColor()}">
                        <p class="reviewText"> ${data.review[i].text}</p>
                        <button class="delete-btn">Удалить отзыв</button>
                    </li>
                    `)
                }
            }
        })
    });
}

// Функция удаления комментариев
function deleteReview() {
    const divEl = document.querySelector('.container-review');
    divEl.addEventListener('click', ({ target }) => {
        if (!target.classList.contains('delete-btn')) {
            return;
        }
        const reviewEl = target.closest("li");
        const reviewId = reviewEl.getAttribute("data-id");
        const listEl = reviewEl.closest("ul");
        const productTitle = listEl.getAttribute("data-title");
        
        let getDataLS;
        if (localStorage.getItem('newData')) {
            getDataLS = JSON.parse(localStorage.getItem('newData'));
        }
        else {
            getDataLS = JSON.parse(localStorage.getItem('data'));
        }   

        for (let i = 0; i < getDataLS.length; i++) {
            // console.log(productTitle == getDataLS[i].title && getDataLS[i].review.length == 1);
            if (productTitle == getDataLS[i].title && getDataLS[i].review.length == 1) {
                
                getDataLS.splice(i, 1);
            } 
            // console.log(productTitle == getDataLS[i].title && getDataLS[i].review.length > 1);        
            else if (productTitle == getDataLS[i].title && getDataLS[i].review.length > 1) {
                for (let j = 0; j < getDataLS[i].review.length; j++) {
                    if (getDataLS[i].review[j].id == reviewId) {
                        getDataLS[i].review.splice(j, 1);
                    }
                }
            }  else {
                localStorage.clear();
            }     
        }    
        localStorage.setItem('newData', JSON.stringify(getDataLS));
        location.reload();
    })
}
deleteReview();

if (localStorage.getItem('newData')) {
    renderProduts('newData')
    renderReviews('newData');
}
else {
    renderProduts('data')
    renderReviews('data');
}

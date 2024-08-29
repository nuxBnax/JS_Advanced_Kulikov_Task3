// let arr = [1, 2, 3];
// arr.splice(1, 1); // начиная с индекса 1, удалить 1 элемент
// console.log(arr);

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
console.log(products);
const prod = products[2].review.splice(1, 2);

console.log(products.length,
            products[1].review.length,
            products[2].review.length );

products.splice()
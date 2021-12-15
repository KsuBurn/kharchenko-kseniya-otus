Часть 1.
Написать схему GraphQL для примера веб-приложения e-commerce shop:
до 3 балла - какие сущности (минимум 3, можно больше), какие у них поля, какие обязательные какие нет
до 4 баллов - какие запросы/мутации понадобятся (минимум 4, можно больше)

Часть 2.
до 5 баллов - развернуть локально graphQL + nodejs или воспользоваться одним из веб демо (graphqlbin), перенести полностью или частично написанную в Части 1 схему.
Результатом работы будет ссылка на онлайн демо или репозиторий. 

Для тестирования:

Список продуктов
```
{
    products{
        id,
        name,
        inCart,
        category{
            id,
            title
        },
        reviews{
            id,
            description,
            stars
        }
    }
}
```

Список категорий и их продуктов

```
{
    categories{
        id,
        title,
        products{
            id,
            name,
            description,
            inCart
        }
    }
}
```

Список продавцов

```
{
    sellers{
        id,
        title
    }
}
```

Получение продукта

```
{
    product(productId:"1"){
        id,
        name,
        description,
        inCart, 
        category{
            id,
            title
        },
        reviews{
            id,
            description,
            stars
        }
    }
}
```

Список продуктов одного продавца

```
{
    sellerProducts(sellerId: "sellerId1"){
        id,
        name
    }
}
```

Добавляем отзыв 

```
mutation{
    addReview(productId: "1", review: "some review", stars: "5"){
        id,
        name,
        description,
        inCart,
        reviews{
            id,
            description,
            stars
        }
    }
}
```

Добавляем в корзину

```
mutation{
    addInCart(productId: "1"){
        id,
        name,
        description,
        inCart
    }
}
```
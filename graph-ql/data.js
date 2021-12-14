const products = [
  {
    id: '1',
    name: 'Name1',
    description: 'description1',
    categoryId: 'categoryId1',
    sellerId: 'sellerId1',
    inCart: false,
    reviews: [
      {
        id: 'reviewId1',
        description: 'description1',
        stars: '5'
      },
      {
        id: 'reviewId2',
        description: 'description2',
        stars: '5'
      },
    ]
  },
  {
    id: '2',
    name: 'Name2',
    description: 'description2',
    categoryId: 'categoryId2',
    sellerId: 'sellerId2',
    inCart: false,
    reviews: [
      {
        id: 'reviewId1',
        description: 'description1',
        stars: '5'
      },
      {
        id: 'reviewId2',
        description: 'description2',
        stars: '5'
      },
    ]
  },
];

const categories = [
  {
    id: 'categoryId1',
    title: 'title',
  },
  {
    id: 'categoryId2',
    title: 'title',
  },
];

const sellers = [
  {
    id: 'sellerId1',
    title: 'seller-title',
  },
  {
    id: 'sellerId2',
    title: 'seller-title',
  },
];

module.exports = {products, categories, sellers}
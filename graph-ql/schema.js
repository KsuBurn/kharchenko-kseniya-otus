const {products, categories} = require('./data');
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean
} = require('graphql');

const ReviewType = new GraphQLObjectType({
  name: 'Review',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    description: {
      type: new GraphQLNonNull(GraphQLString)
    },
    stars: {
      type: new GraphQLNonNull(GraphQLString)
    },
  })
});

const SellerType = new GraphQLObjectType({
  name: 'Seller',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    title: {
      type: new GraphQLNonNull(GraphQLString)
    },
  })
});

const CategoryType = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    products: {
      type: new GraphQLList(ProductType),
      resolve: (root) => {
        const categoryId = root.id;
        return products.filter(item => item.categoryId === categoryId);
      }
    }
  })
});

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    description: {
      type: GraphQLString
    },
    inCart: {
      type: GraphQLBoolean,
    },
    category: {
      type: CategoryType,
      resolve: (root) => {
        return categories.find(item => item.id === root.categoryId);
      }
    },
    reviews: {
      type: new GraphQLList(ReviewType),
    }
  })
});

module.exports = {ReviewType, SellerType, CategoryType, ProductType}

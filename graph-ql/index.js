const {
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
} = require('graphql');

const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const { products, categories, sellers } = require('./data');
const { SellerType, CategoryType, ProductType } = require('./schema')

const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => {
    return {
      products: {
        type: new GraphQLList(ProductType),
        resolve: function () {
          return products;
        }
      },

      categories: {
        type: new GraphQLList(CategoryType),
        resolve: function () {
          return categories;
        }
      },

      sellers: {
        type: new GraphQLList(SellerType),
        resolve: function () {
          return sellers;
        }
      },
    }
  }
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => {
    return {
      addInCart: {
        type: new GraphQLList(ProductType),
        args: {
          productId: {type: GraphQLString}
        },
        resolve: function (parent, arg) {
          products.find(item => item.id === arg.productId).inCart = true;
          return products;
        }
      },

      addReview: {
        type: new GraphQLList(ProductType),
        args: {
          productId: {type: GraphQLString},
          review: {type: GraphQLString},
          stars: {type: GraphQLString}
        },
        resolve: function (parent, arg) {
          const product = products.find(item => item.id === arg.productId)
          product.reviews.push({
            id: `reviewId${product.reviews.length + 1}`,
            description: arg.review,
            stars: arg.stars
          })
          return products;
        }
      },
    }
  }
})

const schema = new GraphQLSchema({
  query,
  mutation
});

const app = express();
app.use('/', graphqlHTTP({ schema: schema, graphiql: true }));
app.listen(5000)
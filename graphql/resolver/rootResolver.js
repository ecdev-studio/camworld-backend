const {mergeResolvers} = require('@graphql-tools/merge');
const productResolver = require('./productResolver');
const categoryResolver = require('./categoryResolver');
const reviewResolver = require('./reviewResolver');
const userResolver = require('./userResolver');

const resolvers = [
  productResolver,
  categoryResolver,
  reviewResolver,
  userResolver,
];

module.exports = mergeResolvers(resolvers);

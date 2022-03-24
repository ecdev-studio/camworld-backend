const {mergeResolvers} = require('@graphql-tools/merge');
const productResolver = require('./productResolver');
const categoryResolver = require('./categoryResolver');
const reviewResolver = require('./reviewResolver');
const userResolver = require('./userResolver');
const mailResolver = require('./mailResolver');

const resolvers = [
  productResolver,
  categoryResolver,
  reviewResolver,
  userResolver,
  mailResolver,
];

module.exports = mergeResolvers(resolvers);
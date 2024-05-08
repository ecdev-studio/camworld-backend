const Product = require('../../models/Product');
const Review = require('../../models/Review');
const {calcMiddleReviewValue} = require('../../utils/helpers');

module.exports = {
  Mutation: {
    async addReview(root, {data}) {
      try {
        const review = await Review.create({
          name: data.name,
          email: data.email,
          title: data.title,
          review: data.review,
          rating: data.rating,
          productId: data.productId,
        });

        const product = await Product.findOne({
          where: {id: data.productId}, include: [{model: Review}],
        });
        const reviews = product.reviews;
        product.rating = calcMiddleReviewValue(reviews);
        product.numReviews = reviews.length;
        await product.save();
        return review;
      } catch (e) {
        console.log(e);
        throw new Error(`Fetch is not available: ${e}`);
      }
    },
  },
};

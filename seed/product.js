const Gallery = require('../models/Gallery');
const Highlight = require('../models/Highlight');
const Spec = require('../models/Spec');
const Product = require('../models/Product');
const Description = require('../models/Description');
const Review = require('../models/Review');
const {calcMiddleReviewValue} = require('../utils/helpers');
const {getCategory, createCategory} = require('./category');
const {getSubTaxonomy} = require('./taxonomy');
const {generateProductSlug} = require('../utils/helpers');

const self = module.exports = {
  async createProduct(dto) {
    let category = await getCategory({name: dto.category.name})
    if (!category) {
      category = await createCategory({name: dto.category.name})
    }
    const product = await Product.create({
      name: dto.name,
      slug: await generateProductSlug(dto.name, ''),
      image: dto.image.url,
      sku: dto.sku,
      youtubeEmbed: dto.youtubeEmbed,
      price: dto.price,
      categoryId: category.id,
      rating: 0,
      numReviews: 0,
    });
    if (dto.gallery) {
      for await (let item of dto.gallery) {
        await self.addNewGalleryImage({url: item.url, productId: product.id});
      }
    }
    if (dto.highlights) {
      for await (let item of dto.highlights) {
        await self.addNewHighlight({name: item.name, productId: product.id});
      }
    }
    if (dto.specs) {
      for await (let item of dto.specs) {
        await self.addNewSpec(
          {key: item.key, value: item.value, productId: product.id});
      }
    }
    if (dto.sub_taxonomies) {
      for await (let item of dto.sub_taxonomies) {
        const subTaxonomy = await getSubTaxonomy({name: item.name})
        await product.addSubTaxonomy(subTaxonomy.id);
      }
    }
    if (dto.description) {
      for await (let item of dto.description) {
        await self.addDescription(
          {title: item.title, value: item.value, productId: product.id}
        )
      }
    }
    if (dto.review) {
      for await (let item of dto.review) {
        await self.addReview({
          name: item.name,
          email: item.email,
          title: item.title,
          review: item.review,
          rating: item.rating,
          productId: product.id,
        })
      }
    }
  },

  async addNewGalleryImage(dto) {
    return await Gallery.create({
      url: dto.url,
      productId: dto.productId,
    });
  },

  async addNewHighlight(dto) {
    return await Highlight.create({
      name: dto.name,
      productId: dto.productId,
    });
  },

  async addNewSpec(dto) {
    return await Spec.create({
      key: dto.key,
      value: dto.value,
      productId: dto.productId,
    });
  },

  async addDescription(dto) {
    return await Description.create({
      title: dto.title,
      value: dto.value,
      productId: dto.productId,
    });
  },

  async addReview(dto) {
    const create = await Review.create({
      name: dto.name,
      email: dto.email,
      title: dto.title,
      review: dto.review,
      rating: dto.rating,
      productId: dto.productId,
    });
    const product = await Product.findOne({
      where: {id: dto.productId}, include: [{model: Review}],
    });
    const reviews = product.reviews;
    product.rating = calcMiddleReviewValue(reviews);
    product.numReviews = reviews.length;
    await product.save();
  },
}
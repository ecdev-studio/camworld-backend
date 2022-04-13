const Product = require('../../models/Product');
const Sequelize = require('sequelize');
const Category = require('../../models/Category');
const SubTaxonomy = require('../../models/SubTaxonomy');
const Op = Sequelize.Op;

module.exports = {
  Query: {
    async getProducts(root, {categoryId, subTaxonomy, limit, offset, sort}) {
      try {
        let category = {};
        let filters = {
          model: SubTaxonomy,
          required: false,
        };
        let price = {};
        let order = [
          ['createdAt', 'DESC'],
        ];
        if (categoryId) {
          category = {
            id: categoryId,
          };
        }
        if (subTaxonomy && subTaxonomy.length > 0) {
          filters = {
            where: {
              id: {
                [Op.or]: subTaxonomy,
              },
            },
            model: SubTaxonomy,
            required: true,
          };
        }
        if (sort && sort.sortBy) {
          if (sort.sortBy === 'low_to_high') {
            order = [
              ['price', 'ASC'],
            ];
          } else if (sort.sortBy === 'high_to_low') {
            order = [
              ['price', 'DESC'],
            ];
          }
        }
        if (sort && sort.priceMin && sort.priceMax) {
          price = {
            price: {
              [Op.gte]: sort.priceMin,
              [Op.lte]: sort.priceMax,
            },
          };
        }
        return await Product.findAndCountAll({
          order,
          where: price,
          include: [
            {
              model: Category,
              where: category,
            },
            filters,
            {
              all: true,
            },
          ],
          limit,
          offset,
          distinct: true,
        });
      } catch (e) {
        throw new Error('Fetch products is not available');
      }
    },
    async getProductById(root, {id}) {
      try {
        return await Product.findOne({
          where: {
            id,
          },
          include: [
            {
              all: true,
            },
          ],
        });
      } catch (e) {
        throw new Error(`Fetch product is not available. Error: ${e}`);
      }
    },
    async getProductBySlug(root, {slug}) {
      try {
        return await Product.findOne({
          where: {
            slug,
          },
          include: [
            {
              all: true,
            },
          ],
        });
      } catch (e) {
        throw new Error(`Fetch product is not available. Error: ${e}`);
      }
    },
    async getMaxMinPrice(root, {categoryId}) {
      try {
        const min = await Product.findOne({
          order: [
            ['price', 'ASC'],
          ],
          include: [
            {
              model: Category,
              where: {
                id: categoryId,
              },
            },
          ],
        });
        const max = await Product.findOne({
          order: [
            ['price', 'DESC'],
          ],
          include: [
            {
              model: Category,
              where: {
                id: categoryId,
              },
            },
          ],
        });

        return {
          min: min.price,
          max: max.price,
        };
      } catch (e) {
        throw new Error('Fetch is not available');
      }
    },
  },
};
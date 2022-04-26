const Category = require('../models/Category');
const {generateCategorySlug} = require('../utils/helpers');

module.exports = {
  async createCategory(dto) {
    return await Category.create({
      name: dto.name,
      slug: await generateCategorySlug(dto.name, ''),
    });
  },

  async getCategory(dto) {
    return await Category.findOne({
      where: {
        name: dto.name,
      },
    });
  }
};
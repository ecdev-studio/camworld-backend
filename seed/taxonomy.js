const Taxonomy = require('../models/Taxonomy');
const SubTaxonomy = require('../models/SubTaxonomy');
const {getCategory} = require('./category');

const self = module.exports = {
  async createTaxonomy(dto) {
    const taxonomy = await Taxonomy.create({
      name: dto.name,
    });
    if (dto.categories) {
      for await (let item of dto.categories) {
        const category = await getCategory({name: item.name})
        category.addTaxonomy(taxonomy.id)
      }
    }
  },

  async getTaxonomy(dto) {
    return await Taxonomy.findOne({
      where: {
        name: dto.name,
      },
    });
  },

  async createSubTaxonomy(dto) {
    const taxonomy = await self.getTaxonomy({name: dto.taxonomy.name});
    return await SubTaxonomy.create({
      name: dto.name,
      taxonomyId: taxonomy.id,
    });
  },

  async getSubTaxonomy(dto) {
    return await SubTaxonomy.findOne({
      where: {
        name: dto.name,
      },
    });
  },
};
const Product = require('../../models/Product');
const Sequelize = require('sequelize');
const Category = require('../../models/Category');
const SubTaxonomy = require('../../models/SubTaxonomy');
const Taxonomy = require('../../models/Taxonomy');
const Op = Sequelize.Op;

module.exports = {
	Query: {
		async getCategories(root) {
			try {
				return await Category.findAll({
					order: [
						['id', 'ASC'],
					],
					include: [
						{
							all: true,
						}],
				});
			} catch (e) {
				throw new Error('Fetch is not available');
			}
		},

		async getCategory(root, {id}) {
			try {
				return await Category.findOne({
					where: {
						id: id,
					},
					include: [
						{
							model: Taxonomy,
							include: [
								{
									model: SubTaxonomy,
									include: [
										{
											model: Product,
											limit: 1,
										}
									],
								},
							],
						},
					],
				});
			} catch (e) {
				throw new Error('Fetch is not available');
			}
		},
	},
};
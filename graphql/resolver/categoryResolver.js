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
				console.log(e);
				throw new Error(`Fetch is not available: ${e}`);
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
							required: false,
							include: [
								{
									model: SubTaxonomy,
									required: false,
									include: [
										{
											model: Product,
											where: {
												categoryId: id
											}
										}
									],
								},
							],
						},
					],
				});
			} catch (e) {
				console.log(e);
				throw new Error(`Fetch is not available: ${e}`);
			}
		},
	},
};

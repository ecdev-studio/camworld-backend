require('./models/Associations');
const User = require('./models/User');
const Role = require('./models/Role');
const UserRole = require('./models/UserRole');
const Product = require('./models/Product');
const Description = require('./models/Description');
const Category = require('./models/Category');
const Taxonomy = require('./models/Taxonomy');
const SubTaxonomy = require('./models/SubTaxonomy');
const ProductSubTaxonomy = require('./models/ProductSubTaxonomy');
const CategoryTaxonomy = require('./models/CategoryTaxonomy');
const Gallery = require('./models/Gallery');
const Highlight = require('./models/Highlight');
const Review = require('./models/Review');
const Spec = require('./models/Spec');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const sequelize = require('./utils/database');
const {createSubTaxonomy, createTaxonomy} = require('./seed/taxonomy');
const {createProduct} = require('./seed/product');
const {createCategory} = require('./seed/category');
const SEED_URL = process.env.SEED_URL;

async function db() {
  try {
    await sequelize.sync();
  } catch (e) {
    console.log(e);
  }
}

db();
const importData = async () => {
  try {
    const categories = require('./data/categories');
    const products = require('./data/products');
    const taxonomies = require('./data/taxonomies');
    const subTaxonomies = require('./data/sub-taxonomies');
    // const categories = await axios.get(`${SEED_URL}/categories`)
    // const taxonomies = await axios.get(`${SEED_URL}/taxonomies`)
    // const subTaxonomies = await axios.get(`${SEED_URL}/sub-taxonomies`)
    // const products = await axios.get(`${SEED_URL}/products`)
    for await (let item of categories) {
      await createCategory(item);
    }
    for await (let item of taxonomies) {
      await createTaxonomy(item);
    }
    for await (let item of subTaxonomies) {
      await createSubTaxonomy(item);
    }
    for await (let item of products) {
      await createProduct(item);
    }
    console.log('Data Imported!');
    process.exit();
  } catch (e) {
    console.log(e);
    process.exit();
  }
};

const destroyData = async () => {
  try {
    await User.destroy({where: {}});
    await Role.destroy({where: {}});
    await UserRole.destroy({where: {}});
    await Product.destroy({where: {}});
    await Category.destroy({where: {}});
    await Taxonomy.destroy({where: {}});
    await SubTaxonomy.destroy({where: {}});
    await ProductSubTaxonomy.destroy({where: {}});
    await Gallery.destroy({where: {}});
    await Highlight.destroy({where: {}});
    await Review.destroy({where: {}});
    await Spec.destroy({where: {}});
    await CategoryTaxonomy.destroy({where: {}});
    await Description.destroy({where: {}});
    console.log('Data Destroyed!');
    process.exit();
  } catch (e) {
    console.log(e);
  }
};

if (process.argv[2] === '-d') {
  destroyData().then();
} else {
  importData().then();
}
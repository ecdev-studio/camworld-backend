const {buildSchema} = require('graphql');

module.exports = buildSchema(` 
    type Product {
      id: Int
      name: String
      slug: String
      image: String
      description: String
      price: Float
      categoryId: Int
      sku: String
      youtubeEmbed: String
      rating: Int
      numReviews: Int
      category: Category
      subTaxonomies: [SubTaxonomy]
      galleries: [Gallery]
      highlights: [Highlight]
      reviews: [Review]
      specs: [Spec]
    }
    
    type CountProd {
      rows: [Product]
      count: Int
    }
    
    type Category {
      id: Int
      name: String
      slug: String
      taxonomies: [Taxonomy]
    }
    
    type Taxonomy {
      id: Int
      name: String
      subTaxonomies: [SubTaxonomy]
    }
    
    type SubTaxonomy {
      id: Int
      name: String
      taxonomyId: Int
    }
    
    type Gallery {
      id: Int
      url: String
      productId: Int
    }
    
    type Highlight {
      id: Int
      name: String
      productId: Int
    }
    
    type Review {
      id: Int
      name: String
      email: String
      title: String
      review: String
      rating: Int
      productId: Int
      createdAt:String
    }
    
    type Spec {
      id: Int
      key: String
      value: String
      productId: Int
    }
    
    type User {
      id: Int
      email: String
      token: String
    }
    
    input sortItem {
      sortBy: String
      priceMin: Float
      priceMax: Float
    }
    
    input ReviewInput {
      name: String!
      email: String!
      title: String!
      review: String!
      rating: Int
      productId: Int!
   }
   
   input UserInput {
      email: String!, 
      password: String, 
   }
   
   input MailInput {
      name: String!
      email: String!
      website: String
      message: String
      radioGroup: String
      token: String
   }
    
    type Query {
      getProducts(categoryId: Int, subTaxonomy: [Int], limit: Int, offset: Int, sort: sortItem): CountProd
      getCategories: [Category]
      getCategory(id: Int!): Category
      getProductById(id: Int!): Product!
    }
    
    type Mutation {
      addReview(data: ReviewInput!): Review
      sendMail(data: MailInput!): String
      registerUser(data: UserInput!): User
      loginUser(data: UserInput!): User
      updateUser(data: UserInput!): User
    }
`);

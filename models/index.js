// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id'
})

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id'
})

Product.belongsTo(Tag, {
  foreignKey: 'tag_id'
})

Tag.hasMany(Product, {
  foreignKey: 'tag_id'
})

//STUDENT NOTE: THESE ASSOCIATIONS WERE MISSING FROM THE ASSIGNMENT INSTRUCTIONS 
// =====================================
Product.hasMany(ProductTag, {
  foreignKey: 'product_id'
});

ProductTag.belongsTo(Product, {
  foreignKey: 'product_id'
})

Tag.hasMany(ProductTag, {
  foreign_key: 'tag_id'
})

ProductTag.belongsTo(Tag, {
  foreignKey: 'tag_id'
})
//=======================================

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  as: 'associated_tags',
  foreignKey: 'product_id'
})

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  as: 'associated_products',
  foreignKey: 'tag_id'
})


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};




// product_name has tags
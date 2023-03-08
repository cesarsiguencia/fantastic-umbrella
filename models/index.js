// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

Product.belongsTo(Category, {
  foreign_key: 'category_id'
})

Category.hasMany(Product, {
  foreign_key: 'category_id'
})

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

Product.belongsToMany(Tag, {
  through: ProductTag,
  as: 'associated_tags',
  foreignKey: 'product_id'
})

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
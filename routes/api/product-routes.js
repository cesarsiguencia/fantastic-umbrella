const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

router.get('/', (req, res) => {
  Product.findAll({
    attributes: ['id', 'product_name', 'price', 'stock', 'category_id', 'tag_id'],
    include: [
      {
        model: Category,
        attributes: ['id', 'category_name'],
        as: 'category'
      },
      {
        model: Tag,
        attributes: ['id', 'tag_name'],
        through: ProductTag,
        as: 'associated_tags',
      }
    ]

  })
    .then(dbProducts => res.json(dbProducts))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.get('/:id', (req, res) => {
  Product.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
    include: [
      {
        model: Category,
        attributes: ['id', 'category_name']
      },
      {
        model: Tag,
        attributes: ['id', 'tag_name'],
        through: ProductTag,
        as: 'associated_tags',
      }
    ]
  })
    .then(dbProducts => res.json(dbProducts))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.post('/', (req, res) => {
  Product.create({
    product_name: req.body.product_name,
    price: req.body.price,
    stock: req.body.stock,
    category_id: req.body.category_id,
  })
    .then((productTagIds) =>
      res.status(200).json(productTagIds)
    )
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/tags', (req, res) => {
  ProductTag.create({
    product_id: req.body.product_id,
    tag_id: req.body.tag_id
  }).then(() => {
    return Product.findOne({
      where: {
        id: req.body.product_id
      },
      attributes: ['id', 'product_name']
    })
  }).then(dbProductTag => res.json(dbProductTag))
    .catch(err => {
      console.log(err)
      res.status(400).json(err)
    })
})

router.put('/:id', (req, res) => {
  Product.update(
    {
      product_name: req.body.product_name,
      price: req.body.price,
      stock: req.body.stock,
      category_id: req.body.category_id
    },
    {
      where: {
        id: req.params.id,
      },
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      res.status(400).json(err);
    });
});



router.delete('/:id', (req, res) => {
  Product.destroy({
    where: {
      id: req.params.id
    }
  }).then(
    ProductTag.destroy({
      where: {
        product_id: req.params.id
      }
    })
  )
    .then(dbProducts => {
      if (!dbProducts) {
        res.status(404).json({ message: 'No product found with this id' });
        return;
      }
      res.json(dbProducts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

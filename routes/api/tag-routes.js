const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', (req, res) => {
  Tag.findAll({
    attributes: ['id', 'tag_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        through: ProductTag,
        as: 'associated_products',
      }
    ]
  })
    .then(dbTags => res.json(dbTags))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    attributes: ['id', 'tag_name'],
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        through: ProductTag,
        as: 'associated_products',
      },
    ]
  })
    .then(dbTags => {
      if (!dbTags) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      res.json(dbTags)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
    .then(dbTags => res.json(dbTags))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});

router.put('/:id', (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbTags => {
      if (!dbTags) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      res.json(dbTags);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then(
    ProductTag.destroy({
      where: {
        tag_id: req.params.id
      }
    })
  )
  .then(dbTags => {
    if (!dbTags) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.json(dbTags);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;

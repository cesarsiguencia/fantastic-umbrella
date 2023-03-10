const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

router.get('/', (req, res) => {
  Product.findAll({
<<<<<<< HEAD
    attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
=======
    attributes: ['id', 'product_name', 'price', 'stock','category_id','tag_id'],
>>>>>>> COMMENTS
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
<<<<<<< HEAD
=======
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */

    // the problem is how do we place a category_id for the product if the req.body isn't even taking it

>>>>>>> COMMENTS
  Product.create({
    product_name: req.body.product_name,
    price: req.body.price,
    stock: req.body.stock,
    category_id: req.body.category_id,
    // tag_id: req.body.tag_id
  })
<<<<<<< HEAD
    .then((product) => {
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
=======

  
    // .then((product) => {
    //   const tagsArray = [req.body.tag_id]
      
    //   // if there's product tags, we need to create pairings to bulk create in the ProductTag model
    //   if (tagsArray.length) {
    //     const productTagIdArr = tagsArray.map((tagId) => {
    //       return {
    //         product_id: product.id,
    //         tag_id: tagId,
    //       };
    //     });
    //     return ProductTag.bulkCreate(productTagIdArr);
    //   }
    //   // if no product tags, just respond
    //   res.status(200).json(product);
    // })



    .then((productTagIds) => 

      res.status(200).json(productTagIds)
  
    
    
   )
>>>>>>> COMMENTS
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

<<<<<<< HEAD
=======
router.put('/tags', (req,res) => {
  ProductTag.create({
    product_id: req.body.product_id,
    tag_id: req.body.tag_id
  }).then(() => {
    return Product.findOne({
      where: {
        id: req.body.product_id
      },
      attributes: ['id','product_name']
    })
  }).then(dbProductTag => res.json(dbProductTag))
  .catch(err => {
    console.log(err)
    res.status(400).json(err)
  })
 
})

// update product
>>>>>>> COMMENTS
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
<<<<<<< HEAD
        id: req.params.id,
      },
    })
    .then((product) => {
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
=======
      id: req.params.id,
    },
  })
    // .then((product) => {
    //   // find all associated tags from ProductTag
    //   return ProductTag.findAll({ where: { product_id: req.params.id } });
    // })
    // .then((productTags) => {
    //   // get list of current tag_ids
    //   const productTagIds = productTags.map(({ tag_id }) => tag_id);
    //   // create filtered list of new tag_ids
    //   const newProductTags = req.body.tagIds
    //     .filter((tag_id) => !productTagIds.includes(tag_id))
    //     .map((tag_id) => {
    //       return {
    //         product_id: req.params.id,
    //         tag_id,
    //       };
    //     });
    //   // figure out which ones to remove
    //   const productTagsToRemove = productTags
    //     .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
    //     .map(({ id }) => id);

    //   // run both actions
    //   return Promise.all([
    //     ProductTag.destroy({ where: { id: productTagsToRemove } }),
    //     ProductTag.bulkCreate(newProductTags),
    //   ]);
    // })
>>>>>>> COMMENTS
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
<<<<<<< HEAD
  })
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
=======
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
>>>>>>> COMMENTS
});

module.exports = router;

const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//finds all categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    });
    res.status(200).json(categoryData)
  } catch(err) {
    res.status(500).json(err);
  }
});

//gets category by id
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id,{
    include: [{ model: Product }],
    });
    if(!categoryData) {
      res.status(404).json({message: 'No category found'});
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//post new category to db
router.post('/', async (req, res) => {
  try {
    const data = await Category.create(req.body);
    res.status(200).json(data);
  } catch(err) {
    res.status(400).json(err);  
  }
});

//update category by id
router.put('/:id', async (req, res) => {
  try {
    const data = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!data) {
      res.status(404).json({message: 'No category found'});
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

//deletes category based on id 
router.delete('/:id', async (req, res) => {
  try {
    const data = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!data) {
      res.status(404).json({message: 'No category found'});
      return;
    }
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;

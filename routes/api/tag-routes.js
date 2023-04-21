const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

//gets all tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [
        {model: Product},
      ],
    });
    if (!tagData) {
      res.status(404).json({message: 'No tag found'});
    }
    res.status(200).json(tagData);
  } catch {
    res.status(500).json(err);
  }  
});

//gets tag by id
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id,{
      include: [
        {model: Product},
      ],
    });
    if(!tagData) {
      res.status(404).json({message: 'No tag found'});
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//adds tag
router.post('/', async (req, res) => {
  try {
    const data = await Tag.create(req.body);
    res.status(200).json(data);
  } catch(err) {
    res.status(400).json(err);  
  }
});

//updates tag by id
router.put('/:id', async (req, res) => {
  try {
    const data = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!data) {
      res.status(404).json({message: 'No tag found'});
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

//deletes tag by id
router.delete('/:id', async (req, res) => {
  try {
    const data = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!data) {
      res.status(404).json({message: 'No tag found'});
      return;
    }
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;

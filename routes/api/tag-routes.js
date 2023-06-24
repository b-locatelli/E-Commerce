const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
 
  try {
    const tagData = await Category.findAll({
      include: [{ model: Product }]
    });
    if(!tagData) {
      res.status(404).json({ message: 'No tags found'})
      return;
    }
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error)
  }
});

router.get('/:id', async (req, res) => {
  
  try {
    const tagData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if(!tagData) {
      res.status(404).json({ message: 'Tag id cannot be found'})
      return;
    }
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error)
  }
});

router.post('/', async (req, res) => {
 
  try {
    const newTag = await Category.create(req.body);
    res.status(200).json(newTag);
  } catch (error) {
    res.status(400).json(error)
  }
});

router.put('/:id', async (req, res) => {
 
  try {
    const updateTag = await Category.update({
      where: {
        id: req.params.id
      }
    });
    if(!updateTag) {
      res.status(404).json({ message: 'Tag id cannot be found'})
    }
    res.status(200).json(updateTag);
  } catch (error) {
    res.status(500).json(error)
  }
});

router.delete('/:id', async (req, res) => {

  try {
    const deleteTag = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if(!deleteTag) {
      res.status(404).json({ message: 'Tag id cannot be found'})
    }
    res.status(200).json(deleteTag);
  } catch (error) {
    res.status(500).json(error)
  }
});

module.exports = router;

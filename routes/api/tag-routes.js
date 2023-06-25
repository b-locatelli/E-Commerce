const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
 
  try {
    const tagData = await Tag.findAll({
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
    const tagData = await Tag.findByPk(req.params.id, {
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
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (error) {
    res.status(400).json(error)
  }
});

router.put('/:id', async (req, res) => {
 
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if(updateTag[0] === [0]) {
      return res.status(404).json({ message: 'Tag id cannot be found'})
    }
    res.status(200).json(updateTag);
  } catch (error) {
    res.status(500).json(error)
  }
});

router.delete('/:id', async (req, res) => {

  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if(!deleteTag) {
     return res.status(404).json({ message: 'Tag id cannot be found'})
    }
    res.status(200).json(deleteTag);
  } catch (error) {
    res.status(500).json(error)
  }
});

module.exports = router;

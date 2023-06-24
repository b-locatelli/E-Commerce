const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    });
    if(!categoryData) {
      res.status(404).json({ message: 'No categories found'})
      return;
    }
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error)
  }
});

router.get('/:id', async (req, res) => {

  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if(!categoryData) {
      res.status(404).json({ message: 'Category id cannot be found'})
      return;
    }
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error)
  }
});

router.post('/', async (req, res) => {
  
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(400).json(error)
  }
});

router.put('/:id', async (req, res) => {
 
  try {
    const updateCategory = await Category.update({
      id: req.params.id,
      category_name: req.body.category_name
    }, {
      where: {
        id: req.params.id
      }
    });
    if(!updateCategory) {
      res.status(404).json({ message: 'Category id cannot be found'})
    }
    res.status(200).json(updateCategory);
  } catch (error) {
    res.status(500).json(error)
  }
});

router.delete('/:id', async (req, res) => {
  
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if(!deleteCategory) {
      res.status(404).json({ message: 'Category id cannot be found'})
    }
    res.status(200).json(deleteCategory);
  } catch (error) {
    res.status(500).json(error)
  }
});

module.exports = router;

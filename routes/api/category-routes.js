const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  try {
  const categories = await Category.findAll({
    include: [{model: Product}],
  });
  res.status(200).json(categories);
} catch (err) {
  res.status(500).json(err);
}
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product}],
    });
    res.status(200).json(category);
  } catch (err) {
    res.status(404).json({ message: "No Category with that ID"});
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res(200).json(newCategory);
  } catch (err) {
    res(400).json(err);
  }
  // create a new category
});

router.put('/:id', (req, res) => {
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res(200).json(updateCategory);
  }
  catch (err) {
    res(400).json({ message: "No Category with that ID"});
  }    
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  try {
  const deleteCategory = await Category.destroy({
    where: {
      id: req.params.id,
    }
  });
  res(200).json({ message: "Category has been removed."})
} catch (err) {
  res(400).json({ message: "No Category with that ID"})
}
  // delete a category by its `id` value
});

module.exports = router;

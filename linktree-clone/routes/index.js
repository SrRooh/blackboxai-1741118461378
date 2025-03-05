const express = require('express');
const router = express.Router();
const { Link } = require('../models');

// Public profile page - shows all active links
router.get('/', async (req, res) => {
  try {
    const links = await Link.findAll({
        attributes: ['id', 'title', 'url', 'icon', 'backgroundColor'], // Include backgroundColor
      where: { active: true },
      order: [['order', 'ASC']]
    });
    
    res.render('index', { 
      links,
      title: 'My LinkTree Clone',
      description: 'All my important links in one place'
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { 
      message: 'Unable to load links at this time.'
    });
  }
});

// Route to edit a link
router.post('/edit/:id', async (req, res) => {
  const { title, url, icon, backgroundColor } = req.body;
  try {
    const link = await Link.findByPk(req.params.id);
    if (!link) {
      return res.status(404).json({ error: 'Link not found' });
    }
    await link.update({ title, url, icon, backgroundColor });
    res.json({ success: true, link });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Track link clicks (optional feature)
router.post('/click/:id', async (req, res) => {
  try {
    const link = await Link.findByPk(req.params.id);
    if (!link) {
      return res.status(404).json({ error: 'Link not found' });
    }
    // You could add click tracking logic here
    res.json({ success: true, url: link.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

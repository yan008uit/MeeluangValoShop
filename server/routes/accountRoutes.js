const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from('accounts')
        .select(`
      id,
      username,
      rank,
      price,
      weapons (
        id,
        type,
        skin_name,
        image_url
      )
    `)
        .eq('id', id)
        .single();

    if (error) return res.status(404).json(error);
    res.json(data);
});

module.exports = router;
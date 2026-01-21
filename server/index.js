const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

/**
 * SHOP PAGE
 * GET /api/accounts
 */
app.get('/api/accounts', async (req, res) => {
    const { data, error } = await supabase
        .from('shop_accounts')
        .select('*')
        .order('price', { ascending: true });

    if (error) return res.status(500).json(error);
    res.json(data);
});

/**
 * ACCOUNT DETAIL
 * GET /api/accounts/:id
 */
app.get('/api/accounts/:id', async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from('accounts')
        .select(`
            id,
            username,
            rank,
            price,
            image_url,
            vp,
            rp,
            rename_available_date,
            premier_locked,
            warranty,
            account_weapons (
                weapons (
                    id,
                    weapon_type,
                    set_name,
                    description,
                    image_url
                )
            )
        `)
        .eq('id', id)
        .single();

    if (error) return res.status(404).json(error);

    // flatten weapons
    const weapons = data.account_weapons.map(aw => aw.weapons);

    res.json({
        ...data,
        weapons
    });
});

/* ===== SERVE REACT ===== */
const clientBuildPath = path.join(__dirname, '../client/build');
app.use(express.static(clientBuildPath));

app.use((req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
const express = require('express');
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

    const { data: account, error: accountError } =
        await supabase.from('accounts').select('*').eq('id', id).single();

    if (accountError) return res.status(404).json(accountError);

    const { data: weapons } =
        await supabase.from('weapons').select('*').eq('account_id', id);

    res.json({ ...account, weapons });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
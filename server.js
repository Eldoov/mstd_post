const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

const MASTODON_API_URL = 'https://mastodon.social/api/v1/statuses';
const ACCESS_TOKEN = 'RcOn3COmNK56tUXakanY1WSUo-AgagUdOKeSQqQEhRU'; // 替换为你的Mastodon API访问令牌

app.use(express.json());

app.post('/post-to-mastodon', async (req, res) => {
    const status = req.body.status;

    const response = await fetch(MASTODON_API_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: status })
    });

    if (response.ok) {
        res.status(200).send('Post successful');
    } else {
        res.status(response.status).send('Failed to post');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

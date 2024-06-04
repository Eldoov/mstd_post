const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

const MASTODON_API_URL = 'https://mastodon.social/api/v1/statuses';
const ACCESS_TOKEN = process.env.ACCESS_TOKEN; // 使用环境变量获取访问令牌

app.use(express.json());

// 添加处理根路径请求的GET路由
app.get('/', (req, res) => {
    res.send('Welcome to the Mastodon Post App!');
});

app.post('/post-to-mastodon', async (req, res) => {
    const status = req.body.status;

    try {
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
            const errorText = await response.text();
            console.error('Failed to post:', errorText);
            res.status(response.status).send(`Failed to post: ${errorText}`);
        }
    } catch (error) {
        console.error('Error posting to Mastodon:', error);
        res.status(500).send('Error posting to Mastodon');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

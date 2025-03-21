const express = require('express');
const axios = require('axios');
const { authMiddleware } = require('./auth');

const router = express.Router();
const BASE_URL = 'http://20.244.56.144/test';
const USERS_URL = `${BASE_URL}/users`;

// Fetch Top Users (Based on Post Count)
router.get('/top', authMiddleware, async (req, res) => {
    try {
        const { data } = await axios.get(USERS_URL, {
            headers: { Authorization: `Bearer ${req.token}` }
        });

        let usersArray = Object.entries(data.users || {}).map(([id, name]) => ({
            id,
            name,
            postCount: Math.floor(Math.random() * 100) // Replace with actual post count
        }));

        const topUsers = usersArray.sort((a, b) => b.postCount - a.postCount).slice(0, 5);
        res.json(topUsers);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch top users", details: error.response?.data || error.message });
    }
});

module.exports = router;

const express = require('express');
const axios = require('axios');
const { authMiddleware } = require('./auth');

const router = express.Router();
const BASE_URL = 'http://20.244.56.144/test';
const USERS_URL = `${BASE_URL}/users`;
const POSTS_URL = `${BASE_URL}/posts`;

// Fetch Most Popular Posts (Based on Comment Count)
router.get("/popular", authMiddleware, async (req, res) => {
    try {
        console.log("🔹 Fetching users...");
        const usersResponse = await axios.get(USERS_URL, {
            headers: { Authorization: `Bearer ${req.token}` }
        });

        const users = usersResponse.data.users;
        if (!users || Object.keys(users).length === 0) {
            return res.status(404).json({ error: "No users found" });
        }

        let allPosts = [];
        for (const userId of Object.keys(users)) {
            try {
                console.log(`🔹 Fetching posts for User ID: ${userId}`);
                const postsResponse = await axios.get(`${USERS_URL}/${userId}/posts`, {
                    headers: { Authorization: `Bearer ${req.token}` }
                });

                allPosts = allPosts.concat(postsResponse.data.posts || []);
            } catch (postError) {
                console.warn(`⚠️ Failed to fetch posts for User ID ${userId}:`, postError.message);
            }
        }

        console.log(`✅ Total Posts Fetched: ${allPosts.length}`);
        if (allPosts.length === 0) {
            return res.json({ popularPosts: [] });
        }

        let postCommentCount = [];
        for (const post of allPosts) {
            try {
                console.log(`🔹 Fetching comments for Post ID: ${post.id}`);
                const commentsResponse = await axios.get(`${POSTS_URL}/${post.id}/comments`, {
                    headers: { Authorization: `Bearer ${req.token}` }
                });

                const totalComments = commentsResponse.data.comments?.length || 0;
                postCommentCount.push({ ...post, totalComments });
            } catch (commentError) {
                console.warn(`⚠️ Failed to fetch comments for Post ID ${post.id}:`, commentError.message);
            }
        }

        const maxComments = Math.max(...postCommentCount.map(p => p.totalComments), 0);
        if (maxComments === 0) {
            return res.json({ popularPosts: [] });
        }

        const mostPopularPosts = postCommentCount.filter(p => p.totalComments === maxComments);
        return res.json({ popularPosts: mostPopularPosts });

    } catch (error) {
        console.error("❌ Error fetching popular posts:", error);
        return res.status(500).json({ error: "Failed to fetch popular posts", details: error.message });
    }
});

module.exports = router;

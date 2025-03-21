const express = require('express');
const { getNewToken } = require('./auth');
const topUsersRoutes = require('./topUsers');
const topPostsRoutes = require('./topPosts');

const app = express();
app.use(express.json());

// Fetch Token on Server Start
app.listen(3000, async () => {
    console.log(`Server running on http://localhost:3000`);
    await getNewToken(); // Ensure token is fetched
});

// Routes
app.use('/users', topUsersRoutes);
app.use('/posts', topPostsRoutes);

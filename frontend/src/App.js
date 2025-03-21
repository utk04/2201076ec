import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TopUsers from "./components/TopUsers";
import TrendingPosts from "./components/TrendingPosts";
import Feed from "./components/Feed";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/top-users" element={<TopUsers />} />
        <Route path="/trending-posts" element={<TrendingPosts />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </Router>
  );
}

export default App;

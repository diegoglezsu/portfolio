import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Post from "./components/Post";
import About from "./pages/About";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Search from "./pages/Search";
import Tag from "./pages/Tag";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="posts" element={<Posts />} />
          <Route path="posts/:slug" element={<Post />} />
          <Route path="posts/:slug/*" element={<Post />} />
          <Route path="tags/:tag" element={<Tag />} />
          <Route path="search" element={<Search />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

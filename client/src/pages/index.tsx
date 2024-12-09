import { BrowserRouter, Routes, Route } from "react-router-dom";
/** importing our pages */
import { Posts } from "@/pages/Posts.tsx";
import { Post } from "@/pages/Post.tsx";

export default function Pages() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/post/:postId" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
}

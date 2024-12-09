import { Post } from "@/__generated__/types.ts";
import { Link } from "react-router-dom";

export const PostDetail: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div>
      <h1>{post.id}</h1>
      <h1>{post.title}</h1>
      <h1>{post.content}</h1>
      <h1>{post.addedAt}</h1>
      <h1>{post.user?.username}</h1>
      <h1>{post.user?.email}</h1>

      <Link to={"/"}>Back</Link>
    </div>
  );
};

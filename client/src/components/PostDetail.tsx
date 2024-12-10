import { Post } from "@/__generated__/types.ts";
import { Link } from "react-router-dom";
import { PostCard } from "@/components/PostCard.tsx";

export const PostDetail: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="mx-auto max-w-2xl">
      <Link to={"/"}>Back</Link>
      <PostCard post={post} />
    </div>
  );
};

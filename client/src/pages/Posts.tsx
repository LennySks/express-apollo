import { PostCard } from "@/components/PostCard.tsx";
import { gql, useQuery } from "@apollo/client";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import { Post } from "@/__generated__/graphql.ts";

export const GET_POSTS = gql(`
query Posts {
  posts {
    id
    title
    content
    addedAt
    user {
      username
    }
  }
}`);

export const Posts: React.FC = () => {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="mt-5">
      <div className="flex flex-col gap-4">
        {data.posts.map((post: Post) => (
          <Link to={`/post/${post.id}`} key={post.id}>
            <PostCard post={post} />
          </Link>
        ))}
      </div>
      <div className="flex justify-center">
        <Button variant={"outline"} className="bg-blue-300 mt-5">
          Show more
        </Button>
      </div>
    </div>
  );
};

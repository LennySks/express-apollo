import { PostCard } from "@/components/PostCard.tsx";
import { gql, useQuery } from "@apollo/client";

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
    <div className="flex flex-col gap-4">
      {data.posts.map((post: any) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

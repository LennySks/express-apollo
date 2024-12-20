import { PostCard } from "@/components/PostCard.tsx";
import { useQuery } from "@apollo/client";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import { Post } from "@/__generated__/graphql.ts";
import { useState } from "react";
import { GET_POSTS } from "@/graphql/queries.ts";
import { CreatePostModal } from "@/components/CreatePostModal.tsx";

export const Posts: React.FC = () => {
  const [isFetchingMore, setIsFetchingMore] = useState(false); // Track "fetchMore" state

  const limit = 3;
  const { loading, error, data, fetchMore } = useQuery(GET_POSTS, {
    variables: {
      offset: 0,
      limit,
    },
    notifyOnNetworkStatusChange: true,
  });

  const loadMorePosts = () => {
    setIsFetchingMore(true); // Set fetchMore state
    fetchMore({
      variables: {
        offset: data?.posts?.length || 0,
        limit,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        setIsFetchingMore(false); // Reset fetchMore state
        if (!fetchMoreResult) return prevResult;

        return {
          posts: [...prevResult.posts, ...fetchMoreResult.posts], // Append new posts
        };
      },
    }).catch(() => setIsFetchingMore(false)); // Handle errors
  };

  if (!data && loading) return <p>Loading...</p>; // Only for the first load
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="mt-5">
      <div className="flex flex-col gap-4 w-15">
        {data?.posts?.map((post: Post) => (
          <Link to={`/post/${post.id}`} key={post.id}>
            <PostCard post={post} />
          </Link>
        ))}
      </div>
      <div className="mt-5">
        <div className="flex flex-col items-center justify-items-center gap-3">
          <Button
            type="button"
            className="bg-blue-300 "
            onClick={loadMorePosts}
            disabled={isFetchingMore}
          >
            {isFetchingMore ? "Loading more..." : "Show more"}
          </Button>
          <CreatePostModal />
        </div>
      </div>
    </div>
  );
};

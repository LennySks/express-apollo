import { PostCard } from "@/components/PostCard.tsx";
import { gql, useQuery } from "@apollo/client";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import { Post } from "@/__generated__/graphql.ts";
import { useState } from "react";

const GET_POSTS = gql(`
  query Posts($offset: Int, $limit: Int) {
    posts(offset: $offset, limit: $limit) {
      id
      title
      content
      addedAt
      user {
        username
      }
    }
  }
`);

export const Posts: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const limit = 3;
  const { loading, error, data, fetchMore } = useQuery(GET_POSTS, {
    variables: {
      offset,
      limit,
    },
  });

  const loadMorePosts = () => {
    event.preventDefault();
    fetchMore({
      variables: {
        offset: offset + limit,
        limit,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;

        return {
          ...prevResult,
          posts: [...prevResult.posts, ...fetchMoreResult.posts], // Append new posts to the old ones
        };
      },
    }).then(() => {
      setOffset(offset + limit);
    });
  };

  if (loading) return <p>Loading...</p>;
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
      <div className="flex justify-center">
        <Button
          variant={"outline"}
          type={"button"}
          className="bg-blue-300 mt-5"
          onClick={loadMorePosts}
        >
          Show more
        </Button>
      </div>
    </div>
  );
};

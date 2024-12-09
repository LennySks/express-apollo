import React from "react";
import { gql } from "@/__generated__";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { PostDetail } from "@/components/PostDetail";

const GET_POST = gql(`
query GetPost($postId: ID!) {
  post(id: $postId) {
    id
    title
    content
    addedAt
    user {
      id
      username
      email
    }
  }
}
`);

export const Post: React.FC = () => {
  const { postId = "" } = useParams();

  const { loading, error, data } = useQuery(GET_POST, {
    variables: { postId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data?.post ? <PostDetail post={data.post} /> : <p>Post not found</p>}
    </div>
  );
};

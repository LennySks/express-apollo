import { gql } from "@apollo/client"; // Correct import

export const GET_POSTS = gql(`
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

export const GET_POST = gql(`
query GetPost($postId: ID!) {
  post(id: $postId) {
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

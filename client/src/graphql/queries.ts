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

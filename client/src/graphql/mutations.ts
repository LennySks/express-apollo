import { gql } from "@apollo/client"; // Correct import

export const DELETE_POST = gql(`
mutation Mutation($deletePostId: ID!) {
  deletePost(id: $deletePostId) {
    code
    success
    message
  }
}`);

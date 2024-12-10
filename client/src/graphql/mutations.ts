import { gql } from "@apollo/client"; // Correct import

export const DELETE_POST = gql(`
mutation Mutation($deletePostId: ID!) {
  deletePost(id: $deletePostId) {
    code
    success
    message
  }
}`);

export const CREATE_POST = gql(`
mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
    code
    success
    message
    post {
      id
      title
      content
      authorId
      addedAt
    }
  }
}
`);

export const UPDATE_POST = gql(`
mutation UpdatePost($updatePostId: ID!, $input: UpdatePostInput!) {
  updatePost(id: $updatePostId, input: $input) {
    code
    success
    message
    post {
      title
      content
      authorId
    }
  }
}
`);

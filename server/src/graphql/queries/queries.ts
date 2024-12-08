import gql from "graphql-tag"

export const queries = {
    // Getlist of users
    users: gql`
        query users {
            users {
                id
                username
                email
            }
        }
    `,
    // Get user by id
    user: gql`
        query user($id: ID!) {
            user(id: $id) {
                id
                username
                email
            }
        }
    `,
}

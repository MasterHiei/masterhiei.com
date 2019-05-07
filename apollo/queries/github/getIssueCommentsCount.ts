import gql from 'graphql-tag';

const query = gql`
  query getIssueCommentsCount(
    $owner: String!
    $repo: String!
    $labels: [String!]!
  ) {
    repository(owner: $owner, name: $repo) {
      issues(labels: $labels, first: 1) {
        edges {
          node {
            comments {
              totalCount
            }
          }
        }
      }
    }
  }
`;

export default query;

import gql from 'graphql-tag';
import { TAG_FRAGMENT } from '@graphql/operations/fragment/tag';
import { RESULT_INFO_FRAGMENT } from '@graphql/operations/fragment/result-info';

export const TAG_LIST_QUERY = gql`
  query tagsList($page: Int, $itemsPage: Int) {
    tags(page: $page, itemsPage: $itemsPage) {
      info {
        ...ResultInfoObject
      }
      status
      message
      tags {
        ...TagObject
      }
    }
  }
  ${TAG_FRAGMENT}
  ${RESULT_INFO_FRAGMENT}
`;

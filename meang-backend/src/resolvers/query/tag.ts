import { IResolvers } from 'graphql-tools';
import TagService from '../../services/tag.service';

const resolversTagsQuery: IResolvers = {
  Query: {
    genres(_, variables, context) {
      return new TagService(_, { pagination: variables }, context).items();
    },
    genre(_, { id }, context) {
      return new TagService(_, { id }, context).item();
    },
  },
};

export default resolversTagsQuery;

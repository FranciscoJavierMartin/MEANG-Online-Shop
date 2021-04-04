import { IResolvers } from 'graphql-tools';
import TagService from '../../services/tag.service';

const resolversTagsMutation: IResolvers = {
  Mutation: {
    addTag(_, variables, context) {
      return new TagService(_, variables, context).insert();
    },
    updateTag(_, variables, context) {
      return new TagService(_, variables, context).modify();
    },
    deleteTag(_, variables, context) {
      return new TagService(_, variables, context).delete();
    },
    blockTag(_, variables, context) {
      return new TagService(_, variables, context).block();
    },
  },
};

export default resolversTagsMutation;

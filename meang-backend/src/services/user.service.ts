import { COLLECTIONS } from '../config/constants';
import { ContextData } from '../interfaces/context-data.interface';
import { Variables } from '../interfaces/variable.interface';
import ResolversOperationsService from './resolvers-operations.service';

class UserService extends ResolversOperationsService {
  constructor(root: object, variables: Variables, context: ContextData) {
    super(root, variables, context);
  }

  async items() {
    const result = await this.list(COLLECTIONS.USERS, 'Users');
    return {
      status: result.status,
      message: result.message,
      users: result.items,
    };
  }
}

export default UserService;

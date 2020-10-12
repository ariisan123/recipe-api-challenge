import * as DataLoader from 'dataloader';
import { User } from '../../models/User';
import { batchUser } from '../types/Loaders';

const batchUsers: batchUser = async (userIds) => {
  try {
    const users = await User.findByIds(userIds, { loadRelationIds: true });
    return userIds.map((userId) => users.find((user) => user.id === userId));
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const userLoader = () => new DataLoader<string, User>(batchUsers);

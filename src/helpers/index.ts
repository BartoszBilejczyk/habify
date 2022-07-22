import { Friend, User, UserBasic } from '../types';

export const getNameAndNickname = (person: User | UserBasic | Friend) => {
  return `${person.name}` + `${person.nickname ? `(${person.nickname})` : ''}`;
};

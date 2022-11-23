import { UserType } from '~/src/types/UserType';
import { RootState } from '..';

export const selectUserModuleState = (state: RootState) => state.user;

export const selectUserIds = (state: RootState) =>
    selectUserModuleState(state).ids;

export const selectUsers = (state: RootState) =>
    Object.values(selectUserModuleState(state).entities) as UserType[];

export const selectUserById = (state: RootState, userId: number) =>
    Object.values(selectUserModuleState(state).entities).filter(
        (user) => (user as UserType).id === userId,
    )[0] as UserType;

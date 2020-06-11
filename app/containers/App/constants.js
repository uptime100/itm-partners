/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_REPOS = 'boilerplate/App/LOAD_REPOS';
export const LOAD_REPOS_SUCCESS = 'boilerplate/App/LOAD_REPOS_SUCCESS';
export const LOAD_REPOS_ERROR = 'boilerplate/App/LOAD_REPOS_ERROR';

export const PROCESSING = 'app/App/PROCESSING';

// ROLES
export const GET_ROLES = 'app/App/GET_ROLES';
export const GET_ROLES_SUCCESS = 'app/App/GET_ROLES_SUCCESS';
export const GET_ROLES_FAILED = 'app/App/GET_ROLES_FAILED';

// CURRENT USER
export const GET_CURRENT_USER = 'app/App/GET_CURRENT_USER';
export const GET_CURRENT_USER_SUCCESS = 'app/App/GET_CURRENT_USER_SUCCESS';
export const GET_CURRENT_USER_FAILED = 'app/App/GET_CURRENT_USER_FAILED';

export const SET_ERROR = 'app/App/SET_ERROR';
export const SET_IDLE_STATUS = 'app/App/SET_IDLE_STATUS';

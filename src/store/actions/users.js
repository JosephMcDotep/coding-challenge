import * as actionTypes from './actionTypes';

export const addUser = (data) => {
    return {
        type: actionTypes.ADD_USER,
        payload: data
    };
};

export const editUser = (data) => {
    return {
        type: actionTypes.EDIT_USER,
        payload: data
    };
};

export const fetchUsersStart = () => {
    return {
        type: actionTypes.FETCH_USERS_START
    };
};

export const fetchUsersSuccess = (users) => {
    return {
        type: actionTypes.FETCH_USERS_SUCCESS,
        users: users
    };
};

export const fetchUsersFail = (e) => {
    return {
        type: actionTypes.FETCH_USERS_ERROR
    };
};

export function fetchUsers() {
    return dispatch => {
        dispatch(fetchUsersStart());
        fetch('https://randomuser.me/api/?results=15&page=1')
            .then(res => res.json())
            .then(data => {
                const userData = data.results.map((dt, index) => {
                    // NOTE: Forced index 4 and 8 to lose images for testing purposes
                    if (index === 4 || index === 6 || index === 10) {
                        return { ...dt, 
                            userId: index,
                            picture: {
                                large: null,
                                medium: null,
                                thumbnail: null
                            }
                        };
                    } else {
                        return { ...dt, userId: index };
                    }
                });

                dispatch(fetchUsersSuccess(userData))
            })
            .catch(e => {
                dispatch(fetchUsersFail(e))
            });
    }
};
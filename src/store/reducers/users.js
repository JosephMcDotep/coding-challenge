import * as actionTypes from '../actions/actionTypes';

const initialState = {
    users: [],
    updated: false,
    loading: false,
    initialLoad: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USERS_START :
            return {
                ...state,
                loading: true
            };
        case actionTypes.FETCH_USERS_SUCCESS :
            return {
                ...state,
                users: action.users,
                loading: false,
                initialLoad: true
            };
        case actionTypes.FETCH_USERS_ERROR :
            return {
                ...state,
                loading: false
            };
        case actionTypes.ADD_USER :
            return { 
                ...state,
                users: [...state.users, action.payload],
                updated: true
            }
        case actionTypes.EDIT_USER :
            return {
                ...state, 
                users: state.users.map(user => {
                    if (user.userId === parseInt(action.payload.userId)) {
                        console.log(action.payload)

                       return action.payload;
                    }
                    
                    return user;
                }),
            };
        default: 
            return {
                ...state
            };
    }
}

export default reducer;
import React, { createContext, useReducer, useContext } from 'react';
// import {
//     SET_CURRENT_POST,
//     REMOVE_POST,
//     UPDATE_POST,
//     ADD_POST,
//     LOADING,
//     SET_SIDEBAR_OPEN,
//     SET_PROFILE_OPEN
// } from './actions';

const StoreContext = createContext({
    posts: {},
        currentPost: {
            _id: "",
            title: "",
            username: "",
            body: ""
            
        },
        loading: false,
        isSidebarOpen: false,
});
console.log(StoreContext);
const { Provider } = StoreContext;

function reducer (state, action) {
    switch (action.type) {
        case "SET_CURRENT_POST":
            return [
                ...state,
            {
                _id: state,
                
                currentPost: action.post,
                loading: false
            }
        ];
        case "UPDATE_POST":
            return [
                ...state,
                {
                posts: [...action.posts],
                loading: false
            }
        ];
        case "ADD_POST":
            return [
                ...state,
                {
                posts: [action.post, ...state.posts],
                loading: false
            }
        ];
        case "REMOVE_POST":
            return [
                ...state,
                {
                posts: state.filter((_, post) => {
                    return post._id !== action.post;
                })
            }
        ];
        case "LOADING":
            return [
                ...state,
                {
                loading: true
            }
        ];
        case "SET_SIDEBAR_OPEN":
            return [
                ...state,
                {
                isSidebarOpen: action.isSidebarOpen,
            }
        ];
        case "SET_PROFILE_OPEN":
            return [
                ...state,
                {
                isProfileOpen: action.isProfileOpen,
            }
        ];
        default:
            return state;
    }
};

function StoreProvider ({ value = [], ...props }) {
    const [state, dispatch] = useReducer(reducer, {
        posts: {},
        currentPost: {
            _id: 0,
            title: "",
            username: "",
            body: ""
            
        },
        loading: false,
    });

    return <Provider value={[state, dispatch]} {...props} />;
};

function useStoreContext () {
    return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };

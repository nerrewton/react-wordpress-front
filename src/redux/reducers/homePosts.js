const initialState = {
    posts: [],
    page: 1,
    length: 5,
    hasMorePosts: true
};

export default function (state = initialState, action) {
    if (action.type === "HOME_POST_NEXT_PAGE") {
        const newPosts = state.posts.concat(action.posts);
        const newHasMorePosts = state.length === action.posts.length;
        let nextpage = state.page;
        if( state.length === action.posts.length ){
            nextpage++;
        }
        return {
            ...state,
            posts: newPosts,
            hasMorePosts: newHasMorePosts,
            page: nextpage
        };
    }else if ( action.type === "HOME_POST_SEARCH" ) {
        return {
            ...state,
            posts: action.posts,
            page: initialState.page,
            length: initialState.length,
            hasMorePosts: initialState.hasMorePosts
        };
    } else {
        return state;
    }
}

import axios from 'axios';

import { 
    ADD_POST,
    GET_ERRORS,
    GET_POSTS,
    GET_POST,
    POST_LOADING,
    DELETE_POST,
    CLEAR_ERRORS
} from './types';

// Add post
export const addPost = postData => dispatch => {
    dispatch(clearErrors());
    axios
        .post('/api/posts', postData)
        .then(res => 
            dispatch({
                type: ADD_POST,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Delete post
export const deletePost = idPost => dispatch => {
    axios
        .delete(`/api/posts/${idPost}`)
        .then(res => 
            dispatch({
                type: DELETE_POST,
                payload: idPost
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// add Like Post
export const addLike = idPost => dispatch => {
    axios
        .post(`/api/posts/like/${idPost}`)
        .then(res => 
            dispatch(getPosts())
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Remove Like Post
export const removeLike = idPost => dispatch => {
    axios
        .post(`/api/posts/unlike/${idPost}`)
        .then(res => dispatch(getPosts())
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Get posts
export const getPosts = () => dispatch => {
    dispatch(setPostLoading());
    axios
        .get('/api/posts')
        .then(res => 
            dispatch({
                type: GET_POSTS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_POSTS,
                payload: null
            })
        );
};

// Get post
export const getPost = (idPost) => dispatch => {
    dispatch(setPostLoading());
    axios
        .get(`/api/posts/${idPost}`)
        .then(res => 
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_POST,
                payload: null
            })
        );
};

// Add Comment
export const addComment = (postId, commentData) => dispatch => {
    dispatch(clearErrors());
    axios
        .post(`/api/posts/comment/${postId}`, commentData)
        .then(res => 
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Delete Comment
export const deleteComment = (postId, comentId) => dispatch => {
    axios
        .delete(`/api/posts/comment/${postId}/${comentId}`)
        .then(res => 
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};


// set Loading state
export const setPostLoading = () =>{
    return {
        type: POST_LOADING
    }
};

// Clear errors
export const clearErrors = () => {
    return {
      type: CLEAR_ERRORS
    };
  };
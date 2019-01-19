import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

class CommentFeed extends Component {
    

    componentDidMount(){}

    render() {

        const { comments, postId } = this.props;

        console.log("comments: "+ comments)
        
        comments.map(ew => {console.log("sd")})
        return comments.map(comment => (
            <CommentItem key={comment._id} comment={comment} postId = {postId} />
        ));
    }
}

CommentFeed.PropTypes = {
    // comments: PropTypes.arrayOf(
    //     PropTypes.object
    // ),
    comments: PropTypes.array.isRequired,
    postId: PropTypes.string.isRequired
};

export default CommentFeed;

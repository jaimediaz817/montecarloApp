import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { getProfiles } from '../../actions/profileActions.js';
import Profile from './ProfileItem';
import ProfileItem from './ProfileItem';

class Profiles extends Component {

    componentDidMount() {
        this.props.getProfiles();
    }

    render() {

        const { profiles, loading } = this.props.profile;
        let profileItems;

        if(profiles === null || loading ){
            profileItems = <Spinner />;
        }else{
            if(profiles.length > 0) {
                // eslint-disable-next-line no-unused-expressions
                profileItems = profiles.map(profile =>(
                   <ProfileItem key = {profile._id} profile={profile} /> 
                ));

            }else{
                profileItems = <h4>No profiles found...</h4>
            }
        }

        return (
            <div className="profiles">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Developer Profiles</h1>                            
                            <div className="lead text-center">
                                Browse nd connect with Developers
                            </div>
                            { profileItems }
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

Profiles.PropTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStataeToProps = state => ({
    profile: state.profile
});

export default connect(mapStataeToProps, { getProfiles })(Profiles);

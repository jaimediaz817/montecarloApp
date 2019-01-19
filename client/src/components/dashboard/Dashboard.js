import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
//
import Experience from './Experience';
import Education from './Education';

import ProfileActions from './ProfileActions';

class Dashboard extends Component {

    componentDidMount() {
        this.props.getCurrentProfile();
    }
    onDeleteClickHandle(e) {
        this.props.deleteAccount();
    }

    render() {
        // antes de renderizar algo, comprobar:
        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;

        let dashboardContent;

        if (profile == null || loading){
            dashboardContent = <Spinner />
        }else{
            // Check if logged in user has profile data
            if(Object.keys(profile).length > 0) {

                dashboardContent = (
                    <div>
                        <p className="lead text-muted">
                            welocome <Link to={`/profile/${ profile.handle }`}>{ user.name }</Link>
                        </p>

                        {/* Components */}                        
                        <ProfileActions />
                        <Experience experience= { profile.experience } />
                        <Education education= { profile.education } />

                        {/* TODO: exp and edu */}
                        <div className={{ marginBottom: '60px'}}>
                            <button 
                                onClick={this.onDeleteClickHandle.bind(this)}
                                className="btn btn-danger"
                            >
                                Danger My Account
                            </button>
                        </div>
                    </div>
                );

            } else {
                // User is logged but has no profile
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">
                            Welcome { user.name }
                        </p>
                        <Link to="/create-profile" className="btn btn-lg btn-info">
                            Create profile
                        </Link>                        
                    </div>
                );
            }
        }

        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div>
                                <h1 className="display-4">Dashboard</h1>
                                {dashboardContent}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Dashboard.PropTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { 
    getCurrentProfile,
    deleteAccount
} )(Dashboard);
import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import { withRouter } from 'react-router-dom';
import  Moment from 'react-moment';
import { deleteExperience } from '../../actions/profileActions';

class Experience extends Component {

    // Delete Experience
    onDeleteClickHandle(idExp) {
        //, this.props.history
        this.props.deleteExperience(idExp);
    }

    render() {

        const experience = this.props.experience.map(exp =>(
            <tr key={exp._id}>
                <td><span>{exp.company}</span></td>
                <td>{exp.title}</td>
                <td>
                    <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
                    { exp.to === null ? ('Now') : (<Moment format="YYYY/MM/DD">{exp.to}</Moment>) }
                </td>
                <td>
                    <button className="btn btn-danger" onClick={ this.onDeleteClickHandle.bind(this, exp._id) }>Delete</button>
                </td>
            </tr>
        ));

        return (
            <div>
                <h4 className="mb-4">Experience Credentials</h4>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th>Company</th>
                            <th>Title</th>
                            <th>Years</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { experience }
                    </tbody>
                </table>
            </div>
        )
    }
}

Experience.PropTypes = {
    deleteExperience: PropTypes.func.isRequired
}

export default connect(null, { deleteExperience })(Experience);
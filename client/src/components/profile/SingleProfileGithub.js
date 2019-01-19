import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class SingleProfileGithub extends Component {

    constructor(props){
        super(props);
        this.state = {
            clientId:'1cc0faa3a08814823923',
            clientSecret:'136c632df3e7ea23899eedffa2e52f2ad006692b',
            count: 5,
            sort: 'created: asc',
            repos: []
        }
    }

    componentDidMount() {
        const { username } = this.props;
        const { count, sort, clientId, clientSecret } = this.state;

        fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
            .then(res => res.json())
            .then(data =>{
                this.setState({ repos: data })
            })
            .catch(err => console.log(err))
    }    

    render() {

        const { repos } = this.state;
        const repoItems = repos.map(repo =>(
            <div key={repo.id} className="card card-body mb-2">
                <div className="row">
                    <div className="col-md-6">
                        <h4>
                                      
                            <a href= {`${repo.html_url}`} className="text-info" target="_blank">
                                { repo.name }
                            </a>
                        </h4>
                        <p>{ repo.description }</p>
                    </div>
                    <div className="col-md-6">
                        <span className="badge badge-info mr-1">
                            Starts: { repo.stargazers_count }
                        </span>
                        <span className="badge badge-secundary mr-1">
                            Watchers: { repo.watchers_count }
                        </span>
                        <span className="badge badge-success mr-1">
                            Forks: { repo.forks_count }
                        </span>                        
                    </div>
                </div>
            </div>
        ))

        return (
            <div>
                <hr />
                <h3 className="mb-4">Latest Github Repos</h3>
                { repoItems }
            </div>
        );
    }
}

SingleProfileGithub.PropTypes = {
    username: PropTypes.string.isRequired,

}

export default SingleProfileGithub;
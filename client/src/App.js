import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';

import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

// Redux
import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';

// auth
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddEperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/SingleProfile';
import Posts from './components/posts/Posts';
import PostDetail from './components/post-detail/PostDetail';
import NotFound from './components/not-found/NotFound';

import './App.css';

// Check for Token
if (localStorage.jwtToken) {
	// Set Auth token header auth
	setAuthToken(localStorage.jwtToken);
	// Decode token and get user info exp
	const decoded = jwt_decode(localStorage.jwtToken);

	//llamar a la accion, set User and isAuthenticated
	store.dispatch(setCurrentUser(decoded));

	// check for expired Token
	const currentTime = Date.now() / 1000;

	if (decoded.exp < currentTime) {
		store.dispatch(logoutUser());
		// TODO:clear current Profile
		store.dispatch(clearCurrentProfile());
		// Redirect to login
		window.location.href = '/login';
	}

}

		
class App extends Component {
  	render() {
		return (
			<Provider store={ store }>
				<Router>
					<div className="App">
						<Navbar />
						<Route exact path="/" component={ Landing } />
						<div className="container">

							<Route exact path="/Register" component={ Register } />
							<Route exact path="/Login" component={ Login } />
							<Route exact path="/profiles" component={ Profiles } />
							<Route exact path="/profile/:handle" component={ Profile } />

							<Switch>
								<PrivateRoute 
									exact 
									path="/dashboard" 
									component={ Dashboard } 
								/>
							</Switch>

							<Switch>
								<PrivateRoute 
									exact 
									path="/create-profile" 
									component={ CreateProfile } 
								/>
							</Switch>

							<Switch>
								<PrivateRoute 
									exact 
									path="/edit-profile" 
									component={ EditProfile } 
								/>
							</Switch>

							<Switch>
								<PrivateRoute 
									exact 
									path="/add-experience" 
									component={ AddEperience } 
								/>
							</Switch>              

							<Switch>
								<PrivateRoute 
									exact 
									path="/add-education" 
									component={ AddEducation } 
								/>
							</Switch>

							<Switch>
								<PrivateRoute 
									exact 
									path="/feed" 
									component={ Posts } 
								/>
							</Switch>

							<Switch>
								<PrivateRoute 
									exact 
									path="/post/:id" 
									component={ PostDetail } 
								/>
							</Switch>							

							<Route exact path="/not-found" component={ NotFound } />
						</div>
						<Footer />
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;

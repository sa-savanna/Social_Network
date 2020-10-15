import React, { Fragment, useEffect } from 'react';
import './App.css';
import NavBar from './components/layout/NavBar';
import Landing from './components/layout/Landing';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Alert from './components/layout/Alert';
import { loadUser } from './actions/auth'
import setAuthToken from './utils/setAuthToken'
import Dashboard from './components/dashboard/Dashboard';
//redux
import { Provider } from 'react-redux';
import store from './store'
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-form/CreateProfile';
import EditProfile from './components/profile-form/EditProfile';
import AddExperience from './components/profile-form/AddExperience';
import AddEducation from './components/profile-form/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/layout/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';



if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, []) //load once

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <NavBar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            
            <Switch>
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/profiles" component={Profiles} />
              <Route path="/profile/:id" component={Profile} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/create-profile" component={CreateProfile} />
              <PrivateRoute path="/edit-profile" component={EditProfile} />
              <PrivateRoute path="/add-experience" component={AddExperience} />
              <PrivateRoute path="/add-education" component={AddEducation} />
              <PrivateRoute path="/posts" component={Posts} />
              <PrivateRoute path="/posts/:id" component={Post} />
            </Switch>
            <Alert />
          </section>
        </Fragment>
      </BrowserRouter >
    </Provider>
  );
}

export default App;

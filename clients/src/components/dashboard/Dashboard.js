import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile, deleteAccount } from '../../actions/profile'
import Spinner from '../layout/Spinner'
import { FaUser, FaUserMinus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import DashboardActions from './dashboardAction'
import Experience from './Experience'
import Education from './Education'

const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading }, deleteAccount }) => {
    useEffect(() => {
        getCurrentProfile()
    }, [getCurrentProfile])

    return (
        loading && profile === null ? <Spinner /> : 
        <Fragment>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">  <FaUser />Welcome {user && user.name}</p> {/* comes from props auth*/}
            {profile !== null ? (
                <Fragment>
                    <DashboardActions />
                    <Experience experience={profile.experience} />
                    <Education education={profile.education} />
                    <div className="my-2">
                        <button onClick={() => deleteAccount()} className="btn btn-danger">
                            <FaUserMinus /> Delete My Account
                        </button>
                    </div>
                </Fragment>
            ) : (
                    <Fragment>You have not set a profile. Please add some info. <br/>
                        <Link to='/create-profile' className="btn btn-primary my-1">
                            Create profile
                        </Link>
                    </Fragment>
                )}
        </Fragment>
    )
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired
}

const mapStatetoProps = state => ({
    auth: state.auth,
    profile: state.profile
})


export default connect(mapStatetoProps, { getCurrentProfile, deleteAccount })(Dashboard)

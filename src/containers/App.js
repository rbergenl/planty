import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTranslate } from 'react-localize-redux';

import { logoutUser } from '../actions/authActions';

import AppBar from '../components/AppBar';
import AddDeviceDialog from '../components/AddDeviceDialog';

class App extends React.Component {
    render() {
        const { loggedIn, givenName, logoutUser, translate } = this.props;
        return (
            <div>
                <AppBar loggedIn={loggedIn} logoutUser={logoutUser} title={translate('app_name')} />
                <h1>{ translate('greeting', {name: givenName}) }</h1>
                <AddDeviceDialog />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.loggedIn,
    givenName: state.auth.given_name,
    translate: getTranslate(state.locale)
});
const mapDispatchToProps = dispatch => (bindActionCreators({ logoutUser }, dispatch));
export default withRouter(connect(mapStateToProps, mapDispatchToProps)( App ));

import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Login extends React.Component {
    render() {
        
        const { loggedIn } = this.props;
        
        if (loggedIn) {
          const { from } = this.props.location.state || { from: { pathname: '/app' } };
          return (
            <Redirect to={from} />
          );
        }


        return (<h1>Login here</h1>);
    }
}

const mapStateToProps = state => ({ loggedIn: state.auth.loggedIn });
const mapDispatchToProps = dispatch => (bindActionCreators({ }, dispatch));
export default withRouter(connect(mapStateToProps, mapDispatchToProps)( Login ));


   

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import history from '../lib/history';

import { loginUser } from '../actions/authActions';

import Button from '@material-ui/core/Button';
import Google from 'mdi-material-ui/Google';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    textTransform: 'capitalize',
    backgroundColor: 'white'
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  }
});

@withStyles(styles)
class Landing extends React.Component {
    render() {
        const { loginUser, classes } = this.props;
        
        return (
            <div>
                <Button className={classes.button} variant="raised" onClick={loginUser}>
                    <Google className={classes.leftIcon} />
                    Sign in with Google
                </Button>
                <button onClick={() => {history.push('/signup')}}>Signup</button>
                <button onClick={() => {history.push('/login')}}>Login</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({ });
const mapDispatchToProps = dispatch => (bindActionCreators({ loginUser: loginUser }, dispatch));
export default withRouter(connect(mapStateToProps, mapDispatchToProps)( Landing ));

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTranslate } from 'react-localize-redux';

import history from '../lib/history';

import { loginUser } from '../actions/authActions';

import { withStyles } from '@material-ui/core/styles';

import SocialButton from '../components/SocialButton';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
      display: 'flex',
      flex: '1',
      flexFlow: 'row wrap',
      justifyContent: 'space-around'
  },
  button: {
      margin: '10px'
  }
});

@withStyles(styles)
class Landing extends React.Component {
    render() {
        const { loginUser, classes, translate } = this.props;
        
        return (
            <div className={classes.container}>
                <h1>{ translate('app_name') }</h1>
                <SocialButton
                    className={classes.button}
                    handleClick={ loginUser }
                />
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={() => {history.push('/register')}}
                    style={{flex: '1 1 0%'}} >
                    Register
                </Button>
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={() => {history.push('/login')}}
                    style={{flex: '1 1 0%'}}>
                    Login
                </Button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    translate: getTranslate(state.locale)
});
const mapDispatchToProps = dispatch => (bindActionCreators({ loginUser }, dispatch));
export default withRouter(connect(mapStateToProps, mapDispatchToProps)( Landing ));

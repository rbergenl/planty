import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import GoogleIcon from '../assets/g-normal.png';

const styles = theme => ({
  button: {
    textTransform: 'none',
    backgroundColor: 'white',
    '&:hover': {
      background: 'white'
    }
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  }
});

@withStyles(styles)
export default class Root extends React.Component {
    render() {
        const { handleClick, classes } = this.props;
        
        return (
            <Button className={classes.button} style={{flex: '3 1 100%', margin: '10px'}} variant="contained" onClick={handleClick}>
                <img src={GoogleIcon} className={classes.leftIcon} />
                Login with Google
            </Button>
        );
    }
}

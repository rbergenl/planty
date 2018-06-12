import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AppBar from '../components/AppBar';

class App extends React.Component {
    render() {
        return (<AppBar />);
    }
}

const mapStateToProps = state => ({ });
const mapDispatchToProps = dispatch => (bindActionCreators({ }, dispatch));
export default withRouter(connect(mapStateToProps, mapDispatchToProps)( App ));

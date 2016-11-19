/**
*
* Menu
*
*/

import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';

import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import selectLoggedIn from 'containers/auth/selectors';
import { logout } from 'containers/auth/actions';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Grid, Row, Col } from 'react-bem-grid';
import messages from './messages';

import PagesMenuList from '../PagesMenuList';
import styles from './styles.css';

class JulMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const {
      title,
      loggedIn,
      doLogout,
      isAddAllowed,
    } = this.props;
    return (
      <nav>
        <AppBar
          title={title}
          iconElementLeft={<PagesMenuList loggedIn={loggedIn} />}
          iconElementRight={loggedIn ? renderLogout(doLogout) : renderLogin()}
        />
        {isAddAllowed ? renderAddButton() : null}
      </nav>
    );
  }
}

function renderAddButton() {
  return (
    <Grid>
      <Row>
        <Col>
          <FloatingActionButton
            className={styles['add-button']}
            containerElement={<Link to="/add" />} // eslint-disable-line jsx-a11y/anchor-has-content
          >
            <ContentAdd />
          </FloatingActionButton>
        </Col>
      </Row>

    </Grid>
  );
}

function renderLogin() {
  return (<FlatButton
    containerElement={<Link to="/login" />} // eslint-disable-line jsx-a11y/anchor-has-content
    label={<FormattedMessage {...messages.login} />}
  />);
}

function renderLogout(doLogout) {
  return (<FlatButton label={<FormattedMessage {...messages.logout} />} onClick={doLogout} />);
}

JulMenu.propTypes = {
  title: PropTypes.node,
  loggedIn: PropTypes.bool,
  doLogout: PropTypes.func,
  isAddAllowed: PropTypes.bool,
};


const mapStateToProps = selectLoggedIn();

function mapDispatchToProps(dispatch) {
  return {
    doLogout: () => dispatch(logout()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(JulMenu);

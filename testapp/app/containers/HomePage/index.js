/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import H2 from 'components/H2';
import StringList from 'components/StringList';
import CenteredSection from './CenteredSection';
import Section from './Section';
import { loadStrings } from '../App/actions';

//Main body of a function component, React’s render phase
export function HomePage({
  loading,
  error,
  repos,
  onLoadStringList,
}) {

  //useEffect hook to run after the render is committed to the screen
  useEffect(() => {
    // When initial strlist repository, dispatch action to load strlist repository
      repos == false && onLoadStringList();
  }, []);

  //For passing props to children
  const reposListProps = {
    loading,
    error,
    repos,
  };

  return (
    <article>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>
      <div>
        <CenteredSection>
          <H2>

          </H2>
          <p>
          </p>
        </CenteredSection>
        <Section>
          <b>
            String List
          </b>
          <p>
            List of strings from "/db/json.data" file on server via API call
          </p>
          <StringList {...reposListProps} />
        </Section>
      </div>
    </article>
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onLoadStringList: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadStringList: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadStrings());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

//Check ?? compose is redux method -> additional enhancers
// memo is for memoization it's type of caching, telling react to cache the renderization of this object
export default compose(
  withConnect,
  memo,
)(HomePage);

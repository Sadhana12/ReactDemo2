import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '../ListItem';
import Ul from './Ul';
import Wrapper from './Wrapper';

function List(props) {
  const ComponentToRender = props.component;
  let content = <div />;

  // If we have items, render them
  // iterate through each string in string
  if (props.items) {
    content = props.items.map(item => (
      <ListItem key={`repo-list-item-${item.id}`} item={item.text} />
    ));
  } else {
    // Otherwise render a single component
    content = content = <ComponentToRender />;
  }

  return (
    <Wrapper>
      <Ul>{content}</Ul>
    </Wrapper>
  );
}

List.propTypes = {
  component: PropTypes.elementType.isRequired,
  items: PropTypes.array,
};

export default List;

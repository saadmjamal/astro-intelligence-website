const React = require('react');

module.exports = function MockImage(props) {
  // eslint-disable-next-line @next/next/no-img-element
  return React.createElement('img', props);
};
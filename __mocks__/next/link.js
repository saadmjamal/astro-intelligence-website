const React = require('react');

module.exports = function MockLink({ children, href, ...props }) {
  return React.createElement('a', { href, ...props }, children);
};
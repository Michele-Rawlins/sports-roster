
import PropTypes from 'prop-types';

const teamShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
});


export default { teamShape };

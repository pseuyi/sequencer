'use strict';

import { connect } from 'react-redux';
import Grid from '../components/Grid';

const mapStateToProps = ({ sampleBrush }) => ({
  sampleBrush
});

export default connect(
  mapStateToProps,
  null
)(Grid);
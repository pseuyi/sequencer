'use strict';

import { connect } from 'react-redux';
import Grid from '../components/Grid';
import {addObject} from '../reducers/timelineReducer'

// const mapStateToProps = ({ selectedAlbum }) => ({
//   selectedAlbum
// });



export default connect(
    null,
  {addObject}
)(Grid);
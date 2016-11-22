'use strict';

import { connect } from 'react-redux';
import Cube from '../components/Cube';
import {addObject} from '../reducers/timelineReducer'

const mapDispatchToProps = (dispatch) => ({
  addCube: (data) => {
  	dispatch(addObject(data))
  }
});

export default connect(
  null,
  mapDispatchToProps
)(Cube);

// mapDispatchToProps = (dispatch) => dispatch(addCubeToEvents)
// addCubeToEvents = (cube_data) =>
//   type: ADD_CUBE,
//   cube_data
  

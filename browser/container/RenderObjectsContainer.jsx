'use strict';

import { connect } from 'react-redux';
import RenderObjects from '../components/RenderObjects';
import {addObject} from '../reducers/timelineReducer'

// const mapDispatchToProps = (dispatch) => ({
//   addCube: (data) => {
//   	dispatch(addObject(data))
//   }
// // });
// const mapStateToProps = ({ albums }) => ({
//   albums
// });


const mapStateToProps = ({newObjCoords, events}) => ({
    newObjCoords, 
    events
})

export default connect(
    mapStateToProps,
    null
)(RenderObjects);

// mapDispatchToProps = (dispatch) => dispatch(addCubeToEvents)
// addCubeToEvents = (cube_data) =>
//   type: ADD_CUBE,
//   cube_data
  
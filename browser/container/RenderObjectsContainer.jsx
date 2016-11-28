'use strict';

import { connect } from 'react-redux';
import RenderObjects from '../components/RenderObjects';
import {deleteOne, addObject} from '../reducers/timelineReducer'

// const mapDispatchToProps = (dispatch) => ({
//   addCube: (data) => {
//   	dispatch(addObject(data))
//   }
// // });
// const mapStateToProps = ({ albums }) => ({
//   albums
// });


const mapStateToProps = ({events}) => ({ 
    events, 
});

const mapDispatchToProps = (dispatch) => ({
    deleteObj: (id) => {
        dispatch(deleteOne(id));
    },
    addObject: (...args) => {
        dispatch(addObject(...args))
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RenderObjects);

// mapDispatchToProps = (dispatch) => dispatch(addCubeToEvents)
// addCubeToEvents = (cube_data) =>
//   type: ADD_CUBE,
//   cube_data
  
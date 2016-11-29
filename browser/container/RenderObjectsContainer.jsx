' ';

import { connect } from 'react-redux';
import RenderObjects from '../components/RenderObjects';
import {deleteOne} from '../reducers/timelineReducer'

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
    }
});

export default connect(
    mapStateToProps,
    null
)(RenderObjects);

// mapDispatchToProps = (dispatch) => dispatch(addCubeToEvents)
// addCubeToEvents = (cube_data) =>
//   type: ADD_CUBE,
//   cube_data
  
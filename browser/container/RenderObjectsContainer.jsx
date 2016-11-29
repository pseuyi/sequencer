' ';

import { connect } from 'react-redux';
import RenderObjects from '../components/RenderObjects';
import {deleteOne, addObject, setFilter} from '../reducers/timelineReducer'

// const mapDispatchToProps = (dispatch) => ({
//   addCube: (data) => {
//   	dispatch(addObject(data))
//   }
// // });
// const mapStateToProps = ({ albums }) => ({
//   albums
// });


const mapStateToProps = ({events, filterBrush, edit}) => ({ 
    events: events,
    filterBrush: filterBrush, 
    edit: edit
});

const mapDispatchToProps = (dispatch) => ({
    deleteObj: (id) => {
        dispatch(deleteOne(id));
    },
    addObject: (...args) => {
        dispatch(addObject(...args))
    },
    addFilter: (id, effect) => {
    	dispatch(setFilter(id, effect));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RenderObjects);

// mapDispatchToProps = (dispatch) => dispatch(addCubeToEvents)
// addCubeToEvents = (cube_data) =>
//   type: ADD_CUBE,
//   cube_data
  
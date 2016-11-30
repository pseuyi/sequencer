import { connect } from 'react-redux';
import RenderObjects from '../components/RenderObjects';
import {deleteOne, addObject, setFilter} from '../reducers/timelineReducer';

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
        dispatch(addObject(...args));
    },
    addFilter: (id, effect) => {
    	dispatch(setFilter(id, effect));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RenderObjects);

  
'use strict';

import { connect } from 'react-redux';
import Grid from '../components/Grid';
import {addObject, updatePosition} from '../reducers/timelineReducer'

const mapStateToProps = ({ sampleBrush }) => ({
  sampleBrush
});

// const mapDispatchToProps = (dispatch) => ({
//     newPosition: (position, id) => {
//         dispatch(updatePosition(position, id));
//     }
// });


export default connect(
    mapStateToProps,
    {addObject, updatePosition}
)(Grid);
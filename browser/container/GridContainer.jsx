import { connect } from 'react-redux';
import Grid from '../components/Grid';
import {addTimelineEvent, addObjectToFB, addObject, updatePosition, brushPosition} from '../reducers/timelineReducer';

const mapStateToProps = ({ songKey, sampleBrush }) => ({
  sampleBrush, 
  songKey
});

export default connect(
  mapStateToProps,
  {addTimelineEvent, addObject, updatePosition, brushPosition, addObjectToFB}
)(Grid);


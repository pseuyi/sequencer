import { connect } from 'react-redux';
import Grid from '../components/Grid';
import {initCounter, addTimelineEvent, addObjectToFB, addObject, updatePosition, brushPosition} from '../reducers/timelineReducer';

const mapStateToProps = ({ counter, events, songKey, sampleBrush }) => ({
  sampleBrush, 
  songKey, 
  events, 
  counter
});

export default connect(
  mapStateToProps,
  {initCounter, addTimelineEvent, addObject, updatePosition, brushPosition, addObjectToFB}
)(Grid);


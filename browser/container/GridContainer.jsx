import { connect } from 'react-redux';
import Grid from '../components/Grid';
import {addObject, updatePosition} from '../reducers/timelineReducer';

const mapStateToProps = ({ sampleBrush }) => ({
  sampleBrush
});

export default connect(
  mapStateToProps,
  {addObject, updatePosition}
)(Grid);



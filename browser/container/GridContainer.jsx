import { connect } from 'react-redux';
import Grid from '../components/Grid';
import {addObject, updatePosition, brushPosition} from '../reducers/timelineReducer';

const mapStateToProps = ({ sampleBrush }) => ({
  sampleBrush
});

export default connect(
  mapStateToProps,
  {addObject, updatePosition, brushPosition}
)(Grid);


import { connect } from 'react-redux';
import Patterns from '../components/Patterns';
import {fetchSongs, createSong} from '../reducers/timelineReducer';

const mapStateToProps = ({ songs }) => ({
  songs
});

export default connect(
  mapStateToProps, 
  {fetchSongs, createSong}
)(Patterns);
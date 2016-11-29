

import { connect } from 'react-redux';
import SongFile from '../components/SongFile';
import {fetchSongs} from '../reducers/timelineReducer';

const mapStateToProps = ({ songs }) => ({
  songs
});

export default connect(
  mapStateToProps, 
  {fetchSongs}
)(SongFile);
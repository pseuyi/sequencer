import { connect } from 'react-redux';
import Patterns from '../components/Patterns';
import {fetchSongs, createSong} from '../reducers/timelineReducer';

const mapStateToProps = ({ songs }) => ({
  songs
});

// const mapDispatchToProps = (dispatch) => ({
//   getSongs: () => {
//     const thunk = fetchSongs();
//     dispatch(thunk);
//   }
// })

export default connect(
  mapStateToProps, 
  {fetchSongs, createSong}
)(Patterns);
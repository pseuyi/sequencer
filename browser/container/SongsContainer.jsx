

import { connect } from 'react-redux';
import Songs from '../components/Songs';
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
)(Songs);
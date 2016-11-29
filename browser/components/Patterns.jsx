import React from 'react'
import THREE from 'three'
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import { togglePatternPage } from '../reducers/timelineReducer';

export class Patterns extends React.Component {

   componentWillMount() {
    this.props.fetchSongs();
    //  firebase.database().ref(`/songs`)
    //   .on('value', songs => {
    //       console.log("SONGSFROMDB", songs)
    //   });
    // this.props.createSong([{spl: 'asdf', spl2: 'asdf'}], 'myfav', 'munchkin21')
 }

    render() {
        console.log("SONGS----", Array.isArray(this.props.songs))
        return (
            <div id='pattern-modal' className="container">

                <div className="row">
                    <div className="col-md-3 col-xs-4 single-pattern">
                        <div className="dummy" style={{'background-image':`http://www.clipartkid.com/images/472/neon-musical-notes-background-clipart-panda-free-clipart-images-t8rkdw-clipart.png`}}></div>
                        <a href="#" className="thumbnail purple">Songs from backend</a>
                    </div>
                    <div className="col-md-3 col-xs-4 single-pattern">
                        <div className="dummy" style={{backgroundImage:`http://www.clipartkid.com/images/472/neon-musical-notes-background-clipart-panda-free-clipart-images-t8rkdw-clipart.png`}}></div>
                        <a href="#" className="thumbnail purple">Songs from backend</a>
                    </div>
                    <div className="col-md-3 col-xs-4 single-pattern">
                        <div className="dummy" style={{backgroundImage:`http://www.clipartkid.com/images/472/neon-musical-notes-background-clipart-panda-free-clipart-images-t8rkdw-clipart.png`}}></div>
                        <a href="#" className="thumbnail purple">Songs from backend</a>
                    </div>
                    <div className="col-md-3 col-xs-4 single-pattern">
                        <div className="dummy" style={{backgroundImage:`http://www.clipartkid.com/images/472/neon-musical-notes-background-clipart-panda-free-clipart-images-t8rkdw-clipart.png`}}></div>
                        <a href="#" className="thumbnail purple">Songs from backend</a>
                    </div>
                </div>
            <button onClick={this.props.togglePatternPage}>close</button>
            </div>
        )
    }
}

export default connect(
    null,
    {togglePatternPage}
    )(Patterns)

 
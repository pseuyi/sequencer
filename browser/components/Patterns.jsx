import React from 'react'
import THREE from 'three'
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import { togglePatternPage } from '../reducers/timelineReducer';

export class Patterns extends React.Component {

   componentWillMount() {
    this.props.fetchSongs();
 }

    render() {
        console.log("SONGS----", Array.isArray(this.props.songs))
        return (
            <div id='pattern-modal' className="container">
          
                <div className="row">

                {
                    this.props.songs && this.props.songs.map( (song, idx) => (
                        
                    <div key={idx} className="col-md-3 col-xs-4 single-pattern">
                        {song.songName} by {song.userName}
                    </div>
                        
                        )
                    )
                }

                </div>
            <button onClick={this.props.togglePatternPage}>close</button>
            </div>
        )
    }
}

const mapStateToProps = ({songs}) => ({songs})

export default connect(
    mapStateToProps,
    {togglePatternPage}
    )(Patterns)







                    // <div className="col-md-3 col-xs-4 single-pattern">
                    //     <div className="dummy" style={{backgroundImage:`http://www.clipartkid.com/images/472/neon-musical-notes-background-clipart-panda-free-clipart-images-t8rkdw-clipart.png`}}></div>
                    //     <a href="#" className="thumbnail purple">Songs from backend</a>
                    // </div>
                    // <div className="col-md-3 col-xs-4 single-pattern">
                    //     <div className="dummy" style={{backgroundImage:`http://www.clipartkid.com/images/472/neon-musical-notes-background-clipart-panda-free-clipart-images-t8rkdw-clipart.png`}}></div>
                    //     <a href="#" className="thumbnail purple">Songs from backend</a>
                    // </div>
                    // <div className="col-md-3 col-xs-4 single-pattern">
                    //     <div className="dummy" style={{backgroundImage:`http://www.clipartkid.com/images/472/neon-musical-notes-background-clipart-panda-free-clipart-images-t8rkdw-clipart.png`}}></div>
                    //     <a href="#" className="thumbnail purple">Songs from backend</a>
                    // </div>

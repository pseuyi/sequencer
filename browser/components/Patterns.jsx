import React from 'react'
import THREE from 'three'
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import { deleteSong, togglePatternPage, loadPattern } from '../reducers/timelineReducer';

export class Patterns extends React.Component {
    constructor () {
        super()
        this.loading = this.loading.bind(this);
    }

   componentWillMount() {
        this.props.fetchSongs();
    }

    loading (song) {
        this.props.loadPattern(song)
        this.props.togglePatternPage();
    }

    // deleteSongNow (song){
    //     // this.props.deleteSong(song);
    //     console.log("SONGID ---- DELETE", song)
    // }

    render() {
        console.log("SONGS----", Array.isArray(this.props.songs))
        return (
            <div id='pattern-modal' className="container">
          
                <div className="row">
                <div id='close-btn-container'>
                <button id='close-btn' onClick={this.props.togglePatternPage}>close</button>
            </div>
            </div>

                {
                    this.props.songs && this.props.songs.map( (song, idx) => (
                        

                    <div key={idx} className="col-md-3 col-xs-4 single-pattern" >
                        <span id="span-area" onClick={()=>this.loading(song.events)}>{song.songName} by {song.userName}</span>
                        <p id='xp-btn'><button id='x-btn' onClick={() =>deleteSongNow(song)}>X</button></p>

                    </div>
              
                        
                        )
                    )
                }

                </div>
            
        )
    }
}

const mapStateToProps = ({songs}) => ({songs})

export default connect(
    mapStateToProps,
    {deleteSong, togglePatternPage, loadPattern}
    )(Patterns)

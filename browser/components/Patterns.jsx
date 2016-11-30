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
    }

    deleteSongNow (song){
        // this.props.deleteSong(song);
        console.log("SONGID ---- DELETE", song)
    }

    render() {
        console.log("SONGS----", Array.isArray(this.props.songs))
        return (
            <div id='pattern-modal' className="container">
          
                <div className="row">

                {
                    this.props.songs && this.props.songs.map( (song, idx) => (
                        
                    <div key={idx} className="col-md-3 col-xs-4 single-pattern" >
                        <span onClick={()=>this.loading(song.events)}>{song.songName} by {song.userName}</span>
                        <p><button onClick={this.deleteSongNow(song)}>X</button></p>
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
    {deleteSong, togglePatternPage, loadPattern}
    )(Patterns)

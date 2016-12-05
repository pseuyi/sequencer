import React from 'react'
import THREE from 'three'
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import { deleteSong, togglePatternPage, loadPattern } from '../reducers/timelineReducer';

export class Patterns extends React.Component {
    constructor () {
        super()
        this.state = {
            open: false
        }
        this.loading = this.loading.bind(this);
        this.deleteSongNow = ::this.deleteSongNow
    }

   componentWillMount() {
        this.props.fetchSongs();
    }

    loading (song) {
        this.props.loadPattern(song)
        this.props.togglePatternPage();
    }

    deleteSongNow (song){
        // this.props.deleteSong(song);
        console.log("SONGID ---- DELETE", song)
    }
    toggle = () => {
        this.setState({open: !this.state.open})
    }

    render() {
        // console.log("SONGS----", Array.isArray(this.props.songs))
        return (
            <div id='pattern-modal' className="container">
          
                <div className="row">
                    <div id='close-btn-container'>
                        <p id='pattern-close' onClick={this.props.togglePatternPage}>x</p>
                    </div>
            </div>

                {
                    this.props.songs && this.props.songs.map( (song, idx) => (
                        

                    <div key={idx} className="col-md-3 col-xs-4 single-pattern" onClick={()=>this.loading(song.events)}>
                        {song.songName} by {song.userName}
                        <div id='xp-btn' onClick={this.deleteSongNow(song)}>
                            <p id='x-btn'>x</p>
                        </div>
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

import React from 'react'
import THREE from 'three'
import { connect } from 'react-redux';
import store from '../store';
import * as firebase from 'firebase';
import { setSongRef, clearSongKey, deleteSong, togglePatternPage, loadPattern } from '../reducers/timelineReducer';

export class Patterns extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            loading: true
        }
        this.loading = this.loading.bind(this);
        this.deleteSongNow = ::this.deleteSongNow
    }

   componentWillMount() {
        this.props.fetchSongs();
        this.props.clearSongKey();
    }
   componentDidMount () {
        if(this.state.loading) {
        // runs once to check that firebase has data, then removes the load text
            firebase.database().ref('/songs/').once('value', () => {
                document.getElementById('loadText').remove();
                this.setState({loading: false})
            })
        }  
    }

    loading (song) {
        console.log('SONG BEING LOADED', song)
        this.props.loadPattern(song.events);
        this.props.togglePatternPage();
        this.props.setSongRef(song.key);
    }

    deleteSongNow (song){
        // this.props.deleteSong(song);
        // console.log("SONGID ---- DELETE", song)
    }
    // toggle = () => {
    //     this.setState({open: !this.state.open})
    // }

    render() {
        return (
            <div id='pattern-modal' className="container">
            
                <div className="row">
                    <h1>patterns</h1>
                    <div id='close-btn-container'>
                    { this.state.loading?
                        <div id='loadText'><div className="loading">loading patterns...</div></div> : <div id='loadText'></div>
                    }
                        <button id='pattern-close' onClick={this.props.togglePatternPage}>x</button>
                    </div>
            </div>

                {
                    this.props.songs && this.props.songs.map( (song, idx) => (
                        
                    <div key={idx} className="col-md-3 col-xs-4 single-pattern" onClick={()=>this.loading(song)}>
                        {song.songName} by {song.userName}
                        <button id='x-btn' onClick={this.deleteSongNow(song)}>x</button>
                    </div>

                        )
                    )
                }

                </div>
            
        )
    }
}

const mapStateToProps = ({songKey, songs}) => ({songKey, songs})

export default connect(
    mapStateToProps,
    {deleteSong, togglePatternPage, loadPattern, setSongRef, clearSongKey}
    )(Patterns)

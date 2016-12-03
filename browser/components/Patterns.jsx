import React from 'react'
import THREE from 'three'
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import { deleteSong, togglePatternPage, loadPattern } from '../reducers/timelineReducer';

export class Patterns extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: true
        }
        this.loading = this.loading.bind(this);
    }

   componentWillMount() {
        this.props.fetchSongs();
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
        this.props.loadPattern(song)
        this.props.togglePatternPage();
    }

    // deleteSongNow (song){
    //     // this.props.deleteSong(song);
    //     console.log("SONGID ---- DELETE", song)
    // }

    render() {
        console.log('loading correctly?', this.state.loading)
        return (
            <div id='pattern-modal' className="container">
            
                <div className="row">
                <div id='close-btn-container'>
                { this.state.loading?
                    <div id='loadText' className="loading">loading patterns...</div> : null
                }
                    <button id='close-btn' onClick={this.props.togglePatternPage}>close</button>
                 </div>
            </div>

                {
                    this.props.songs && this.props.songs.map( (song, idx) => (
                        

                    <div key={idx} className="col-md-3 col-xs-4 single-pattern" onClick={()=>this.loading(song.events)}>
                        {song.songName} by {song.userName}
                        <p id='xp-btn'><button id='x-btn' onClick={() =>deleteSongNow(song)}>x</button></p>
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

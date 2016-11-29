import React from 'react'
import THREE from 'three'
console.log('THREE=', THREE)



export default class SongFile extends React.Component {
  
 componentWillMount() {
    this.props.fetchSongs();
 }

    render() {
        console.log("SONGS----", this.props.songs)
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-3 col-sm-4 col-xs-6">
                        <div className="dummy" style={{backgroundImage:`http://www.clipartkid.com/images/472/neon-musical-notes-background-clipart-panda-free-clipart-images-t8rkdw-clipart.png`}}></div>
                        <a href="#" className="thumbnail purple">Songs from backend</a>
                    </div>
                {
                    <div className="col-md-3 col-sm-4 col-xs-6">
                        <div className="dummy"></div>
                        this.props.songs && this.props.songs.map((song, idx) => {
                             <a href="#" className="thumbnail purple">{song.songName}</a>
                        })
                    </div>
                }
                </div>
            </div>
        )
    }
}

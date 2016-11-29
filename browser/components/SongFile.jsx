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
            this.props.songs && this.props.songs.map((song, idx) => {
                <div key={idx}>
                    {song.songName}
                </div>
            })
        )
    }
}

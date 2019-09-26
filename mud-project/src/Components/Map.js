import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { axiosWithAuth } from './axiosWithAuth'
import Fab from '@material-ui/core/Fab';


class Map extends Component {

    state = {
        name: '',
        title: '',
        description: '',
        players: [],
        rooms: [],
        error_msg: '',
    }


    componentDidMount() {

        axiosWithAuth().get('https://lambda-mud-test.herokuapp.com/api/adv/init/')
            .then(res => {
                console.log('INIT RES', res)
                this.setState({
                    name: res.data.name,
                    title: res.data.title,
                    description: res.data.description,
                    players: res.data.players
                })
                return axiosWithAuth().get('https://lambda-mud-test.herokuapp.com/api/adv/rooms/')
            })
            .then(res => {
                console.log('ROOMS RES', res)
                this.setState({
                    rooms: res.data.rooms
                })
            })
            .catch(err => {
                console.log(`Login Error: ${err}`)
            })
    }

    generateMap() {
        // Get all rooms
        // For each room in rooms...
            // Draw the room
            // Draw each exit
    }

    // componentDidMount() {
    //     axiosWithAuth()
    //     .get('https://lambda-mud-test.herokuapp.com/api/adv/init/')
    //     .then(res => {
    //         console.log(res)
    //         this.setState({
    //             name: res.data.name,
    //             title: res.data.title,
    //             description: res.data.description,
    //             players: res.data.players
    //         })
    //     })
    //     .catch(err => {
    //         console.log(`Login Error: ${err}`)
    //     })
    // }

    goDirection = direction => {
        axiosWithAuth()
            .post('https://lambda-mud-test.herokuapp.com/api/adv/move/', direction)
            .then(res => {
                console.log(res)
                this.setState({
                    name: res.data.name,
                    title: res.data.title,
                    description: res.data.description,
                    players: res.data.players,
                    error_msg: res.data.error_msg
                })
            })
            .catch(err => {
                console.log(`Login Error: ${err}`)
            })
    }

    goNorth = e => {
        e.preventDefault()
        const north = {
            'direction': 'n'
        }
        this.goDirection(north)

    }

    goSouth = e => {
        e.preventDefault()
        const south = {
            'direction': 's'
        }
        this.goDirection(south)

    }

    goWest = e => {
        e.preventDefault()
        const west = {
            'direction': 'w'
        }
        this.goDirection(west)

    }

    goEast = e => {
        e.preventDefault()
        const east = {
            'direction': 'e'
        }
        this.goDirection(east)

    }

    render() {
        return (
            <div>
                Mapppppppp
                <h6>{this.state.name}</h6>
                <h6>{this.state.title}</h6>
                <h6>{this.state.description}</h6>
                <h6>Players : {this.state.players.map(player => (
                    <>{player}, </>
                ))}
                </h6>

                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} >
                    <Fab size="medium" color="secondary" onClick={this.goNorth}>N</Fab>
                    <div>
                        <Fab size="medium" color="secondary" style={{ marginRight: "20px" }} onClick={this.goWest}>W</Fab>
                        <Fab size="medium" color="secondary" style={{ marginLeft: "20px" }} onClick={this.goEast}>E</Fab>
                    </div>
                    <Fab size="medium" color="secondary" onClick={this.goSouth}>S</Fab>
                </div>

                <h6>
                    {/* Rooms: {this.state.rooms.map(room => (
                        <> {room.title}, </>
                    ))} */}
                </h6>

            </div>
        );
    }
}

export default withRouter(Map);
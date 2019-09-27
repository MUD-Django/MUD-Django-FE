import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { axiosWithAuth } from './axiosWithAuth'
import Fab from '@material-ui/core/Fab';
import Room from './Room.js';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            title: '',
            description: '',
            players: [],
            rooms: [],
            error_msg: '',
            grid: [],
        }
        this.grid = []
    }



    componentDidMount() {

        axiosWithAuth().get('https://build-week-mud-project.herokuapp.com/api/adv/init/')
            .then(res => {
                console.log('INIT RES', res)
                this.setState({
                    id: res.data.id,
                    name: res.data.name,
                    title: res.data.title,
                    description: res.data.description,
                    players: res.data.players,
                })
                return axiosWithAuth().get('https://build-week-mud-project.herokuapp.com/api/adv/rooms/')
            })
            .then(res => {
                console.log('ROOMS RES', res)
                this.setState({
                    rooms: res.data
                })
                this.generateMap()
            })
            .catch(err => {
                console.log(`Login Error: ${err}`)
            })
    }

    generateMap() {
        let grid = [];
        let counter = 0;

        for (let x = 0; x < 10; x++) {
            grid[x] = []
            for (let y = 0; y < 10; y++) {
                grid[x][y] = null
                counter++
            }
        }
        counter = 0;
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                grid[this.state.rooms[counter].y][this.state.rooms[counter].x] = this.state.rooms[counter]
                counter++
            }
        }
        this.setState({
            grid: grid
        })
        console.log(this.state.grid)
    }

    logOut() {
        localStorage.removeItem("token");
        window.location.reload(false);
        // this.props.history.push('/');
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
            .post('https://build-week-mud-project.herokuapp.com/api/adv/move/', direction)
            .then(res => {
                console.log(res)
                this.setState({
                    id: res.data.id,
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

    getRooms = () => {
        // this.state.grid.map(row => {
        //     return row.map( room => {
        //         console.log(room)
        //         return <Room room = {room} />
        //         })
        // })
    }

    render() {
        // if (this.state.rooms && this.grid.length == 0)
        // this.generateMap()

        return (
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }} >

                <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap-reverse" }}>
                    <div style={{ width: "620px", height: "620px", display: "flex", justifyContent: "center", flexWrap: "wrap-reverse" }}>
                        {this.state.grid.length > 0
                            ?
                            this.state.grid.map(row => {
                                return row.map(room => {
                                    return <Room room={room} id={this.state.id} />  // pass active id 
                                })
                            })
                            :
                            <p>Still Loading</p>
                        }
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", marginLeft: "40px", }}>
                    <button style={{ marginTop: "80px", width: "200px", height: "50px" }} onClick={this.logOut}> Log Out </button>

                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "100px" }} >
                        <Fab size="medium" color="secondary" onClick={this.goNorth}>N</Fab>
                        <div>
                            <Fab size="medium" color="secondary" style={{ marginRight: "20px" }} onClick={this.goWest}>W</Fab>
                            <Fab size="medium" color="secondary" style={{ marginLeft: "20px" }} onClick={this.goEast}>E</Fab>
                        </div>
                        <Fab size="medium" color="secondary" onClick={this.goSouth}>S</Fab>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center",  alignItems: "flex-start", marginTop: "80px", maxWidth: "240px" }}>
                        <h6> My Player: {this.state.name}</h6>
                        <h6> Room: {this.state.title}</h6>
                        <h6> Description: {this.state.description}</h6>
                        <h6> Players in the Room: {this.state.players.map(player => (
                            <>{player}, </>
                        ))}
                        </h6>
                        <h6> {this.state.error_msg} </h6>
                    </div>

                </div>


            </div>
        );
    }
}

export default withRouter(Map);
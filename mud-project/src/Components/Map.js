import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { axiosWithAuth } from './axiosWithAuth'
import Fab from '@material-ui/core/Fab';


class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
                    name: res.data.name,
                    title: res.data.title,
                    description: res.data.description,
                    players: res.data.players
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
                grid[x][y] = this.state.rooms[counter]
                counter ++ 
            }
        }
            this.setState({
                grid: grid
            })
            console.log(this.state.grid)
    }

    

    logOut() {
        localStorage.removeItem("token");
        this.props.history.push('/api/login/');
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
        let rooms = ''

        for (let i = 0; i < this.state.grid.length; i++) {
            for (let j = 0; j < this.state.grid[i].length; j++) {
                rooms = rooms + ` ${this.state.grid[i][j].title} ` 
            }
        }
        return rooms

        // this.state.grid.map( row => {
        //     row.map( room => (
        //         <span key={room.id}> `${room.title}` </span>
        //     ))
        // })

    }

    render() {
        // if (this.state.rooms && this.grid.length == 0)
        // this.generateMap()

        return (
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }} >
                
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div>
                        {/* { this.state.grid.length > 0 ? this.getRooms() : 'Still Populating' } */}

                        { this.state.grid.length > 0 ? this.getRooms() : 'Still Populating' }

                        {/* { this.state.grid.length > 0 ? this.state.grid.map( row => {
                            this.getRooms(row)       
                        }): "Still Populating"} */}
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginLeft: "300px", marginTop: "80px", marginRight: "40px", }}>
                    <button onClick={this.logOut}> Log Out </button>
                    <h6> My Player: {this.state.name}</h6>
                    <h6> Room: {this.state.title}</h6>
                    <h6> Description: {this.state.description}</h6>
                    <h6> Players in the Room: {this.state.players.map(player => (
                        <>{player}, </>
                    ))}
                    </h6>
                    <h6> {this.state.error_msg} </h6>

                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "100px" }} >
                        <Fab size="medium" color="secondary" onClick={this.goNorth}>N</Fab>
                        <div>
                            <Fab size="medium" color="secondary" style={{ marginRight: "20px" }} onClick={this.goWest}>W</Fab>
                            <Fab size="medium" color="secondary" style={{ marginLeft: "20px" }} onClick={this.goEast}>E</Fab>
                        </div>
                        <Fab size="medium" color="secondary" onClick={this.goSouth}>S</Fab>
                    </div>
                </div>
                

            </div>
        );
    }
}

export default withRouter(Map);
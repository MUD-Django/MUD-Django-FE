import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { axiosWithAuth } from './axiosWithAuth'
import Fab from '@material-ui/core/Fab';

class Map extends Component {

    state = {
        name : '',
        title: '',
        description: '',
        players: [],
        error_msg: '',
    }

    componentDidMount() {
        axiosWithAuth()
        .get('https://lambda-mud-test.herokuapp.com/api/adv/init/')
        .then(res => {
            console.log(res)
            this.setState({
                name: res.data.name,
                title: res.data.title,
                description: res.data.description,
                players: res.data.players
            })
        })
        .catch(err => {
            console.log(`Login Error: ${err}`)
        })
    }

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
                <Fab size="medium" color="secondary" onClick={this.goNorth}>N</Fab>
                <Fab size="medium" color="secondary" onClick={this.goEast}>E</Fab>
                <Fab size="medium" color="secondary" onClick={this.goSouth}>S</Fab>
                <Fab size="medium" color="secondary" onClick={this.goWest}>W</Fab>
            </div>
        );
    }
}

export default withRouter(Map);
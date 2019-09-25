import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { axiosWithAuth } from './axiosWithAuth'

class Map extends Component {

    state = {
        name : '',
        title: '',
        description: '',
        players: [] 
    }

    // Buttons for N, S, E, and W
    // if N is clicked, POST to the move endpoint


    // Other players in the room

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
    

    render() {
        return (
            <div>
                Mapppppppp
                <h6>{this.state.name}</h6>
                <h6>{this.state.title}</h6>
                <h6>{this.state.description}</h6>

            </div>
        );
    }
}

export default withRouter(Map);
import React, { Component } from 'react';

class Room extends Component {
    constructor(props){
        super(props)
        this.state= {
            room: null,
            prevRoom: null
            // active
        }
    }

    // if there is a room to the right, print bridge icon

    componentWillMount() {
        this.setState({
            room : this.props.room
        })

    }

    render() {
        let borderRight = this.state.room.e_to === 0? "5px solid cyan" : "5px solid red"
        let borderLeft = this.state.room.w_to === 0? "5px solid cyan" : "5px solid red"
        let borderTop = this.state.room.n_to === 0? "5px solid cyan" : "5px solid red"
        let borderBottom = this.state.room.s_to === 0? "5px solid cyan" : "5px solid red"

        // check active room id to current room id, if matching set active to true
        // change color in render 
        let background = this.props.id === this.state.room.id ? "yellow" : "cyan"
       return <div style={{
            borderRight: borderRight,
            borderLeft: borderLeft,
            borderTop: borderTop,
            borderBottom: borderBottom,
            display:"inline-block", 
            width:"50px", 
            height:"50px", 
            background: background}
            }>
                {/* {this.state.room.id} */} 
            </div>

    }
}
export default Room;
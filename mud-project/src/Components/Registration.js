import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';

const styles = {
    '@global': {
      body: {
        backgroundColor: 'lightgray',
      },
    },
    paper: {
      marginTop: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: '20px',
      backgroundColor: 'pink',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: '20px',
    },
    submit: {
      marginTop: '20px',
    },
  };

class Registration extends Component {
    state = {
        username: '',
        password1: '',
        password2: '',
    }

    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name] : e.target.value
        })
    }

    submitHandler = e =>{
        e.preventdefault();
        const creds = {
            username: this.state.username,
            password1: this.state.password1,
            password2: this.state.password2
        }
        axios
        .post('http://build-week-mud-project.herokuapp.com/api/registration/', creds)
        .then(res => {
            localStorage.setItem('token', res.data.key)
            this.setState({
                username: '',
                password1: '',
                password2: '',
            })
        })
        .catch(err => {
            console.log(`Login Error: ${err}`)
        })


    }

    render() {
        const { classes } = this.props


        return (
            <>
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Registration
                </Typography>
                <form className={classes.form} noValidate>
                <TextField
                    variant="filled"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                    autoFocus
                />
                <TextField
                    variant="filled"
                    margin="normal"
                    required
                    fullWidth
                    name="password1"
                    label="Password"
                    type="password"
                    id="password1"
                    value={this.state.password1}
                    onChange={this.handleChange}
                />
                <TextField
                    variant="filled"
                    margin="normal"
                    required
                    fullWidth
                    name="password2"
                    label="Password"
                    type="password"
                    id="password2"
                    value={this.state.password2}
                    onChange={this.handleChange}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Register
                </Button>
                </form>
            </div>
            </Container>   
            </>
        );
    }
}

export default withStyles(styles)(Registration);
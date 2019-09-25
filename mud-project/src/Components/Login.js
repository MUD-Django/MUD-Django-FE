import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";


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

class Login extends Component {
    state = {
        username: '',
        email: '',
        password: '',
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
            email: this.state.email,
            password: this.state.password
        }
        axios
        .post('http://build-week-mud-project.herokuapp.com/api/login/', creds)
        .then(res => {
            localStorage.setItem('token', res.data.key)
            this.setState({
                username: '',
                email: '',
                password: '',
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
                Log in
                </Typography>
                <form onSubmit={this.submitHandler} className={classes.form} noValidate>
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
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    autoFocus
                />
                <TextField
                    variant="filled"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    autoComplete="current-password"
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Log In
                </Button>
                <Grid container>
                    <Grid item>
                    <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>
                    </Grid>
                </Grid>
                </form>
            </div>
            </Container>   
            </>
        );
    }
}

export default withStyles(styles)(Login);
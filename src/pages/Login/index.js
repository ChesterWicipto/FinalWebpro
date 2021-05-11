import React, { useContext } from 'react'
import {Card} from '@material-ui/core'
import { CardContent, CardActions } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { TextField, Button } from '@material-ui/core'
import { useState } from 'react'
import firebase from '../../config/firebase'
import BackendDataContext from '../../contexts/backendDataContext'
import { useHistory } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const bData = useContext(BackendDataContext)
    const history = useHistory()

    const loginButtonHandler = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(userCredential => {
                firebase.database().ref().child('users').child(userCredential.user.uid).get()
                    .then(snapshot => {
                        if(snapshot.exists()) {
                            const data = snapshot.val()
                            bData.setData({...data, uid: userCredential.user.uid})

                            setEmail('')
                            setPassword('')
                            if(data.owner != undefined) {
                                history.push('/ownerHome')
                            } else {
                                history.push('/home')
                            }
                            
                        } else {
                            alert("Can't find data")
                        }
                    })
                    .catch(error => 
                        alert(error.message)
                    )
            })
            .catch(error => 
                alert(error.message)
            )
    }

    const registerButtonHandler = () => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(userCredential => {
                firebase.database().ref(`users/${userCredential.user.uid}`).set({
                    email: email,
                    password: password,
                    uid: userCredential.user.uid,
                })
                .then(() => {
                    setEmail('')
                    setPassword('')

                    alert("Account Registered Successfully")
                })
                .catch(error => 
                    alert(error.message)
                )
            })
            .catch(error => 
                alert(error.message)
            )
    }

    return (
        <div style={{
            backgroundColor: 'grey',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Card style={{width: 300, height: 380}}>
                <CardContent style={{height: '100%'}}>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly', height: '90%'}}>
                        <Typography variant='h4'>Login</Typography>
                        <TextField variant='outlined' label='E-mail' value={email} onChange={e => setEmail(e.target.value)}/>
                        <TextField type='password' variant='outlined' label='Password' value={password} onChange={e => setPassword(e.target.value)}/>
                        <Button variant='contained' style={{backgroundColor: 'cyan'}} onClick={loginButtonHandler}>Login</Button>
                        <Button variant='contained' style={{backgroundColor: 'red', color: 'white'}} onClick={registerButtonHandler}>Register</Button>
                    </div>
                </CardContent>
                <CardActions>
                </CardActions>
            </Card>
        </div>
    )
}

export default Login

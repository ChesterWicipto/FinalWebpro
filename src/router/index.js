import React from 'react'
import {BrowserRouter as BRouter, Switch, Route} from 'react-router-dom'
import {Login, Owner, Home} from '../pages'

function Router() {
    return (
        <BRouter>
            <Switch>
                <Route exact path='/'>
                    <Login/>
                </Route>
                <Route exact path='/home'>
                    <Home/>
                </Route>
                <Route exact path='/ownerHome'>
                    <Owner/>
                </Route>
            </Switch>
        </BRouter>
    )
}

export default Router

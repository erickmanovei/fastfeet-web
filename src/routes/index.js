import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Delivery from '../pages/Delivery';
import Deliveryman from '../pages/Deliveryman';

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/delivery" isPrivate component={Delivery} />
            <Route path="/deliveryman" isPrivate component={Deliveryman} />
        </Switch>
    );
}

import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Delivery from '../pages/Delivery';
import DeliveryStore from '../pages/Delivery/store';
import Deliveryman from '../pages/Deliveryman';
import DeliverymanStore from '../pages/Deliveryman/store';

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/delivery" isPrivate component={Delivery} />
            <Route
                exact
                path="/delivery/store"
                isPrivate
                component={DeliveryStore}
            />
            <Route path="/delivery/:id" isPrivate component={DeliveryStore} />
            <Route
                exact
                path="/deliveryman"
                isPrivate
                component={Deliveryman}
            />
            <Route
                exact
                path="/deliveryman/store"
                isPrivate
                component={DeliverymanStore}
            />
            <Route
                path="/deliveryman/:id"
                isPrivate
                component={DeliverymanStore}
            />
        </Switch>
    );
}

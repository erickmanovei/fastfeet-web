import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Delivery from '../pages/Delivery';
import DeliveryStore from '../pages/Delivery/store';
import Deliveryman from '../pages/Deliveryman';
import DeliverymanStore from '../pages/Deliveryman/store';
import Recipient from '../pages/Recipient';
import RecipientStore from '../pages/Recipient/store';
import Problem from '../pages/Problem';

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
            <Route exact path="/recipient" isPrivate component={Recipient} />
            <Route
                exact
                path="/recipient/store"
                isPrivate
                component={RecipientStore}
            />
            <Route path="/recipient/:id" isPrivate component={RecipientStore} />
            <Route exact path="/problem" isPrivate component={Problem} />
        </Switch>
    );
}

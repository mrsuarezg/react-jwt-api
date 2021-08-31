import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Overview } from './Overview';
import { Users } from './users';
import { Materials } from './materials';

function Admin({ match }) {
    const { path } = match;

    return (
        <div className="p-4">
            <div className="container">
                <Switch>
                    <Route exact path={path} component={Overview} />
                    <Route path={`${path}/users`} component={Users} />
                    <Route path={`${path}/materials`} component={Materials} />
                </Switch>
            </div>
        </div>
    );
}

export { Admin };
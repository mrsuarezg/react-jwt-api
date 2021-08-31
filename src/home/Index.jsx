import React from 'react';

import { accountService } from '@/_services';

function Home() {
    const user = accountService.userValue;
    
    return (
        <div className="p-4">
            <div className="container">
                <h1>Hola {user.firstName}!</h1>
                <p>Tú estás logueado con React & JWT!!</p>
            </div>
        </div>
    );
}

export { Home };
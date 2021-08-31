import React from 'react';
import { Link } from 'react-router-dom';

function Overview({ match }) {
    const { path } = match;

    return (
        <div>
            <h1>Admin</h1>
            <p>Está sección solo está permitida para los usuarios con rol de admin.</p>
            <p><Link to={`${path}/users`}>Gestión de usuarios</Link></p>
            <p><Link to={`${path}/materials`}>Gestión de materiales</Link></p>
        </div>
    );
}

export { Overview };
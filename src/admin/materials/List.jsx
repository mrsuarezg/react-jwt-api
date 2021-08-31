import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { materialService } from '@/_services';

function List({ match }) {
    const { path } = match;
    const [materials, setMaterials] = useState(null);

    useEffect(() => {
        materialService.getAll().then(x => setMaterials(x));
    }, []);

    function deleteMaterial(id) {
        setMaterials(materials.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        materialService.delete(id).then(() => {
            setMaterials(materials => materials.filter(x => x.id !== id));
        });
    }

    console.log(materials);

    return (
        <div>
            <h1>Materiales</h1>
            <p>Todos los materiales</p>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Añadir material</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '22%' }}>Nombre</th>
                        <th style={{ width: '22%' }}>Descripcion</th>
                        <th style={{ width: '22%' }}>Existencia</th>
                        <th style={{ width: '22%' }}>Proveedor</th>
                        <th style={{ width: '12%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {materials && materials.map(material =>
                        <tr key={material.id}>
                            <td>{material.materialName}</td>
                            <td>{material.description}</td>
                            <td>{material.stock}</td>
                            <td>{JSON.stringify(material.supplier,null,1)}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${material.id}`} className="btn btn-sm btn-primary mr-1">Editar</Link>
                                <button onClick={() => deleteMaterial(material.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={material.isDeleting}>
                                    {material.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Eliminar</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!materials &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <span className="spinner-border spinner-border-lg align-center"></span>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };
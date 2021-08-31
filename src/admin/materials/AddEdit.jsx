import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { materialService, alertService } from '@/_services';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;
    const { path } = match;
    const [suppliers, setSuppliers] = useState(null);

    useEffect(() => {
        materialService.getSuppliers().then(x => setSuppliers(x));
    }, []);
    
    const initialValues = {
        materialName: '',
        description: '',
        stock: '0',
        supplierId: '0'
    };

    const validationSchema = Yup.object().shape({
        materialName: Yup.string()
            .required('Nombre del material es requerido'),
        description: Yup.string()
            .required('Descripción es requerido'),
        stock: Yup.string()
            .required('Existencias es requerido'),
        supplierId: Yup.string()
            .required('Proveedor es requerido')
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        if (isAddMode) {
            createMaterial(fields, setSubmitting);
        } else {
            updateMaterial(id, fields, setSubmitting);
        }
    }

    function createMaterial(fields, setSubmitting) {
        materialService.create(fields)
            .then(() => {
                alertService.success('Material añadido con éxito', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    function updateMaterial(id, fields, setSubmitting) {
        materialService.update(id, fields)
            .then(() => {
                alertService.success('Actualización con éxito', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting, setFieldValue }) => {
                useEffect(() => {
                    if (!isAddMode) {
                        // get user and set form fields
                        materialService.getById(id).then(material => {
                            const fields = ['materialName', 'description', 'stock', 'supplierId'];
                            fields.forEach(field => setFieldValue(field, material[field], false));
                        });
                    }
                }, []);

                return (
                    <Form>
                        <h1>{isAddMode ? 'Añadir Material' : 'Editar Material'}</h1>
                        <div className="form-row">
                            <div className="form-group col">
                                <label>Nombre del Material</label>
                                <Field name="materialName" type="text" className={'form-control' + (errors.materialName && touched.materialName ? ' is-invalid' : '')} />
                                <ErrorMessage name="materialName" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-5">
                                <label>Descripcion</label>
                                <Field name="description" type="text" className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} />
                                <ErrorMessage name="description" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-5">
                                <label>Stock</label>
                                <Field name="stock" type="number" className={'form-control' + (errors.stock && touched.stock ? ' is-invalid' : '')} />
                                <ErrorMessage name="number" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col">
                                <label>Proveedor</label>
                                <Field name="supplierId" as="select" className={'form-control' + (errors.supplierId && touched.supplierId ? ' is-invalid' : '')}>
                                    {suppliers && suppliers.map(supplier =>
                                        <option key={supplier.id} value={supplier.id}>{supplier.companyName}</option>
                                    )};
                                </Field>
                                <ErrorMessage name="role" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Guardar
                            </button>
                            <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancelar</Link>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
}

export { AddEdit };
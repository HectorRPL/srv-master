/**
 * Created by Héctor on 13/11/2017.
 */
import {_} from 'meteor/underscore';
import {MarcasProveedores} from '../marcasProveedores/collection';

const proveedoresHooks = {
    _insertMarcaProveedor(doc) {
        const proveedorId = doc._id;
        MarcasProveedores.insert({proveedorId: proveedorId});
    },

    afterInsertProveedor(doc) {
        this._insertMarcaProveedor(doc);
    }
};

export default proveedoresHooks;
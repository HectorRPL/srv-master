/**
 * Created by Héctor on 03/11/2017.
 */
import {Meteor} from 'meteor/meteor';
import {_} from 'meteor/underscore';

const empleadosHooks = {
    _deleteEmpleado(selector) {
        console.log('selector', selector);
        try {
            // TODO no se ha logrado eliminar el usuario de la collection users
            if (Meteor.isServer) {
                Meteor.users.remove(selector, (err, result)=> {
                    if (err) {
                        console.log('err', err);
                        throw new Meteor.Error(401, 'Error al borrar el empleado, intente mas tarde.', 'empleado-no-borrado');
                    } else {
                        console.log('result', result);
                    }
                });
            }
        } catch (e) {
            console.log(e);
        }
    },
    afterUpdateEmpleado(selector, modifier) {
        if (_.has(modifier.$set, 'activo')) {
            this._deleteEmpleado(selector);
        }
    }
};

export default empleadosHooks;
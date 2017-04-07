/**
 * Created by jvltmtz on 4/04/17.
 */
import {Meteor} from "meteor/meteor";
import {Accounts} from "meteor/accounts-base";
import {Empleados} from "../empleados/collection";
import {DireccionesEmpleados} from "../direcciones/collection";
import {BitacoraLogin} from "../bitacoraLogin/collection";
import {PuestosRoles} from "../catalogos/puestosRoles/collection";
const LOGIN_METHOD = 'login';
const CREATE_USER_METHOD = 'createUser';

if (Meteor.isServer) {

    Accounts.onCreateUser((options, user) => {
        let empleado = {};
        let strDepto = options.profile.departamento;

        if (options.profile) {
            empleado = {
                propietarioId: user._id,
                departamentoId: strDepto,
                nombre: options.profile.nombre,
                tiendaId: options.profile.tiendaId,
                apellidos: options.profile.apellidos,
                nacimientoDia: options.profile.nacimientoDia,
                nacimientoMes: options.profile.nacimientoMes,
                nacimientoAnio: options.profile.nacimientoAnio,
                sexo: options.profile.sexo,
                telefono: options.profile.telefono,
                celular: options.profile.celular
            }
        }

        empleado.propietario = user._id;
        Empleados.insert(empleado, (err, result)=> {
            if (err) {
                throw new Meteor.Error(401, 'Error al crear el empleado, intente mas tarde.', 'empleado-no-creada');
            } else {
                empleado._id = result;
            }
        });

        let direccion = options.profile.direccion;
        direccion.propietario = empleado._id;
        DireccionesEmpleados.insert(direccion, (err) = {
            if(err){
                throw new Meteor.Error(401, 'Error al crear el empleado, intente mas tarde.', 'empleado-no-creada');
            }
        });

        const puesto = PuestosRoles.findOne({_id: strDepto});
        let rolesTemp = JSON.stringify(puesto, ['roles']);
        rolesTemp = rolesTemp.replace('roles', strDepto.toLowerCase());
        user.roles = JSON.parse(rolesTemp);

        return user;
    });

    Accounts.onLogin((result) => {

        if (LOGIN_METHOD === result.methodName) {
            BitacoraLogin.upsert({propietario: result.user._id}, {
                $set: {
                    propietario: result.user._id,
                    fechaLogin: new Date(),
                    conexion: result.connection
                }
            });
        }
    });


}
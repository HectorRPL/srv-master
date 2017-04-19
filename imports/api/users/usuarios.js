/**
 * Created by jvltmtz on 4/04/17.
 */
import {Meteor} from "meteor/meteor";
import {Accounts} from "meteor/accounts-base";
import {Empleados} from "../empleados/collection";
import {Direcciones} from "../direcciones/collection";
import {BitacoraLogin} from "../bitacoraLogin/collection";
import {PuestosRoles} from "../catalogos/puestosRoles/collection";
import {Counters} from "../catalogos/counters/collection";
const LOGIN_METHOD = 'login';
const CREATE_USER_METHOD = 'createUser';

if (Meteor.isServer) {

    Accounts.onCreateUser((options, user) => {
        let empleado = {};
        let noEmpleado = 0;
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
            };

            var findOneAndUpdate = Meteor.wrapAsync(Counters.rawCollection().findOneAndUpdate, Counters.rawCollection());
            try{
                let result = findOneAndUpdate({_id: 'noEmpleado'}, {$inc: {seq: 1}},  {returnOriginal: false, upsert: true});
                noEmpleado = result.value.seq;
            }catch (e){
                throw  new Meteor.Error(401, 'Error al crear el empleado, intente mas tarde.', 'empleado-no-creada');
            }
            empleado.noEmpleado = noEmpleado;

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
        direccion.propietarioId = empleado._id;
        Direcciones.insert(direccion, (err) = {
            if(err){
                throw new Meteor.Error(401, 'Error al crear el empleado, intente mas tarde.', 'empleado-no-creada');
            }
        });

        const puesto = PuestosRoles.findOne({_id: strDepto});
        user.roles = puesto.roles;

        user.username = strDepto.substring(0, 2) + noEmpleado;
        return user;
    });

    Accounts.onLogin((result) => {

        if (LOGIN_METHOD === result.methodName) {
            BitacoraLogin.upsert({_id: result.user._id}, {
                $set: {
                    fechaLogin: new Date(),
                    conexion: result.connection
                }
            });
        }
    });

    Accounts.onLogout((result)=>{
        BitacoraLogin.update({_id: result.user._id}, {$set:{fechaLogout: new Date()}});
    });



}
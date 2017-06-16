/**
 * Created by jvltmtz on 10/03/17.
 */
import "./agregarEmpleado.html";
import {name as Alertas} from "../../../../comun/alertas/alertas";
import {name as ElegirAnio} from "../../../../comun/selects/elegirFechaNacimiento/elegirAnio/elegirAnio";
import {name as ElegitMes} from "../../../../comun/selects/elegirFechaNacimiento/elegirMes/elegirMes";
import {name as ElegitDia} from "../../../../comun/selects/elegirFechaNacimiento/elegirDia/elegirDia";
import {name as FormaDireccion} from "../../../../direccion/formaDireccion/formaDireccion";
import {name as ElegirDepartamento} from "../../../../comun/selects/elegirDepartamento/elegirDepartamento";
import {altaUsuario} from "../../../../../../api/users/methods";

class AgregarEmpleado {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.titulo = 'Agregar Empleado';
        this.pasoActual = 1;
        this.pasoAnterior = 0;
        this.direccion = {};
        this.credentials = {
            profile: {}
        };

    }

    siguiente() {
        this.pasoActual++;
        this.msj = 'Paso de uno del registro completado.';
        this.tipoMsj = 'success';
    }

    // Inserta usuario, empleado y dirreccion empleados
    agregarUsuario() {
        this.tipoMsj = '';
        this.credentials.username = this.credentials.email;
        this.credentials.profile.direccion = this.direccion;
        this.credentials.profile.tiendaId = this.resolve.tiendaId;

        altaUsuario.call(this.credentials, this.$bindToContext((err, result)=> {
            if (err) {
                this.msj = err.reason;
                this.tipoMsj = 'danger';
            } else {
                this.pasoActual++;
                this.msj = 'Registro del empleado se realizó con exito.';
                this.tipoMsj = 'success';

            }
        }));
    }

    cerrar() {
        this.dismiss();
    }

}

const name = 'agregarEmpleado';

// create a module
export default angular
    .module(name, [
        Alertas,
        FormaDireccion,
        ElegirAnio,
        ElegitMes,
        ElegitDia,
        ElegirDepartamento
    ])
    .component(name, {
        templateUrl: `imports/ui/components/tiendas/admonTienda/personal/${name}/${name}.html`,
        controllerAs: name,
        controller: AgregarEmpleado,
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        }
    });

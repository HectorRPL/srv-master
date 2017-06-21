/**
 * Created by jvltmtz on 19/06/17.
 */
import template from "./agregarDatosEmpleado.html";
import {name as ElegirAnio} from "../../../../../comun/selects/elegirFechaNacimiento/elegirAnio/elegirAnio";
import {name as ElegitMes} from "../../../../../comun/selects/elegirFechaNacimiento/elegirMes/elegirMes";
import {name as ElegitDia} from "../../../../../comun/selects/elegirFechaNacimiento/elegirDia/elegirDia";
import {name as FormaDireccion} from "../../../../../comun/formas/formaDireccion/formaDireccion";
import {name as ElegirDepartamento} from "../../../../../comun/selects/elegirDepartamento/elegirDepartamento";
import {Session} from "meteor/session";


class AregarDatosEmpleado {
    constructor($scope, $reactive, $stateParams, $state) {
        'ngInject';
        $reactive(this).attach($scope);
        this.$state = $state;
        this.credentials = {
            profile: {}
        };
    }

    // Inserta usuario, empleado y dirreccion empleados
    siguiente() {
        this.credentials.username = this.credentials.email;
        Session.setPersistent('empleadoNuevo', this.credentials);
        this.$state.go('^.direccion');
    }


}

const name = 'agregarDatosEmpleado';

// create a module
export default angular
    .module(name, [
        FormaDireccion,
        ElegirAnio,
        ElegitMes,
        ElegitDia,
        ElegirDepartamento
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: AregarDatosEmpleado
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.personal.agregar.datosPersonales', {
            url: '/datosPersonales',
            template: '<agregar-datos-empleado></agregar-datos-empleado>'
        });
}
/**
 * Created by jvltmtz on 19/06/17.
 */
import template from "./agregarDatosEmpleado.html";
import {name as FormaDatosPersonales} from "../../../../../comun/formas/formaDatosPersonales/formaDatosPersonales";
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

    // Inserta usuario, empleado y dirreccion productos
    siguiente() {
        this.credentials.username = this.credentials.profile.email;
        this.credentials.email = this.credentials.profile.email;
        delete this.credentials.profile.email;

        Session.setPersistent('empleadoNuevo', this.credentials);
        this.$state.go('^.direccion');
    }


}

const name = 'agregarDatosEmpleado';

// create a module
export default angular
    .module(name, [
        FormaDatosPersonales
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: AregarDatosEmpleado
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.empleados.agregar.datosTemporales', {
            url: '/datosTemporales',
            template: '<agregar-datos-empleado></agregar-datos-empleado>'
        });
}
/**
 * Created by jvltmtz on 19/06/17.
 */
import template from "./agregarDireccionEmpleado.html";
import {altaUsuario} from "../../../../../../../api/users/methods";
import {Session} from "meteor/session";

class AgregarDireccionEmpleado {
    constructor($scope, $reactive, $state, $rootScope, $stateParams) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.titulo = 'AgregarDireccion Empleado';
        this.tiendaId = $stateParams.tiendaId;
        this.rootScope = $rootScope;
        this.credentials =  Session.get('empleadoNuevo');
        this.direccion = {};

    }

    // Inserta usuario, empleado y dirreccion empleados
    guardar() {
        this.tipoMsj = '';
        const direccionFinal = angular.copy(this.direccion);
        delete direccionFinal.colonias;
        this.credentials.profile.direccion = direccionFinal;
        this.credentials.profile.tiendaId = this.tiendaId;

        altaUsuario.callPromise(this.credentials).then(this.$bindToContext(()=> {
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err)=>{
            this.tipoMsj = 'danger';
        }));
    }


}

const name = 'agregarDireccionEmpleado';

// create a module
export default angular
    .module(name, [])
    .component(name, {
        template,
        controllerAs: name,
        controller: AgregarDireccionEmpleado
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.personal.agregar.direccion', {
            url: '/direccion',
            template: '<agregar-direccion-empleado></agregar-direccion-empleado>'
        });
}
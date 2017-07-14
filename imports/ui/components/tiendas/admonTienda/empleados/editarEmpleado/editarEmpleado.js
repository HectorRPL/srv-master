/**
 * Created by Héctor on 11/07/2017.
 */
import {Empleados} from "../../../../../../api/empleados/collection";
import {name as EditarEmpleadoGenerales} from "./editarEmpleadoGenerales/editarEmpleadoGenerales";
import {name as EditarEmpleadoDireccion} from "./editarEmpleadoDireccion/editarEmpleadoDireccion";
import {name as EditarEmpleadoContrasenia} from "./editarEmpleadoContrasenia/editarEmpleadoContrasenia";
import {name as DesactivarEmpleado} from "./desactivarEmpleado/desactivarEmpleado";
import template from "./editarEmpleado.html";

class EditarEmpleado {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);

        this.empleadoId = $stateParams.empleadoId;
        this.tiendaId = $stateParams.tiendaId;

        $scope.oneAtATime = true;

        this.acordeon = [
            {titulo: "Datos Generales", estado: ".generales", icono: 'fa fa-user'},
            {titulo: "Dirección", estado: ".direccion", icono: 'fa fa-map-marker'},
            {titulo: "Contraseña", estado: ".contrasenia", icono: 'fa fa-key'},
            {titulo: "Eliminar", estado: ".desactivar", icono: 'fa fa-trash-o'}

        ];
// /*
        this.subscribe('empleados.porTienda', () => [{_id: this.empleadoId}]);
        this.datosEmpleadoNuevo = {};
        this.helpers({
            empleado(){
                this.datosEmpleadoNuevo = Empleados.findOne({_id: this.empleadoId});
                return angular.copy(this.datosEmpleadoNuevo);
            }
        });
// */
    }
}

const name = 'editarEmpleado';

export default angular
    .module(name, [
        EditarEmpleadoGenerales,
        EditarEmpleadoDireccion,
        EditarEmpleadoContrasenia,
        DesactivarEmpleado
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: EditarEmpleado
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.empleados.editar', {
            url: '/editar',
            template: '<editar-empleado></editar-empleado>',
            abstract: true
        });
}
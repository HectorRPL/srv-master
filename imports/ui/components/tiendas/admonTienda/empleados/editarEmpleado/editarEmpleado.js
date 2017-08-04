/**
 * Created by Héctor on 11/07/2017.
 */
import {Empleados} from "../../../../../../api/empleados/collection";
import {name as EditarEmpleadoGenerales} from "./editarEmpleadoGenerales/editarEmpleadoGenerales";
import {name as EmpleadoDireccion} from "./empleadoDireccion/empleadoDireccion";
import {name as EditarEmpleadoContrasenia} from "./editarEmpleadoContrasenia/editarEmpleadoContrasenia";
import {name as DesactivarEmpleado} from "./desactivarEmpleado/desactivarEmpleado";
import {name as MostrarDireccion} from "../../../../comun/mostrar/mostrarDireccion/mostrarDireccion";
import template from "./editarEmpleado.html";

class EditarEmpleado {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);

        this.empleadoId = $stateParams.empleadoId;
        this.tiendaId = $stateParams.tiendaId;

        $scope.oneAtATime = true;

        this.tabs = [
            {titulo: "Datos Generales", estado: "app.tienda.admon.empleados.editar.generales", icono: 'fa fa-user'},
            {titulo: "Dirección", estado: "app.tienda.admon.empleados.editar.direccion", icono: 'fa fa-map-marker'},
            {titulo: "Contraseña", estado: "app.tienda.admon.empleados.editar.contrasenia", icono: 'fa fa-key'},
            {titulo: "Eliminar", estado: "app.tienda.admon.empleados.editar.desactivar", icono: 'fa fa-trash-o'}

        ];
        this.tab = 0;

        this.subscribe('empleados.porTienda', () => [{_id: this.empleadoId}]);
        this.helpers({
            empleado(){
                return Empleados.findOne({_id: this.empleadoId});
            },
        });

    }
}

const name = 'editarEmpleado';

export default angular
    .module(name, [
        EditarEmpleadoGenerales,
        EmpleadoDireccion,
        EditarEmpleadoContrasenia,
        DesactivarEmpleado,
        MostrarDireccion
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
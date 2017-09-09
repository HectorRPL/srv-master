/**
 * Created by Héctor on 14/04/2017.
 */
import template from "./empleados.html";
import {name as ListaEmpleados} from "./listaEmpleados/listaEmpleados";
import {name as AgregarEmpleado} from "./agregarEmpleado/agregarEmpleado";
import {name as EditarEmpleado} from "./editarEmpleado/editarEmpleado";

class Empleados {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
    }
}

const name = 'empleados';

// create a module
export default angular
    .module(name, [
        ListaEmpleados,
        AgregarEmpleado,
        EditarEmpleado
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: Empleados
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.empleados', {
            url: '/empleados',
            template: '<empleados></empleados>',
            abstract: true
        });
}
/**
 * Created by jvltmtz on 10/03/17.
 */
import "./agregarEmpleado.html";
import {name as Alertas} from "../../../../comun/alertas/alertas";
import {name as AgregarDatosEmpleado} from "./agregarDatosEmpleado/agregarDatosEmpleado";
import {name as AgregarDireccionEmpleado} from "./agregarDireccionEmpleado/agregarDireccionEmpleado";

class AgregarEmpleado {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.titulo = 'Agregar Empleado';
        this.tabs = [
            {titulo: "Datos Personales", estado: ".datosPersonales", icono: 'fa fa-user'},
            {titulo: "Direccion", estado: ".direccion", icono: 'fa fa-cubes'}
        ];

        this.pasoActual = 1;
        this.pasoAnterior = 0;
        this.direccion = {};
    }

    siguiente() {
        this.pasoActual++;
        this.msj = 'Paso de uno del registro completado.';
        this.tipoMsj = 'success';
    }

}

const name = 'agregarEmpleado';

// create a module
export default angular
    .module(name, [
        AgregarDatosEmpleado,
        AgregarDireccionEmpleado,
        Alertas
    ])
    .component(name, {
        templateUrl: `imports/ui/components/tiendas/admonTienda/personal/${name}/${name}.html`,
        controllerAs: name,
        controller: AgregarEmpleado
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.personal.agregar', {
            url: '/agregar',
            template: '<agregar-empleado></agregar-empleado>',
            abstract: true
        });
}
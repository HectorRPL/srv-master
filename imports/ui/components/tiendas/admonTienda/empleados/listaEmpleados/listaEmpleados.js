/**
 * Created by jvltmtz on 19/06/17.
 */
import template from "./listaEmpleados.html";
import {Empleados} from "../../../../../../api/empleados/collection";
import {name as BuscarEmpleado} from "../../../../comun/busquedas/buscarEmpleado/buscarEmpleado";
import {name as MostrarDireccion} from "../../../../comun/mostrar/mostrarDireccion/mostrarDireccion";

class ListaEmpleados {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        $reactive(this).attach($scope);
        this.tiendaId = $stateParams.tiendaId;
        this.perPage = 5;
        this.page = 1;
        this.empleadoSelec = '';
        this.subscribe('empleados.porTienda', ()=>
            [
                {
                    _id: this.getReactively('empleadoSelec._id'),
                    tiendaId: this.tiendaId,
                    activo: true
                },
                {
                    limit: parseInt(this.perPage),
                    skip: parseInt((this.getReactively('page') - 1) * this.perPage)
                }

            ]
        );

        this.helpers({
            empleados(){
                return Empleados.find();
            },
            empleadosCount(){
                return Counts.get('numEmpleados');
            }
        });
    }

    pageChanged(newPage) {
        this.page = newPage;
    }

}

const name = 'listaEmpleados';

export default angular
    .module(name, [
        BuscarEmpleado,
        MostrarDireccion
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: ListaEmpleados
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.empleados.lista', {
            url: '/lista',
            template: '<lista-empleados></lista-empleados>'
        });
}
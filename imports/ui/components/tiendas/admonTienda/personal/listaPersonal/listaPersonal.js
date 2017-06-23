/**
 * Created by jvltmtz on 19/06/17.
 */
import template from "./listaPersonal.html";
import {Empleados} from "../../../../../../api/empleados/collection";
import {name as BuscarEmpleado} from "../../../../comun/busquedas/buscarEmpleado/buscarEmpleado";

class ListaPersonal {
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
                    tiendaId: this.tiendaId
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

const name = 'listaPersonal';

// create a module
export default angular
    .module(name, [
        BuscarEmpleado
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: ListaPersonal
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.personal.lista', {
            url: '/lista',
            template: '<lista-personal></lista-personal>'
        });
}
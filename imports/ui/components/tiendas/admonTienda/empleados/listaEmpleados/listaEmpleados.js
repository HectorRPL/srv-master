/**
 * Created by jvltmtz on 19/06/17.
 */
import template from "./listaEmpleados.html";
import {Empleados} from "../../../../../../api/empleados/collection";
import {name as BuscarEmpleado} from "../../../../comun/busquedas/buscarEmpleado/buscarEmpleado";
import {name as DetallesEmpleados} from "./detallesEmpleados/detallesEmpleados";
// import {name as EditarEmpleadosGenerales} from "../editarEmpleados/editarEmpleadosGenerales/editarEmpleadosGenerales";

class ListaEmpleados {
    constructor($scope, $reactive, $stateParams, $uibModal) {
        'ngInject';
        $reactive(this).attach($scope);
        this.tiendaId = $stateParams.tiendaId;
        this.$uibModal = $uibModal;
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

    abreModalDealles(empleados) {
        var modalInstance = this.$uibModal.open({
            animation: true,
            component: 'DetallesEmpleados',
            backdrop: 'static',
            size: 'xs',
            keyboard: true,
            resolve: {
                empleados: function () {
                    return empleados;
                }
            }

        });
    }

}

const name = 'listaEmpleados';

// create a module
export default angular
    .module(name, [
        BuscarEmpleado,
        DetallesEmpleados,
        // EditarEmpleadosGenerales
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
/**
 * Created by jvltmtz on 19/06/17.
 */
import template from "./listaPersonal.html";
import {Empleados} from "../../../../../../api/empleados/collection";
import {name as BuscarEmpleado} from "../../../../comun/busquedas/buscarEmpleado/buscarEmpleado";
import {name as DetallesPersonal} from "./detallesPersonal/detallesPersonal";
// import {name as EditarPersonalGenerales} from "../editarPersonal/editarPersonalGenerales/editarPersonalGenerales";

class ListaPersonal {
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

    abreModalDealles(personal) {
        var modalInstance = this.$uibModal.open({
            animation: true,
            component: 'DetallesPersonal',
            backdrop: 'static',
            size: 'xs',
            keyboard: true,
            resolve: {
                personal: function () {
                    return personal;
                }
            }

        });
    }

}

const name = 'listaPersonal';

// create a module
export default angular
    .module(name, [
        BuscarEmpleado,
        DetallesPersonal,
        // EditarPersonalGenerales
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
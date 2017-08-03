/**
 * Created by Héctor on 24/07/2017.
 */
import {Comisiones} from "../../../../../../api/comisiones/collection";
import {name as AgregarComision} from "../agregarComision/agregarComision";
import {name as AplicarComision} from "../aplicarComision/aplicarComision";
import {name as EditarComision} from "./editarComision/editarComision";
import {name as BuscarComision} from "../../../../comun/busquedas/buscarComision/buscarComision";
import template from "./listaComisiones.html";

class ListaComisiones {

    constructor($scope, $reactive, $state, $stateParams, $uibModal) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.tiendaId = $stateParams.tiendaId;
        this.$uibModal = $uibModal;
        this.comisionSelec = '';
        this.perPage = 10;
        this.page = 1;

        this.subscribe('comisiones.todos', () =>
            [
                {
                    _id: this.getReactively('comisionSelec._id')
                },
                {
                    limit: parseInt(this.perPage),
                    skip: parseInt((this.getReactively('page') - 1) * this.perPage)
                }
            ]
        );
        this.helpers({
            comisiones() {
                return Comisiones.find();
            },
            comisionesCount(){
                return Counts.get('numComisiones');
            }
        });

    }

    pageChanged(newPage) {
        this.page = newPage;
    }

    crearComision() {
        var modalInstance = this.$uibModal.open({
            animation: true,
            component: 'AgregarComision',
            backdrop: 'static',
            size: 'md',
            keyboard: true
        });
    }

    editarComisionModal(comision) {
        let editarComision = angular.copy(comision);
        var modalInstance = this.$uibModal.open({
            animation: true,
            component: 'EditarComision',
            backdrop: 'static',
            size: 'md',
            keyboard: true,
            resolve: {
                editarComision: function () {
                    return editarComision;
                }
            }
        });
    }

}

const name = 'listaComisiones';

export default angular
    .module(name, [
        AgregarComision,
        AplicarComision,
        EditarComision,
        BuscarComision
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: ListaComisiones,
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.comisiones.lista', {
            url: '/lista',
            template: '<lista-comisiones></lista-comisiones>',
        });
}

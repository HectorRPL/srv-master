/**
 * Created by Héctor on 13/06/2017.
 */
import {Factores} from "../../../../../../api/factores/collection";
import {name as AplicarFactor} from "../aplicar/aplicarFactor";
import {name as AgregarFactor} from "../agregarFactor/agregarFactor";
import template from "./listaFactores.html";

class ListaFactores {

    constructor($scope, $reactive, $state, $stateParams, $uibModal) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.$uibModal = $uibModal;

        this.tiendaId = $stateParams.tiendaId;

        this.factorSelec = '';

        this.perPage = 10;
        this.page = 1;

        this.subscribe('factores.todos', () =>
            [
                {
                    _id: this.getReactively('factorSelec._id')
                },
                {
                    limit: parseInt(this.perPage),
                    skip: parseInt((this.getReactively('page') - 1) * this.perPage)
                }
            ]
        );
        this.helpers({
            factores() {
                return Factores.find();
            },
            factoresCount(){
                return Counts.get('numFactores');
            }
        });

    }

    crearFactor() {
        var modalInstance = this.$uibModal.open({
            animation: true,
            component: 'AgregarFactor',
            backdrop: 'static',
            size: 'md',
            keyboard: true
        });
    }


    pageChanged(newPage) {
        this.page = newPage;
    }

}

const name = 'listaFactores';

export default angular
    .module(name, [
        AplicarFactor,
        AgregarFactor
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: ListaFactores,
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.factores.lista', {
            url: '/lista',
            template: '<lista-factores></lista-factores>',
        });
}

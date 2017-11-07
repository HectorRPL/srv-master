/**
 * Created by Héctor on 13/06/2017.
 */
import {Factores} from "../../../../../../api/factores/collection";
import {name as AplicarFactor} from "../aplicar/aplicarFactor";
import {name as AgregarFactor} from "../agregarFactor/agregarFactor";
import {name as EditarFactor} from "./editarFactor/editarFactor";
import template from "./listaFactores.html";

class ListaFactores {
    constructor($scope, $reactive, $state, $stateParams, $uibModal) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.$uibModal = $uibModal;

        this.tiendaId = $stateParams.tiendaId;

        this.datos = {};
        this.factor = {};

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
    editarFactorModal(factor) {
        this.datos.factores = angular.copy(factor);

        this.factor.nombre        = this.datos.factores.nombre;
        this.factor._id           = this.datos.factores._id;
        this.factor.factorCosto   = this.datos.factores.factorCosto;

        delete this.datos.factores.marcaVieja;
        delete this.datos.factores.nombre;
        delete this.datos.factores.factorCosto;
        delete this.datos.factores.marcaId;
        delete this.datos.factores.activo;
        delete this.datos.factores.fechaCreacion;
        delete this.datos.factores._id;

        this.factor.factores = this.datos.factores;

        factor = this.factor;
        var modalInstance = this.$uibModal.open({
            animation: true,
            component: 'EditarFactor',
            backdrop: 'static',
            size: 'md',
            keyboard: true,
            resolve: {
                factor: function () {
                    return factor;
                }
            }
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
        AgregarFactor,
        EditarFactor
    ])
    .component(name, {
        template: template.default,
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

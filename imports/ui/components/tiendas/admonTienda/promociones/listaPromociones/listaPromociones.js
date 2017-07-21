/**
 * Created by jvltmtz on 7/07/17.
 */
import {Promociones} from "../../../../../../api/promociones/collection";
import {name as AgregarPromocion} from "../agregarPromocion/agregarPromocion";
import {name as AplicarPromocion} from "../aplicar/aplicarPromocion";
import {name as EditarPromocion} from "./editarPromocion/editarPromocion";
import template from "./listaPromociones.html";

class ListaFactores {

    constructor($scope, $reactive, $state, $stateParams, $uibModal) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.tiendaId = $stateParams.tiendaId;
        this.$uibModal = $uibModal;
        this.promocionSelec = '';
        this.perPage = 10;
        this.page = 1;

        this.subscribe('promociones.todos', () =>
            [
                {
                    _id: this.getReactively('promocionSelec._id')
                },
                {
                    limit: parseInt(this.perPage),
                    skip: parseInt((this.getReactively('page') - 1) * this.perPage)
                }
            ]
        );
        this.helpers({
            promociones() {
                return Promociones.find();
            },
            promocionesCount(){
                return Counts.get('numFactores');
            }
        });

    }

    pageChanged(newPage) {
        this.page = newPage;
    }

    crearPromocion() {
        var modalInstance = this.$uibModal.open({
            animation: true,
            component: 'AgregarPromocion',
            backdrop: 'static',
            size: 'md',
            keyboard: true
        });
    }

    editarPromocionModal(promocion) {
        var modalInstance = this.$uibModal.open({
            animation: true,
            component: 'EditarPromocion',
            backdrop: 'static',
            size: 'md',
            keyboard: true,
            resolve: {
                promocion: function () {
                    return promocion;
                }
            }
        });
    }

}

const name = 'listaPromociones';

export default angular
    .module(name, [
        AgregarPromocion,
        AplicarPromocion,
        EditarPromocion
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
        .state('app.tienda.admon.promociones.lista', {
            url: '/lista',
            template: '<lista-promociones></lista-promociones>',
        });
}

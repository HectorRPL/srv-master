/**
 * Created by jvltmtz on 7/07/17.
 */
import {Promociones} from "../../../../../../api/promociones/collection";
import {name as AgregarPromocion} from "../agregarPromocion/agregarPromocion";
import template from "./listaPromociones.html";

class ListaFactores {

    constructor($scope, $reactive, $state, $stateParams, $uibModal) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.tiendaId = $stateParams.tiendaId;
        this.$uibModal = $uibModal;
        this.factorSelec = '';
        this.perPage = 10;
        this.page = 1;

        this.subscribe('promociones.todos', () =>
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

}

const name = 'listaPromociones';

export default angular
    .module(name, [
        AgregarPromocion
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

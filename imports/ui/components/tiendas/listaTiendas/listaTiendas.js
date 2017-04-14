/**
 * Created by jvltmtz on 29/03/17.
 */
import "./listaTiendas.html";
import {Tiendas} from "../../../../api/catalogos/tiendas/collection";
import {name as TituloPrincipal} from '../../comun/tituloPrincipal/tituloPrincipal';
import {name as AgregarTienda} from '../agregarTienda/agregarTienda';

class ListaTiendas {
    constructor($scope, $reactive, $state, $uibModal) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.titulo = 'Tiendas';
        this.$uibModal = $uibModal;
        this.subscribe('tiendas.todas');

        this.helpers({
            tiendas(){
                return Tiendas.find();
            }
        });
    }

    modalAgregar() {
        var modalInstance = this.$uibModal.open({
            animation: true,
            component: 'AgregarTienda',
            backdrop: 'static',
            size: 'md',
            keyboard: true,
        });
    }

}

const name = 'listaTiendas';

// create a module
export default angular
    .module(name, [
        TituloPrincipal,
        AgregarTienda
    ])
    .component(name, {
        templateUrl: `imports/ui/components/tiendas/${name}/${name}.html`,
        controllerAs: name,
        controller: ListaTiendas
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.lista', {
            url: '/lista',
            template: '<lista-tiendas></lista-tiendas>'
        });
}
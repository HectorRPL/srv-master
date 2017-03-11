/**
 * Created by jvltmtz on 8/03/17.
 */
import "./tiendas.html";
import {Tiendas} from "../../../api/catalogos/tiendas/collection";
import {name as TituloPrincipal} from '../comun/tituloPrincipal/tituloPrincipal';
import {name as AgregarTienda} from './agregarTienda/agregarTienda';
import {name as Empleados} from './empleados/empleados';

class TiendasClass {
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

const name = 'tiendas';

// create a module
export default angular
    .module(name, [
        TituloPrincipal,
        AgregarTienda,
        Empleados
    ])
    .component(name, {
        templateUrl: `imports/ui/components/${name}/${name}.html`,
        controllerAs: name,
        controller: TiendasClass
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tiendas', {
            url: '/tiendas',
            template: '<tiendas></tiendas>'
        });
}
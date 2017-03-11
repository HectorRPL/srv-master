/**
 * Created by jvltmtz on 9/03/17.
 */
import "./marcas.html";
import {Marcas} from "../../../api/catalogos/marcas/collection";
import {name as TituloPrincipal} from '../comun/tituloPrincipal/tituloPrincipal';
import {name as AgregarMarca} from './agregarMarca/agregarMarca';

class MarcasClass {
    constructor($scope, $reactive, $state, $uibModal) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.titulo = 'Marcas';
        this.$uibModal = $uibModal;
        this.subscribe('marcas.todas');

        this.helpers({
            marcas(){
                return Marcas.find();
            }
        });
    }

    modalAgregar() {
        var modalInstance = this.$uibModal.open({
            animation: true,
            component: 'AgregarMarca',
            backdrop: 'static',
            size: 'md',
            keyboard: true,
        });
    }

    mdodalAtualizar() {

    }

}

const name = 'marcas';

// create a module
export default angular
    .module(name, [
        TituloPrincipal,
        AgregarMarca
    ])
    .component(name, {
        templateUrl: `imports/ui/components/${name}/${name}.html`,
        controllerAs: name,
        controller: MarcasClass
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.marcas', {
            url: '/marcas',
            template: '<marcas></marcas>'
        });
}

/**
 * Created by jvltmtz on 8/03/17.
 */
import "./proveedores.html";
import {Proveedores} from "../../../api/catalogos/proveedores/collection";
import {name as TituloPrincipal} from '../comun/tituloPrincipal/tituloPrincipal';
import {name as AgregarProveedor} from './agregarProveedor/agregarProveedor';

class ProveedoresClass {
    constructor($scope, $reactive, $state, $uibModal) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.titulo = 'Proveedores';
        this.$uibModal = $uibModal;
        this.subscribe('proveedores.todos');

        this.helpers({
            proveedores(){
                return Proveedores.find();
            }
        });
    }

    modalAgregar() {
        var modalInstance = this.$uibModal.open({
            animation: true,
            component: 'AgregarProveedor',
            backdrop: 'static',
            size: 'md',
            keyboard: false,
        });
    }

    mdodalAtualizar() {

    }

}

const name = 'proveedores';

// create a module
export default angular
    .module(name, [
        TituloPrincipal,
        AgregarProveedor
    ])
    .component(name, {
        templateUrl: `imports/ui/components/${name}/${name}.html`,
        controllerAs: name,
        controller: ProveedoresClass
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.proveedores', {
            url: '/proveedores',
            template: '<proveedores></proveedores>'
        });
}

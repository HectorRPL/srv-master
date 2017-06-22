/**
 * Created by jvltmtz on 22/06/17.
 */
import template from "./listaProveedores.html";
import {Proveedores} from "../../../../api/catalogos/proveedores/collection";
import {name as AgregarProveedor} from '../agregarProveedor/agregarProveedor';
import {buscarProveedor} from "../../../../api/catalogos/proveedores/busquedas";


class ListaProveedores {
    constructor($scope, $reactive, $state, $uibModal) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.titulo = 'Todos los Proveedores';
        this.$uibModal = $uibModal;
        this.proveedorSelec = '';
        this.subscribe('proveedores.todos', ()=> [{_id: this.getReactively('proveedorSelec._id')}] );

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
            keyboard: true,
        });
    }

    buscarProveedor(valor) {
        return buscarProveedor.callPromise({
            nombre: valor
        }).then(function (result) {
            return result;
        });
    }


}

const name = 'listaProveedores';

// create a module
export default angular
    .module(name, [
        AgregarProveedor
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: ListaProveedores
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.proveedores.lista', {
            url: '/lista',
            template: '<lista-proveedores></lista-proveedores>'
        });
}
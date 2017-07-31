/**
 * Created by jvltmtz on 22/06/17.
 */
import {Proveedores} from "../../../../api/catalogos/proveedores/collection";
import {name as MostrarDireccion} from '../../comun/mostrar/mostrarDireccion/mostrarDireccion';
import {name as MostrarDatosFiscales} from '../../comun/mostrar/mostrarDatosFiscales/mostrarDatosFiscales';
import {name as AgregarProveedor} from '../agregarProveedor/agregarProveedor';
import {name as BuscarProveedor} from '../../comun/busquedas/buscarProveedor/buscarProveedor';
import template from "./listaProveedores.html";


class ListaProveedores {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.titulo = 'Todos los Proveedores';
        this.proveedorSelec = '';
        this.perPage = 9;
        this.page = 1;
        this.subscribe('proveedores.todos', () =>
            [
                {
                    _id: this.getReactively('proveedorSelec._id'),
                    activo: true
                },
                {
                    limit: parseInt(this.perPage),
                    skip: parseInt((this.getReactively('page') - 1) * this.perPage)
                }
            ]
        );

        this.helpers({
            proveedores(){
                return Proveedores.find();
            },
            proveedoresCount(){
                return Counts.get('numProveedores');
            }
        });
    }

    pageChanged(newPage) {
        this.page = newPage;
    }
}

const name = 'listaProveedores';

export default angular
    .module(name, [
        MostrarDireccion,
        MostrarDatosFiscales,
        AgregarProveedor,
        BuscarProveedor
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
/**
 * Created by jvltmtz on 29/03/17.
 */
import template from "./listaTiendas.html";
import {Tiendas} from "../../../../api/catalogos/tiendas/collection";
import {name as TituloPrincipal} from '../../comun/tituloPrincipal/tituloPrincipal';
import {name as AgregarTienda} from '../agregarTienda/agregarTienda';
import {name as EditarTienda} from '../editarTienda/editarTienda';
import {name as AgregarSucursal} from '../agregarSucursal/agregarSucursal';
import {name as BuscarTienda} from "../../comun/busquedas/buscarTienda/buscarTienda";
import {name as DetallesTienda} from "./detallesTienda/detallesTienda";

class ListaTiendas {
    constructor($scope, $reactive, $state, $uibModal) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.titulo = 'Tiendas';
        this.$uibModal = $uibModal;
        this.tiendaSelec = '';
        this.perPage = 10;
        this.page = 1;
        this.subscribe('tiendas.todas', ()=>
            [
                {
                    _id: this.getReactively('tiendaSelec._id')
                },
                {
                    limit: parseInt(this.perPage),
                    skip: parseInt((this.getReactively('page') - 1) * this.perPage)
                }
            ]);

        this.helpers({
            tiendas(){
                return Tiendas.find();
            },
            tiendasCount(){
                return Counts.get('numTiendas');
            }
        });
    }

    abreModalDealles(tienda) {
        var modalInstance = this.$uibModal.open({
            animation: true,
            component: 'DetallesTienda',
            backdrop: 'static',
            size: 'xs',
            keyboard: true,
            resolve: {
                tienda: function () {
                    return tienda;
                }
            }

        });
    }


    pageChanged(newPage) {
        this.page = newPage;
    }

}

const name = 'listaTiendas';

export default angular
    .module(name, [
        TituloPrincipal,
        AgregarTienda,
        EditarTienda,
        AgregarSucursal,
        BuscarTienda,
        DetallesTienda
    ])
    .component(name, {
        template,
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
/**
 * Created by jvltmtz on 29/03/17.
 */
import {Tiendas} from "../../../../api/catalogos/tiendas/collection";
import utilsPagination from "angular-utils-pagination";
import {name as TituloPrincipal} from '../../comun/tituloPrincipal/tituloPrincipal';
import {name as MostrarDireccion} from '../../comun/mostrar/mostrarDireccion/mostrarDireccion';
import {name as AgregarTienda} from '../agregarTienda/agregarTienda';
import {name as BuscarTienda} from "../../comun/busquedas/buscarTienda/buscarTienda";
import template from "./listaTiendas.html";

class ListaTiendas {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.titulo = 'Tiendas';

        this.tiendaSelec = '';
        this.perPage = 9;
        this.page = 1;
        this.subscribe('tiendas.todas', () =>
            [
                {
                    _id: this.getReactively('tiendaSelec._id'),
                    activo: true
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

    pageChanged(newPage) {
        this.page = newPage;
    }

}

const name = 'listaTiendas';

export default angular
    .module(name, [
        utilsPagination,
        TituloPrincipal,
        AgregarTienda,
        BuscarTienda,
        MostrarDireccion
    ])
    .component(name, {
        template: template.default,
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
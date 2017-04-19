/**
 * Created by jvltmtz on 29/03/17.
 */
import {obtenerMarcas} from "../../../../../api/catalogos/marcas/methods"
import {name as AgregarFactor} from "./agregarFactor/agregarFactor";
import {name as AplicarFactor} from "./aplicarFactor/aplicarFactor";
import {ProductosInventarios} from "../../../../../api/inventarios/productosInventarios/collection";
import "./factores.html";

class Factores {
    constructor($scope, $reactive, $state, $uibModal, $stateParams) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.titulo = 'Factores';
        this.$uibModal = $uibModal;
        this.tiendaId = $stateParams.tiendaId;
        this.perPage = 50;
        this.page = 1;
        this.marcaSelec = '';
        this.marcas = [];
        this.nombre = '';
        this.subscribe('productosInventarios.tiendaMarca', ()=> [{tiendaId: this.tiendaId,
            marcaId: this.getReactively('marcaSelec._id')},
            {
                limit: parseInt(this.perPage),
                skip: parseInt((this.getReactively('page') - 1) * this.perPage)
            }]
        );
        this.helpers({
            productos(){
                return ProductosInventarios.find();
            },
            productosCount(){
                return Counts.get('numProdsInventarios');
            }
        });

    }

    pageChanged(newPage) {
        this.page = newPage;
    }

    crearFactor() {
        var modalInstance = this.$uibModal.open({
            animation: true,
            component: 'AgregarFactor',
            backdrop: 'static',
            size: 'md',
            keyboard: true
        });
    }

    aplicarFactor() {
        var modalInstance = this.$uibModal.open({
            animation: true,
            component: 'AplicarFactor',
            backdrop: 'static',
            size: 'lg',
            keyboard: true
        });
    }

    buscarMarca(valor) {
        return obtenerMarcas.callPromise({
            marca: valor
        }).then(function (result) {
            console.log(result);
            return result;
        });
    }

}

const name = 'factores';

// create a module
export default angular
    .module(name, [
        AgregarFactor,
        AplicarFactor
    ])
    .component(name, {
        templateUrl: `imports/ui/components/tiendas/admonTienda/${name}/${name}.html`,
        controllerAs: name,
        controller: Factores
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.factores', {
            url: '/:tiendaId/factores',
            template: '<factores></factores>'
        });
}
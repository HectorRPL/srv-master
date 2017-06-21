/**
 * Created by Héctor on 13/04/2017.
 */
import {name as BuscarMarca} from "../../../../comun/busquedas/buscarMarca/buscarMarca";
import {cambioFactorProducto} from "../../../../../../api/inventarios/productosInventarios/methods";
import {name as Alertas} from "../../../../comun/alertas/alertas";
import template from "./aplicarFactorProductos.html";

class AplicarFactorProductos {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);

        this.titulo   = 'Aplicar Factor';
        this.factorId = $stateParams.factorId;
        this.tiendaid = $stateParams.tiendaid;
    }

    aplicar() {
        this.datos = {
            tiendaId:   this.tiendaid,
            productoId: this.prodSelec._id,
            marcaId:    this.marcaSelec._id,
            factorId:   this.factorId
        };

        cambioFactorProducto.call(this.datos, this.$bindToContext((err)=> {
            if (err) {
                this.msj = err.reason;
                this.tipoMsj = 'danger';
            } else {
                this.msj = 'El factor se aplicó exitosamente.';
                this.tipoMsj = 'success';
            }
        }));
    }
}

const name = 'aplicarFactorProductos';

// create a module
export default angular
    .module(name, [
        Alertas,
        BuscarMarca
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: AplicarFactorProductos,
    }).config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.factores.aplicar', {
            url: '/aplicar',
            template: '<aplicar-factor-productos></aplicar-factor-productos>'
        });
}


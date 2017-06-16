/**
 * Created by Héctor on 13/04/2017.
 */
import {name as BuscarMarca} from "../../../../comun/buscarMarca/buscarMarca";
import {cambioFactorProducto} from "../../../../../../api/inventarios/productosInventarios/methods";
import {name as Alertas} from "../../../../comun/alertas/alertas";
import "./aplicarFactorProductos.html";

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

        console.log('Los datos que vamos a enviar son this.datos', this.datos);

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
        templateUrl: `imports/ui/components/tiendas/admonTienda/factores/${name}/${name}.html`,
        controllerAs: name,
        controller: AplicarFactorProductos,
    }).config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.aplicarfactorproductos', {
            url: '/aplicarfactorproductos/:factorId/:tiendaid',
            template: '<aplicar-factor-productos></aplicar-factor-productos>'
        });
}


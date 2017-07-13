/**
 * Created by jvltmtz on 27/06/17.
 */
import {aplicarFactorProductos} from "../../../../../../../api/factores/methods";
import template from "./factorProducto.html";

class FactorProducto {

    constructor($scope, $reactive, $state, $stateParams, $uibModal) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.factorId = $stateParams.factorId;
        this.tiendaId = $stateParams.tiendaId;
        this.$uibModal = $uibModal;
        this.marcaSelec = '';
        this.productoSelec = '';
        this.productosAplicarFac = [];
    }

    agregar(_id, marca, producto) {
        const result = {
            _id: _id,
            marca: marca,
            producto: producto
        };
        const encontrado = this.productosAplicarFac.find((prod)=>{
            return prod._id === result._id;
        });
        if(!encontrado){
            this.productosAplicarFac.push(result);
        }
    }

    aplicarFactor() {
        const datos = {
            factorNuevoId: this.factorId,
            productos: this.productosAplicarFac
        };
        aplicarFactorProductos.callPromise(datos).then(this.$bindToContext(()=> {
            this.productosAplicarFac = [];
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err)=>{
            this.tipoMsj = 'danger';
        }));
    }

    confirmar() {
        var modalInstance = this.$uibModal.open({
            animation: true,
            component: "ConfirmarAplicarFactor",
            backdrop  : 'static'
        }).result.then(this.$bindToContext((result) => {
            this.aplicarFactor();
        }, function (reason) {
            console.log(reason)
        }));
    }


}

const name = 'factorProducto';

export default angular
    .module(name, [

    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: FactorProducto,
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.factores.aplicar.producto', {
            url: '/producto',
            template: '<factor-producto></factor-producto>',
        });
}
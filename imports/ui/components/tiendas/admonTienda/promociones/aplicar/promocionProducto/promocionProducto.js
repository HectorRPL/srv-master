/**
 * Created by jvltmtz on 11/07/17.
 */
import {aplicarFactPromoComiProd} from "../../../../../../../api/inventarios/productosInventarios/methods";
import template from "./promocionProducto.html";

class PromocionProducto {

    constructor($scope, $reactive, $state, $stateParams, $uibModal) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.promocionId = $stateParams.promocionId;
        this.tiendaId = $stateParams.tiendaId;
        this.$uibModal = $uibModal;
        this.marcaSelec = '';
        this.productoSelec = '';
        this.productosAplicarPromo = [];
    }

    agregar(_id, marca, producto) {
        const result = {
            _id: _id,
            marca: marca,
            producto: producto
        };
        const encontrado = this.productosAplicarPromo.find((prod)=>{
            return prod._id === result._id;
        });
        if(!encontrado){
            this.productosAplicarPromo.push(result);
        }
    }

    aplicarPromocion() {
        const datos = {
            nuevoValorId: this.promocionId,
            productos: this.productosAplicarPromo,
            operacion: 'promocionProducto'
        };
        aplicarFactPromoComiProd.callPromise(datos).then(this.$bindToContext(()=> {
            this.productosAplicarPromo = [];
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err)=>{
            console.log(err);
            this.tipoMsj = 'danger';
        }));
    }

    confirmar() {
        var modalInstance = this.$uibModal.open({
            animation: true,
            component: "ConfirmarOperacion",
            backdrop  : 'static',
            resolve: {
                contenido: function () {
                    return {
                        tipoMsj: 'warning',
                        msj: 'Al aplicar una Promocion, uno o varios productos podrian verse afectados en sus precios. ¿Desea continuar con el proceso?'
                    }
                }
            }
        }).result.then(this.$bindToContext((result) => {
            this.aplicarPromocion();
        }, function (reason) {
            console.log(reason)
        }));
    }


}

const name = 'promocionProducto';

export default angular
    .module(name, [

    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: PromocionProducto,
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.promociones.aplicar.producto', {
            url: '/producto',
            template: '<promocion-producto></promocion-producto>',
        });
}
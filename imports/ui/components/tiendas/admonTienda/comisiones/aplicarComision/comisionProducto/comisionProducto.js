/**
 * Created by Héctor on 24/07/2017.
 */
import {aplicarFactPromoComiProd} from "../../../../../../../api/inventarios/productosInventarios/methods";
import {name as BuscarMarca} from "../../../../../comun/busquedas/buscarMarca/buscarMarca";
import {name as BuscarProducto} from "../../../../../comun/busquedas/buscarProducto/buscarProducto";
import template from "./comisionProducto.html";

class ComisionProducto {

    constructor($scope, $reactive, $state, $stateParams, $uibModal) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.comisionId = $stateParams.comisionId;
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

    aplicarComision() {
        const datos = {
            nuevoValorId: this.comisionId,
            productos: this.productosAplicarPromo,
            operacion: 'comisionProducto'
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
                        msj: 'Al aplicar una Comision, uno o varios productos podrian verse afectados en sus precios. ¿Desea continuar con el proceso?'
                    }
                }
            }
        }).result.then(this.$bindToContext((result) => {
            this.aplicarComision();
        }, function (reason) {
            console.log(reason)
        }));
    }


}

const name = 'comisionProducto';

export default angular
    .module(name, [
        BuscarMarca,
        BuscarProducto
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: ComisionProducto,
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.comisiones.aplicar.producto', {
            url: '/producto',
            template: '<comision-producto></comision-producto>',
        });
}
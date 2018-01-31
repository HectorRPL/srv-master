/**
 * Created by Héctor on 31/10/2017.
 */
import {actlzrProdctInvntrPromcnComsnProdct} from "../../../../../../../api/inventarios/productosInventarios/methods";
import template from "./quitarPromocionProducto.html";

class QuitarPromocionProducto {
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

    quitarPromocion() {
        const datos = {
            nuevoValorId: this.promocionId,
            productos: this.productosAplicarPromo,
            operacion: 'quitarPromocion'
        };
        console.log('Asi se envían los datos para quitar la promoción', datos);
        actlzrProdctInvntrPromcnComsnProdct
            .callPromise(datos)
            .then(this.$bindToContext(()=> {
                this.productosAplicarPromo = [];
                this.tipoMsj = 'success';
            }))
            .catch(this.$bindToContext((err)=> {
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
                        msj: 'Al quitar una Promocion, uno o varios productos podrian verse afectados en sus precios. ¿Desea continuar con el proceso?'
                    }
                }
            }
        }).result.then(this.$bindToContext((result) => {
            this.quitarPromocion();
        }, function (reason) {
            console.log(reason)
        }));
    }
}

const name = 'quitarPromocionProducto';

export default angular
    .module(name, [

    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: QuitarPromocionProducto,
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.promociones.quitar.producto', {
            url: '/producto',
            template: '<quitar-promocion-producto></quitar-promocion-producto>',
        });
}
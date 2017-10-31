/**
 * Created by Héctor on 31/10/2017.
 */
import {actlzrProdctInvntrFactrPromcnComsnMarc} from "../../../../../../../api/inventarios/productosInventarios/methods";
import template from "./quitarPromocionMarca.html";

class QuitarPromocionMarca {

    constructor($scope, $reactive, $state, $stateParams, $uibModal) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.promocionId = $stateParams.promocionId;
        this.tiendaId = $stateParams.tiendaId;
        this.$uibModal = $uibModal;
        this.marcaSelec = '';
        this.productoSelec = '';
        this.mostrar = true;
        this.prodsExcepciones = [];
    }

    agregar(_id, marca, producto) {
        const result = {
            _id: _id,
            marca: marca,
            producto: producto
        };
        const encontrado = this.prodsExcepciones.find((prod)=> {
            return prod._id === result._id;
        });
        if (!encontrado) {
            this.prodsExcepciones.push(result);
        }
    }

    quitarPromocion() {
        const datos = {
            tiendaId: this.tiendaId,
            marcaId: this.marcaSelec._id,
            nuevoValorId: this.promocionId,
            excepciones: this.prodsExcepciones,
            operacion: 'quitarPromocionMarca'
        };
        actlzrProdctInvntrFactrPromcnComsnMarc.callPromise(datos).then(this.$bindToContext(()=> {
            this.prodsExcepciones = [];
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err)=> {
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

const name = 'quitarPromocionMarca';

export default angular
    .module(name, [ ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: QuitarPromocionMarca,
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.promociones.quitar.marca', {
            url: '/marca',
            template: '<quitar-promocion-marca></quitar-promocion-marca>',
        });
}
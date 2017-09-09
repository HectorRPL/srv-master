/**
 * Created by Héctor on 24/07/2017.
 */
import {aplicarFactPromoComiMarca} from "../../../../../../../api/inventarios/productosInventarios/methods";
import template from "./comisionMarca.html";

class ComisionMarca {

    constructor($scope, $reactive, $state, $stateParams, $uibModal) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.comisionId = $stateParams.comisionId;
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

    aplicarComision() {
        const datos = {
            tiendaId: this.tiendaId,
            marcaId: this.marcaSelec._id,
            nuevoValorId: this.comisionId,
            excepciones: this.prodsExcepciones,
            operacion: 'comisionMarca'
        };
        aplicarFactPromoComiMarca.callPromise(datos).then(this.$bindToContext(()=> {
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

const name = 'comisionMarca';

export default angular
    .module(name, [])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: ComisionMarca,
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.comisiones.aplicar.marca', {
            url: '/marca',
            template: '<comision-marca></comision-marca>',
        });
}
/**
 * Created by jvltmtz on 27/06/17.
 */
import {actlzrProdctInvntrFactrPromcnComsnMarc} from "../../../../../../../api/inventarios/productosInventarios/methods";
import template from "./factorMarca.html";

class FactorMarca {

    constructor($scope, $reactive, $state, $stateParams, $uibModal) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.factorId = $stateParams.factorId;
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

    aplicarFactor() {
        this.tipoMsj = '';
        const datos = {
            tiendaId: this.tiendaId,
            marcaId: this.marcaSelec._id,
            nuevoValorId: this.factorId,
            excepciones: this.prodsExcepciones,
            operacion: 'factorMarca'
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
                        msj: 'Al aplicar un factor, uno o varios productos podrian verse afectados en sus precios. ¿Desea continuar con el proceso?'
                    }
                }
            }
        }).result.then(this.$bindToContext((result) => {
            this.aplicarFactor();
        }, function (reason) {
            console.log(reason)
        }));
    }


}

const name = 'factorMarca';

export default angular
    .module(name, [ ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: FactorMarca,
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.factores.aplicar.marca', {
            url: '/marca',
            template: '<factor-marca></factor-marca>',
        });
}
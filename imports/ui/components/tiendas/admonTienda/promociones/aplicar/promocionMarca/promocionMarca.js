/**
 * Created by jvltmtz on 11/07/17.
 */
import {aplicarPromocionMarca} from "../../../../../../../api/promociones/methods";
import template from "./promocionMarca.html";

class PromocionMarca {

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

    aplicarFactor() {
        const datos = {
            tiendaId: this.tiendaId,
            marcaId: this.marcaSelec._id,
            promocionNuevaId: this.promocionId,
            excepciones: this.prodsExcepciones
        };
        aplicarPromocionMarca.callPromise(datos).then(this.$bindToContext(()=> {
            this.prodsExcepciones = [];
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err)=> {
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

const name = 'promocionMarca';

export default angular
    .module(name, [ ])
    .component(name, {
        template,
        controllerAs: name,
        controller: PromocionMarca,
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.promociones.aplicar.marca', {
            url: '/marca',
            template: '<promocion-marca></promocion-marca>',
        });
}
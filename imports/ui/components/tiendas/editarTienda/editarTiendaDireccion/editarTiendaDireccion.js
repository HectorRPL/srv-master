/**
 * Created by Héctor on 18/07/2017.
 */
import {Direcciones} from "../../../../../api/direcciones/collection";
import {crearDireccion, actualizarDireccion} from "../../../../../api/direcciones/methods";
import {name as Alertas} from "../../../comun/alertas/alertas";
import {name as FormaDireccion} from "../../../comun/formas/formaDireccion/formaDireccion";
import template from "./editarTiendaDireccion.html";

class EditarTiendaDireccion {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        this.$scope = $scope;
        $reactive(this).attach($scope);

        this.propietarioId = $stateParams.tiendaId;

        this.subscribe('direcciones.todas', () => [{propietarioId: this.propietarioId}]);
        this.helpers({
            direccion(){
                return Direcciones.findOne({propietarioId: this.propietarioId}) || {};
            }
        });
    }

    guardarDireccion() {
        let direccionFinal = angular.copy(this.direccion);
        delete direccionFinal.colonias;
        direccionFinal.propietarioId = this.propietarioId;

        crearDireccion.callPromise(direccionFinal).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err) => {
            this.tipoMsj = 'danger';
        }));
    }

    actualizarDireccion() {
        this.tipoMsj = '';
        let direccionFinal = angular.copy(this.direccion);
        delete direccionFinal.colonias;
        delete direccionFinal.fechaCreacion;

        actualizarDireccion.callPromise(direccionFinal).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err) => {
            this.tipoMsj = 'danger';
        }));
    }
}

const name = 'editarTiendaDireccion';

export default angular
    .module(name, [
        Alertas,
        FormaDireccion
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: EditarTiendaDireccion
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.editar.direccion', {
            url: '/direccion',
            template: '<editar-tienda-direccion></editar-tienda-direccion>'
        });
}
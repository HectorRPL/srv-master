/**
 * Created by jvltmtz on 9/05/17.
 */
import template from "./tiendaDatosFiscales.html";
import {name as Alertas} from "../../../comun/alertas/alertas";
import {altaDatosFiscales} from "../../../../../api/datosFiscales/methods";

class TiendaDatosFiscales {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.tipoMsj = '';
        this.datosFiscales = {
            tipoPersona: 'PM'
        };
        this.propietarioId = $stateParams.tiendaId;
    }

    guardar() {

        this.datosFiscales.propietarioId = this.propietarioId;
        let datosFiscalesFinal = angular.copy(this.datosFiscales);
        delete datosFiscalesFinal.colonias;

        console.log('ESTO ES LO QUE SE VA A ENVIAR', datosFiscalesFinal);

        altaDatosFiscales.call(datosFiscalesFinal, this.$bindToContext((err)=> {
            if (err) {
                this.msj = err.message
                this.tipoMsj = 'danger';
            } else {
                this.msj = 'La operación ha sido exitosa.';
                this.tipoMsj = 'success';
            }
        }));
    }
}

const name = 'tiendaDatosFiscales';

// create a module
export default angular
    .module(name, [
        Alertas
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: TiendaDatosFiscales
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.agregar.fiscales', {
            url: '/fiscales/:tiendaId',
            template: '<tienda-datos-fiscales></tienda-datos-fiscales>'
        });
}

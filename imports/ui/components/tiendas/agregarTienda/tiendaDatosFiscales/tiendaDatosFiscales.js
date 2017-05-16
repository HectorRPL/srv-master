/**
 * Created by jvltmtz on 9/05/17.
 */
import "./tiendaDatosFiscales.html";
import {name as Alertas} from "../../../comun/alertas/alertas";
import {insertarDatosFiscales} from "../../../../../api/datosFiscales/methods";

class TiendaDatosFiscales {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.tipoMsj = '';
        this.datosFiscales = {
            tipoPersona: 'PM'
        };
    }


    guardar() {

        let datosFiscalesFinal = angular.copy(this.datosFiscales);
        delete datosFiscalesFinal.colonias;

        datosFiscalesFinal.propietarioId = this.propietarioId;
        insertarDatosFiscales.call(datosFiscalesFinal, this.$bindToContext((err)=> {
            if (err) {
                console.log(err);
                this.msj = 'Error al crear datos fiscales, llamar a soporte técnico: 55-6102-4884 | 55-2628-5121';
                this.tipoMsj = 'danger';
            } else {
                this.msj = 'Los datos fiscales se guardaron exitosamente, el sistema tardará unos minutos para configurar la base de datos, espere.';
                this.tipoMsj = 'warning';
                this.pasoActual++;
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
        templateUrl: `imports/ui/components/tiendas/agregarTienda/${name}/${name}.html`,
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

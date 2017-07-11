/**
 * Created by jvltmtz on 7/07/17.
 */
import {altaPromocion} from "../../../../../../api/promociones/methods";
import {name as Alertas} from "../../../../comun/alertas/alertas";
import template from "./agregarPromocion.html";

class AgregarPromocion {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.titulo = 'Crear un Promoción';
        this.inlineOptions = {
            //customClass: this.getDayClass(),
            minDate: new Date(),
            showWeeks: true
        };

        this.dateOptions = {
            //dateDisabled: disabled,
            //maxDate: new Date(2030, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

        this.popFechaIni = false;
        this.popFechaFin = false;

        this.promocion = {
            fechaInicio: new Date()
        }
    }

    agregar() {
        console.log(this.promocion);

        altaPromocion.callPromise(this.promocion).then(this.$bindToContext(()=> {
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext(()=> {
            this.tipoMsj = 'danger';
        }));
    }

    cerrar() {
        this.dismiss();
    }

    getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }

    openFechaIni() {
        this.popFechaIni = true;
    }

    openFechaFin() {
        this.popFechaFin = true;
    }

}

const name = 'agregarPromocion';

// create a module
export default angular
    .module(name, [
        Alertas
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: AgregarPromocion,
        bindings: {
            close: '&',
            dismiss: '&'
        }
    });

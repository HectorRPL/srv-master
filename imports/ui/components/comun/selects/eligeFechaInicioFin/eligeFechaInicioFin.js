/**
 * Created by Héctor on 20/07/2017.
 */
import template from "./eligeFechaInicioFin.html";

class EligeFechaInicioFin {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

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

const name = 'eligeFechaInicioFin';

export default angular
    .module(name, [])
    .component(name, {
        template: template.default,
        controllerAs: name,
        bindings: {
            fechaInicio: '=',
            fechaFin: '='
        },
        controller: EligeFechaInicioFin
    });

/**
 * Created by Héctor on 29/03/2017.
 */
import {obtenerColonias} from "../../../../../api/codigosPostales/methods";
import "./codigosPostales.html";

class CodigosPostales {
    constructor($scope) {
        'ngInject';
        this.colonias = {};
        this.direccion = {};
    }
}

const name = 'codigosPostales';
// create a module

export default angular
    .module(name, [])
    .component(name, {
        templateUrl: `imports/ui/components/comun/inputs/${name}/${name}.html`,
        controllerAs: name,
        bindings: {
            direccion: '='
        },
        controller: CodigosPostales
    })
    .directive('cpInvalido', ['$q', function ($q) {
        return {
            restrict: 'EA',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$asyncValidators.cpinvalido = function (modelValue, viewValue) {
                    let codigoPostal = modelValue || viewValue;
                    return obtenerColonias.callPromise({
                        cp: codigoPostal
                    }).then(function (result) {
                        // CONSOLES LOG
                        console.log('Resultado de buscar las colonias', codigoPostal, result);
                        scope.codigosPostales.direccion.colonias = result;
                        if (result.length === 0) {
                            console.log('Entró al IF');
                            scope.codigosPostales.direccion.estado = '';
                            scope.codigosPostales.direccion.delMpio = '';
                            return $q.reject('No encontrado');
                        } else {
                            console.log('Entró al ELSE');
                            scope.codigosPostales.direccion.estado = result[0].estado;
                            scope.codigosPostales.direccion.estadoId = result[0].codigoEstado;
                            scope.codigosPostales.direccion.delMpio = result[0].delegacionMunicipio;
                        }
                    }).catch(function (err) {
                        console.log('Err de buscar las colonias ', codigoPostal, err);
                        return $q.reject('No encontrado');
                    });
                };
            }
        };
    }]);
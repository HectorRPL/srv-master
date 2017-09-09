/**
 * Created by Héctor on 01/08/2017.
 */
import {buscarCuentaContableProveedores} from "../../../../../api/catalogos/proveedores/busquedas";
import uiMask from "angular-ui-mask";
import template from "./cuentaContableProveedores.html";

class CuentaContableProveedores {
    constructor($scope) {
        'ngInject';
        // this.cuentaContable = {};
    }
}

const name = 'cuentaContableProveedores';

export default angular
    .module(name, [
        uiMask
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        bindings: {
            dato: '='
        },
        controller: CuentaContableProveedores
    })
    .directive('buscarCuentaContableProveedores', ['$q', function ($q) {
        return {
            restrict: 'EA',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$asyncValidators.existecta = function (modelValue, viewValue) {
                    let cuentaContable = modelValue || viewValue;
                    return buscarCuentaContableProveedores.callPromise({
                        cc: cuentaContable
                    }).then(function (result) {
                        if (result.length != 0) {
                            return $q.reject('Encontrado');
                        } else {
                            // scope.proveedorDatosGenerales.datos.cuentaContableProveedores = '';
                        }
                    }).catch(function (err) {
                        return $q.reject('No encontrado');
                    });
                };
            }
        };
    }])

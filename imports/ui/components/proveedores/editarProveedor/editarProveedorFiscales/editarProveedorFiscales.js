/**
 * Created by Héctor on 27/06/2017.
 */
import template from "./editarProveedorFiscales.html";
import {name as Alertas} from "../../../comun/alertas/alertas";
import {name as FormaDireccion} from "../../../comun/formas/formaDireccion/formaDireccion";
import {name as FormaDatosFiscales} from "../../../comun/formas/formaDatosFiscales/formaDatosFiscales";
import {cambiosDireccionFiscal} from "../../../../../api/datosFiscales/methods";
import {altaDatosFiscales} from "../../../../../api/datosFiscales/methods";
import {DatosFiscales} from "../../../../../api/datosFiscales/collection";

class EditarProveedorFiscales {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$scope = $scope;
        this.$state = $state;
        $reactive(this).attach($scope);

        this.datosFiscales = {};
        this.muestrarDatosFiscales = false;
        this.ocultarBoton = false;

        this.propietarioId = $stateParams.proveedorId;

        this.tipoMsj = '';

        this.subscribe('datosFiscales.proveedor', () => [{propietarioId: this.propietarioId}]);
        this.helpers({
            datosFiscales(){
                this.datosFiscalesOriginal = DatosFiscales.findOne({propietarioId: this.propietarioId});
                return angular.copy(this.datosFiscalesOriginal);
            }
        });
    }

    editar() {
        this.ocultarBoton = true;
        if (this.datosFiscales === undefined) {
            this.muestrarDatosFiscales = true;
        } else {
            this.muestraSoloDireccion = true;
        }

    }

    actualizar(agregarTiendaFrm) {
        if (this.datosFiscales) {
            this.actualizarDireccion(agregarTiendaFrm);
        } else {
            this.guardarDatosFiscales(agregarTiendaFrm);
        }
    }

    limpiarCampos(agregarTiendaFrm) {
        this.datosFiscalesOriginal = {};
        agregarTiendaFrm.$setPristine();
    }

    actualizarDireccion(agregarTiendaFrm) {
        delete this.datosFiscalesOriginal.colonias;
        delete this.datosFiscalesOriginal._id;
        delete this.datosFiscalesOriginal.tipoPersona;
        delete this.datosFiscalesOriginal.razonSocial;
        delete this.datosFiscalesOriginal.tipoSociedad;
        delete this.datosFiscalesOriginal.apellidoMaterno;
        delete this.datosFiscalesOriginal.apellidoPaterno;
        delete this.datosFiscalesOriginal.segundoNombre;
        delete this.datosFiscalesOriginal.nombre;
        delete this.datosFiscalesOriginal.email;
        delete this.datosFiscalesOriginal.fechaCreacion;

        console.log('ESTOS SON LOS DATOS QUE VAMOS A ENVIAR', this.datosFiscalesOriginal);

        this.datosFiscalesOriginal.propietarioId = this.propietarioId;

        cambiosDireccionFiscal.callPromise(this.datosFiscalesOriginal).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
            this.limpiarCampos(agregarTiendaFrm);
        })).catch(this.$bindToContext((err)=>{
            this.tipoMsj = 'danger';
        }));
    }

    guardarDatosFiscales(agregarTiendaFrm) {
        console.log('ESTO VAMOS A ENVIAR [83]', this.datosFiscalesOriginal);
        delete this.datosFiscalesOriginal.colonias;

        this.datosFiscalesOriginal.propietarioId = this.propietarioId;

        altaDatosFiscales.callPromise(this.datosFiscalesOriginal).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
            this.limpiarCampos(agregarTiendaFrm);
        })).catch(this.$bindToContext((err)=>{
            this.tipoMsj = 'danger';
        }));
    }
}

const name = 'editarProveedorFiscales';

export default angular
    .module(name, [
        Alertas,
        FormaDireccion,
        FormaDatosFiscales
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: EditarProveedorFiscales
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.proveedores.editar.fiscales', {
            url: '/fiscales',
            template: '<editar-proveedor-fiscales></editar-proveedor-fiscales>'
        });
}

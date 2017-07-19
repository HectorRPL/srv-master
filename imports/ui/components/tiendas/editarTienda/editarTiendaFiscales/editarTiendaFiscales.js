/**
 * Created by Héctor on 30/06/2017.
 */
import template from "./editarTiendaFiscales.html";
import {name as Alertas} from "../../../comun/alertas/alertas";
import {name as FormaDireccion} from "../../../comun/formas/formaDireccion/formaDireccion";
import {name as FormaDatosFiscales} from "../../../comun/formas/formaDatosFiscales/formaDatosFiscales";
import {cambiosDireccionFiscal} from "../../../../../api/datosFiscales/methods";
import {altaDatosFiscales} from "../../../../../api/datosFiscales/methods";
import {DatosFiscales} from "../../../../../api/datosFiscales/collection";

class EditarTiendaFiscales {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$scope = $scope;
        this.$state = $state;
        $reactive(this).attach($scope);

        this.datosFiscales = {};
        this.muestrarDatosFiscales = false;
        this.mostrarCampos = false;

        this.propietarioId = $stateParams.tiendaId;

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
        this.mostrarCampos = true;
        if (this.datosFiscales === undefined) {
            this.muestrarDatosFiscales = true;
        } else {

            this.muestraSoloDireccion = true;
        }

    }

    actualizar(editarTiendaFiscalesFrm) {
        if (this.datosFiscales) {
            this.actualizarDireccion(editarTiendaFiscalesFrm);
        } else {
            this.guardarDatosFiscales(editarTiendaFiscalesFrm);
        }
    }

    limpiarCampos(editarTiendaFiscalesFrm) {
        this.datosFiscalesOriginal = {};
        /*todo: la forma datos fiscales no se está limpiando cuando se agregan los datos fiscales por primera vez (lo mismo en proveedores).*/
        editarTiendaFiscalesFrm.$setPristine();
    }

    actualizarDireccion(editarTiendaFiscalesFrm) {
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


        this.datosFiscalesOriginal.propietarioId = this.propietarioId;

        cambiosDireccionFiscal.callPromise(this.datosFiscalesOriginal).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
            this.limpiarCampos(editarTiendaFiscalesFrm);
        })).catch(this.$bindToContext((err)=>{
            this.tipoMsj = 'danger';
        }));

    }

    guardarDatosFiscales(editarTiendaFiscalesFrm) {
        delete this.datosFiscalesOriginal.colonias;

        this.datosFiscalesOriginal.propietarioId = this.propietarioId;
        altaDatosFiscales.call(this.datosFiscalesOriginal, this.$bindToContext((err) => {
            if (err) {
                this.msj = err + 'Error, llamar a soporte técnico: 55-6102-4884 | 55-2628-5121';
                this.tipoMsj = 'danger';
            } else {
                this.msj = 'Los datos fiscales se guardaron exitosamente.';
                this.tipoMsj = 'success';
                this.limpiarCampos(editarTiendaFiscalesFrm);
            }
        }));
    }

}

const name = 'editarTiendaFiscales';

export default angular
    .module(name, [
        Alertas,
        FormaDireccion,
        FormaDatosFiscales
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: EditarTiendaFiscales
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.editar.fiscales', {
            url: '/tiendaFiscales',
            template: '<editar-tienda-fiscales></editar-tienda-fiscales>'
        });
}

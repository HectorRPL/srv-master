/**
 * Created by jvltmtz on 10/08/17.
 */
import {DatosFiscales} from "../../../../../api/datosFiscales/collection";
import {crearDatoFiscal, actualizarDatoFiscal} from "../../../../../api/datosFiscales/methods";
import {name as ElegirTipoSociedad} from "../../selects/elegirTipoSociedad/elegirTipoSociedad";
import {name as FormaDireccion} from "../../../comun/formas/formaDireccion/formaDireccion";
import template from "./formaEditarDatosFiscales.html";

class FormaEditarDatosFiscales {
    constructor($scope, $reactive) {
        'ngInject';
        this.$scope = $scope;
        $reactive(this).attach($scope);


        this.subscribe('datosFiscales.lista', () => [{_id: this.getReactively('datoFiscalId')}]);
        this.helpers({
            datos(){
                return DatosFiscales.findOne({_id: this.getReactively('datoFiscalId')});
            }
        });
    }
    esPersonaMoral() {
        delete this.datos.nombres;
        delete this.datos.apellidos;
        delete this.datos.rfc;
        this.datos.tipoPersona = 'PM';
    }
    esPersonaFisica() {
        delete this.datos.razonSocial;
        delete this.datos.tipoSociedad;
        delete this.datos.rfc;
        this.datos.tipoPersona = 'PF';

    }
    altaDatosFiscales() {
        let datosFiscalesFinal = angular.copy(this.datos);
        delete datosFiscalesFinal.colonias;
        delete datosFiscalesFinal.fechaCreacion;
        datosFiscalesFinal.tiendaId = this.tiendaId;

        crearDatoFiscal.callPromise(datosFiscalesFinal).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err) => {
            console.log(err);
            this.tipoMsj = 'danger';
        }));
    }
    actualizarDatosFiscales() {
        delete this.datos.colonias;
        delete this.datos.fechaCreacion;
        actualizarDatoFiscal.callPromise(this.datos).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err) => {
            this.tipoMsj = 'danger';
        }));
    }
}

const name = 'formaEditarDatosFiscales';

export default angular
    .module(name, [
        ElegirTipoSociedad,
        FormaDireccion
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: FormaEditarDatosFiscales,
        bindings: {
            datoFiscalId: '='
        }
    });
/**
 * Created by Héctor on 03/11/2017.
 */
import {_} from 'meteor/underscore';
import {DatosFiscales} from '../../datosFiscales/collection';

const tiendasHooks = {
    _insertDatosFiscales(doc) {
        if (Meteor.isServer) {
            let datosFiscales = DatosFiscales.findOne({propietarioId: doc.tiendaMatrizId},
                {fields: {_id: 0, fechaCreacion: 0}});

            datosFiscales.propietarioId = doc._id;
            delete datosFiscales._id;

            try {
                DatosFiscales.insert(datosFiscales);

            } catch (e) {
                console.log(e);
            }
        }
    },

    afterInsertTiendas(doc) {
        if (doc.tiendaMatrizId) {
            this._insertDatosFiscales(doc);
        }
    }
};

export default tiendasHooks;
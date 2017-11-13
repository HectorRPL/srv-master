/**
 * Created by Juan on 13/11/2017.
 */
import {_} from 'meteor/underscore';
import {Counters} from "../counters/collection";

const COUNTS = ['EMPLEADOS', 'VENTAS', 'COMPRAS', 'NOTA'];

const comprasEntregasHooks = {
    _insertCounters(doc) {
        COUNTS.forEach((item) => {
            Counters.insert({tiendaId: doc._id, nombre: item});
        });

    },

    afterInsertTienda(doc) {
        this._insertCounters(doc);
    }
};

export default comprasEntregasHooks;
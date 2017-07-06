/**
 * Created by jvltmtz on 28/06/17.
 */
import {_} from "meteor/underscore";
import {check} from "meteor/check";
import {ProductosInventarios} from "./collection";
import {BitaFactoresPromo} from "../../bitacoras/factoresPromo/collection";

const opProductosInvetarios = {
    _updateBitaFactoresPromo(id, operacion) {
        BitaFactoresPromo.insert({usuarioId: Meteor.userId(), operacion: operacion, productoId: id});
    },
    afterUpdateProductoInventario(selector, modifier) {
        check(modifier, {$set: Object});

        if (_.has(modifier.$set, 'factorId')) {
            ProductosInventarios.find(selector).forEach(prod => {
                this._updateBitaFactoresPromo(prod._id, 'aplicar-factor');
            });
        } else if (_.has(modifier.$set, 'promocionId')) {
            ProductosInventarios.find(selector).forEach(prod => {
                this._updateBitaFactoresPromo(prod._id, 'aplicar-promo');
            });
        }
    },
};

export default opProductosInvetarios;
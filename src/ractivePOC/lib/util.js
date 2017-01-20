import $ from 'jquery';
import Moment from 'moment';

const UID_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_'.split('');

export default {
    excludeObjectProperties(obj,props) {
        for (let p in obj) {
            if (props.indexOf(p)>-1)
                delete(obj[p]);
        }
        return obj;
    },
    uid(l=8) {
        let str = '';
        for (let n=0;n<l;n++)
            str+=''+UID_CHARS[Math.floor(Math.random()*(n?UID_CHARS.length:52))];
        return str;
    },
    deepCompare(obj1, obj2) {
        if (typeof obj1 != typeof obj2)
            return false;
        else if ($.isArray(obj1)) {
            if (!$.isArray(obj2) || obj1.length != obj2.length)
                return false;
            if (Object.keys(obj1).length != Object.keys(obj2).length)
                return false;
            for (let p in obj1) {
                if (typeof obj2[p] == 'undefined')
                    return false;
                if (!this.deepCompare(obj1[p],obj2[p]))
                    return false;
            }
            return true;
        }
        else if (obj1 instanceof Moment)
            return obj1.isSame(obj2);
        else if (typeof obj1 == 'object') {
            if (obj1 === null ^ obj2 === null)
                return false;
            if (Object.keys(obj1).length != Object.keys(obj2).length)
                return false;
            for (let p in obj1) {
                if (typeof obj2[p] == 'undefined')
                    return false;
                if (!this.deepCompare(obj1[p],obj2[p]))
                    return false;
            }
            return true;
        }
        return obj1 == obj2;
    }
}
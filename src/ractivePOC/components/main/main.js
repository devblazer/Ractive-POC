import $ from 'jquery';

import Ractive from 'ractive';
import css from './main.scss';
import template from './main.hbs';

import SortableDragList from './../shared/sortable/sortableDragList/sortableDragList.js';
import SortableDragItem from './../shared/sortable/sortableDragItem/sortableDragItem.js';

const Main = Ractive.extend({
    template,
    modifyArrays: true,
    components: {
        SortableDragList,
        SortableDragItem
    },
    data: ()=>{return {
        css,
        list1: [
            {key:0,value:'One'},
            {key:1,value:'Two'},
            {key:2,value:'Three'},
            {key:3,value:'Four'},
            {key:4,value:'Five'},
            {key:5,value:'Six'},
            {key:6,value:'Seven'},
            {key:7,value:'Eight'},
            {key:8,value:'Nine'},
            {key:9,value:'Ten'}
        ],
        list2: [],
        currentDrag: null,
        currentDrop: null,
        currentHolder: null,
        currentPos: null,
        currentInsertPoint: null
    }},

    oninit: function(){
        this.on('SortableDragItem.dragStart',this.handleSortableDragStart);
        this.on('SortableDragItem.dragEnd',this.handleSortableDragEnd);
        this.on('SortableDragList.dragEnter',this.handleSortableDragEnter);
        this.on('SortableDragList.dragOver',this.handleSortableDragOver);
        this.on('SortableDragList.dragLeave',this.handleSortableDragLeave);
        this.on('SortableDragList.dragDrop',this.handleSortableDragDrop);
    },

    handleSortableDragStart: function(ev) {
        this.set('currentDrag',ev.component);
    },

    handleSortableDragEnd: function(ev) {
        this.set('currentDrag',null);
        this.set('currentHolder',null);
        this.set('currentInsertPoint',null);
    },

    handleSortableDragEnter: function(ev) {
        window.setTimeout((()=> {
            this.set('currentDrop', ev.component);
            if (!this.get('currentHolder'))
                this.set('currentHolder', ev.component);
        }).bind(this),1);
    },

    handleSortableDragOver: function(ev) {
        let pos = {x:ev.original.pageX,y:ev.original.pageY};
        this.set('currentPos',pos);

        if (!this.get('currentDrop')) {
            this.set('currentInsertionPoint',null);
            return;
        }
        let destComp = this.getDropBeforeComp();
        this.set('currentInsertPoint', destComp ? destComp.get('key') : this.get('currentDrop').get('key'));
    },

    handleSortableDragLeave: function(ev) {
        this.set('currentDrop',null);
    },

    handleSortableDragDrop: function(ev) {
        ev.original.stopPropagation();
        this.set('currentDrop',ev.component);

        let srcComp = this.get('currentDrag');
        let destComp = this.getDropBeforeComp();

        if (srcComp!=destComp) {
            let srcKey = srcComp.get('key');
            let srcData = this.get(this.get('currentHolder').get('key'));
            let srcObj = srcData.filter(obj=>{return obj.key==srcKey})[0];
            srcData.splice(srcData.indexOf(srcObj),1);
            let destData = this.get(this.get('currentDrop').get('key'));
            let destKey = destComp ? destComp.get('key') : null;
            let dest = destData.filter(obj=>{return obj.key===destKey});
            let destInd = dest.length ? destData.indexOf(dest[0]) : destData.length;
            destData.splice(destInd,0,srcObj);
        }
        this.set('currentHolder',null);
        this.set('currentInsertPoint',null);
    },

    getDropBeforeComp: function() {
        let dropPos = this.get('currentPos');
        if (!this.get('currentDrop'))
            return null;

        return this.get('currentDrop').findAllComponents('SortableDragItem').reduce((aggr,comp)=>{
            let el = $(comp.find('*'));
            return  !aggr && el.offset().top+(el.outerHeight()*0.75) > dropPos.y
                ?comp
                :aggr;
        },null);
    }
});

export default Main;

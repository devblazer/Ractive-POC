import Ractive from 'ractive';
import css from './sortableDragList.scss';
import template from './sortableDragList.hbs';

const SortableDragList = Ractive.extend({
    template,
    data: ()=>{return {
        css,
        isDropping: false
    }},

    oninit: function() {
        this.on('dragEnter',this.handleDragEnter);
        this.on('dragOver',this.handleDragOver);
        this.on('dragLeave',this.handleDragLeave);
    },

    handleDragEnter: function(ev) {
        this.set('isDropping', true);
    },

    handleDragOver: function(ev) {
        ev.original.preventDefault();
        ev.original.dataTransfer.dropEffect = 'move';
    },

    handleDragLeave: function(ev) {
        this.set('isDropping', false)
    },
});

export default SortableDragList;

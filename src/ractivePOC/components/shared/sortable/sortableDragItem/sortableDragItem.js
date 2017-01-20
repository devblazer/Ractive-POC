import Ractive from 'ractive';
import css from './sortableDragItem.scss';
import template from './sortableDragItem.hbs';

const SortableDragItem = Ractive.extend({
    template,
    data: ()=>{return {
        css,
        isDragging: false
    }},

    oninit: function() {
        this.on('dragStart',this.handleDragStart);
        this.on('dragEnd',this.handleDragEnd);
    },

    handleDragStart: function(ev) {
        this.set('isDragging', true);
    },

    handleDragEnd: function(ev) {
        this.set('isDragging', false)
    },

    onDragOver: (inst,ev)=>{
        ev.preventDefault();
        ev.dataTransfer.dropEffect = 'move';
    }
});

export default SortableDragItem;

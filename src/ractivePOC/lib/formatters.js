const FORMATTER = {
    formatPercentage(val){
        if(val == 0){
            return '0';
        }else{
            return Math.round(val)+'%';
        }
    }
};

export default FORMATTER;
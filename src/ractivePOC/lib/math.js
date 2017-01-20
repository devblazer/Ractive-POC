const PROPS = ['E','LN2','LN10','LOG2E','LOG10E','PI','SQRT1_2','SQRT2'];
const METHODS = ['abs','acos','asin','atan','atan2','ceil','cos','exp','floor','log','max','min','pow','random','round','sin','sqrt','tan'];
const UID_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_'.split('');

const MATH = {
    angVec2(ang,dist=1) {
        return [this.sin(this.toRad(ang))*dist, -this.cos(this.toRad(ang))*dist];
    },
    vec2Ang(x,y) {
        let dist = this.vec2Length(x,y);
        let ang = this.fromRad(this.acos(-y/dist));
        if (x<0)
            ang*=-1;
        return [ang,dist];
    },
    normalizeVec2(x,y) {
        let dist = this.vec2Length(x,y);
        return [x/dist, y/dist];
    },
    normalizeAng(ang) {
        while (ang<=-180)
            ang+=360;
        while (ang>180)
            ang-=360;
        return ang;
    },
    vec2Length(x,y) {
        return this.sqrt(this.pow(x,2)+this.pow(y,2));
    },
    toRad(ang) {
        return ang * this.RAD;
    },
    fromRad(ang) {
        return ang / this.RAD;
    },
    lineAngle(x1,y1,x2,y2) {
        return this.vec2Ang(x2-x1,y2-y1);
    },
    vec2Add(x1,y1,x2,y2) {
        return [x1+x2,y1+y2];
    },
    vec2Sub(x1,y1,x2,y2) {
        return [x1-x2,y1-y2];
    },
    vec2Scale(x,y,s) {
        return [x*s,y*s];
    },
    uptoFixed(val,places) {
        places = Math.pow(10,places);
        return Math.floor(val*places)/places;
    },
    uid(l=32) {
        let str = '';
        for (let n=0;n<l;n++)
            str += UID_CHARS[Math.floor(this.random()*UID_CHARS.length)];
        return str;
    }
};
Object.defineProperty(MATH,'RAD',{
    value: Math.PI/180,
    writable: false
});

PROPS.forEach(prop=>{
    Object.defineProperty(MATH,prop,{
        value: Math[prop],
        writable: false
    });
});
METHODS.forEach(method=>{
    MATH[method] = Math[method];
});

export default MATH;
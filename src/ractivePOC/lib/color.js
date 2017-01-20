import Math from './math.js';

const LETTERS = ['r','g','b','a'];

const padLeft = function(str,pad,length){
    while (str.length<length)
        str = pad+str;
    return str;
};

const TYPES = ['rgb','int','float','hex'];
const clearTypes = function(notType){
    const p = this._private;
    TYPES.forEach(type=>{
        p[type+'Set'] = type==notType;
    });
};

const hue2rgb = function(p, q, t){
    if(t < 0) t += 1;
    if(t > 1) t -= 1;
    if(t < 1/6) return p + (q - p) * 6 * t;
    if(t < 1/2) return q;
    if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
};


const COLORS = {
    AliceBlue: "#F0F8FF",
    AntiqueWhite: "#FAEBD7",
    Aqua: "#00FFFF",
    Aquamarine: "#7FFFD4",
    Azure: "#F0FFFF",
    Beige: "#F5F5DC",
    Bisque: "#FFE4C4",
    Black: "#000000",
    BlanchedAlmond: "#FFEBCD",
    Blue: "#0000FF",
    BlueViolet: "#8A2BE2",
    Brown: "#A52A2A",
    BurlyWood: "#DEB887",
    CadetBlue: "#5F9EA0",
    Chartreuse: "#7FFF00",
    Chocolate: "#D2691E",
    Coral: "#FF7F50",
    CornflowerBlue: "#6495ED",
    Cornsilk: "#FFF8DC",
    Crimson: "#DC143C",
    Cyan: "#00FFFF",
    DarkBlue: "#00008B",
    DarkCyan: "#008B8B",
    DarkGoldenRod: "#B8860B",
    DarkGray: "#A9A9A9",
    DarkGreen: "#006400",
    DarkGrey: "#A9A9A9",
    DarkKhaki: "#BDB76B",
    DarkMagenta: "#8B008B",
    DarkOliveGreen: "#556B2F",
    DarkOrange: "#FF8C00",
    DarkOrchid: "#9932CC",
    DarkRed: "#8B0000",
    DarkSalmon: "#E9967A",
    DarkSeaGreen: "#8FBC8F",
    DarkSlateBlue: "#483D8B",
    DarkSlateGray: "#2F4F4F",
    DarkSlateGrey: "#2F4F4F",
    DarkTurquoise: "#00CED1",
    DarkViolet: "#9400D3",
    DeepPink: "#FF1493",
    DeepSkyBlue: "#00BFFF",
    DimGray: "#696969",
    DimGrey: "#696969",
    DodgerBlue: "#1E90FF",
    FireBrick: "#B22222",
    FloralWhite: "#FFFAF0",
    ForestGreen: "#228B22",
    Fuchsia: "#FF00FF",
    Gainsboro: "#DCDCDC",
    GhostWhite: "#F8F8FF",
    Gold: "#FFD700",
    GoldenRod: "#DAA520",
    Gray: "#808080",
    Green: "#008000",
    GreenYellow: "#ADFF2F",
    Grey: "#808080",
    HoneyDew: "#F0FFF0",
    HotPink: "#FF69B4",
    IndianRed: "#CD5C5C",
    Indigo: "#4B0082",
    Ivory: "#FFFFF0",
    Khaki: "#F0E68C",
    Lavender: "#E6E6FA",
    LavenderBlush: "#FFF0F5",
    LawnGreen: "#7CFC00",
    LemonChiffon: "#FFFACD",
    LightBlue: "#ADD8E6",
    LightCoral: "#F08080",
    LightCyan: "#E0FFFF",
    LightGoldenRodYellow: "#FAFAD2",
    LightGray: "#D3D3D3",
    LightGreen: "#90EE90",
    LightGrey: "#D3D3D3",
    LightPink: "#FFB6C1",
    LightSalmon: "#FFA07A",
    LightSeaGreen: "#20B2AA",
    LightSkyBlue: "#87CEFA",
    LightSlateGray: "#778899",
    LightSlateGrey: "#778899",
    LightSteelBlue: "#B0C4DE",
    LightYellow: "#FFFFE0",
    Lime: "#00FF00",
    LimeGreen: "#32CD32",
    Linen: "#FAF0E6",
    Magenta: "#FF00FF",
    Maroon: "#800000",
    MediumAquaMarine: "#66CDAA",
    MediumBlue: "#0000CD",
    MediumOrchid: "#BA55D3",
    MediumPurple: "#9370DB",
    MediumSeaGreen: "#3CB371",
    MediumSlateBlue: "#7B68EE",
    MediumSpringGreen: "#00FA9A",
    MediumTurquoise: "#48D1CC",
    MediumVioletRed: "#C71585",
    MidnightBlue: "#191970",
    MintCream: "#F5FFFA",
    MistyRose: "#FFE4E1",
    Moccasin: "#FFE4B5",
    NavajoWhite: "#FFDEAD",
    Navy: "#000080",
    OldLace: "#FDF5E6",
    Olive: "#808000",
    OliveDrab: "#6B8E23",
    Orange: "#FFA500",
    OrangeRed: "#FF4500",
    Orchid: "#DA70D6",
    PaleGoldenRod: "#EEE8AA",
    PaleGreen: "#98FB98",
    PaleTurquoise: "#AFEEEE",
    PaleVioletRed: "#DB7093",
    PapayaWhip: "#FFEFD5",
    PeachPuff: "#FFDAB9",
    Peru: "#CD853F",
    Pink: "#FFC0CB",
    Plum: "#DDA0DD",
    PowderBlue: "#B0E0E6",
    Purple: "#800080",
    RebeccaPurple: "#663399",
    Red: "#FF0000",
    RosyBrown: "#BC8F8F",
    RoyalBlue: "#4169E1",
    SaddleBrown: "#8B4513",
    Salmon: "#FA8072",
    SandyBrown: "#F4A460",
    SeaGreen: "#2E8B57",
    SeaShell: "#FFF5EE",
    Sienna: "#A0522D",
    Silver: "#C0C0C0",
    SkyBlue: "#87CEEB",
    SlateBlue: "#6A5ACD",
    SlateGray: "#708090",
    SlateGrey: "#708090",
    Snow: "#FFFAFA",
    SpringGreen: "#00FF7F",
    SteelBlue: "#4682B4",
    Tan: "#D2B48C",
    Teal: "#008080",
    Thistle: "#D8BFD8",
    Tomato: "#FF6347",
    Turquoise: "#40E0D0",
    Violet: "#EE82EE",
    Wheat: "#F5DEB3",
    White: "#FFFFFF",
    WhiteSmoke: "#F5F5F5",
    Yellow: "#FFFF00",
    YellowGreen: "#9ACD32"
};

const rgb2float = function(){
    const p = this._private;
    p.rf = p.r/255;
    p.gf = p.g/255;
    p.bf = p.b/255;
    p.af = p.a/255;
    p.floatSet = true;
};
const float2rgb = function(){
    const p = this._private;
    p.r = Math.round(p.rf*255);
    p.g = Math.round(p.gf*255);
    p.b = Math.round(p.bf*255);
    p.a = Math.round(p.af*255);
    p.rgbSet = true;
};

const prepRGB = function(){
    const p = this._private;
    if (p.rgbSet)
        return;

    if (p.floatSet)
        float2rgb.call(this);
    else {
        let a;
        if (p.hexSet)
            a = Color.hex2rgb(p.hex);
        else if (p.intSet)
            a = Color.int2rgb(p.int);
        else if (p.hslSet)
            a = Color.hsl2rgb(p.h,p.s,p.l);
        else if (p.cmykSet)
            a = Color.cmyk2rgb(p.h,p.s,p.l);
        else
            a = [0,0,0,1];
        p.r = a[0];
        p.g = a[1];
        p.b = a[2];
        if (a.length>3)
            p.ai = a[3];
    }
    p.rgbSet = true;
};

const prepHex = function(){
    const p = this._private;
    if (p.hexSet)
        return;

    if (p.rgbSet || p.floatSet) {
        if (!p.rgbSet)
            float2rgb.call(this);
        p.hex = Color.rgb2hex(p.r, p.g, p.b, p.aUsed ? p.ai : null);
    }
    else if (p.intSet)
        p.hex = Color.int2hex(p.int);
    else {
        prepRGB.call(this);
        p.hex = Color.rgb2hex(p.r, p.g, p.b, p.aUsed ? p.ai : null);
    }
    p.hexSet = true;
};

const prepInt = function(){
    const p = this._private;
    if (p.intSet)
        return;

    if (p.rgbSet || p.floatSet) {
        if (!p.rgbSet)
            float2rgb.call(this);
        p.int = Color.rgb2int(p.r, p.g, p.b, p.aUsed ? p.ai : null);
    }
    else if (p.hexSet)
        p.int = Color.hex2int(p.hex);
    else {
        prepRGB.call(this);
        p.hex = Color.rgb2int(p.r, p.g, p.b, p.aUsed ? p.ai : null);
    }
    p.intSet = true;
};

const prepFloat = function(){
    const p = this._private;
    if (p.floatSet)
        return;

    prepRGB.call(this);
    rgb2float.call(this);
    p.floatSet = true;
};

const prepHSL = function(){
    const p = this._private;
    if (p.hslSet)
        return;

    prepRGB.call(this);
    const hsl = Color.rgb2hsl(this.r,p.g,p.b);
    p.h = hsl[0];
    p.s = hsl[1];
    p.l = hsl[2];
    p.hslSet = true;
};

const prepCMYK = function(){
    const p = this._private;
    if (p.cmkySet)
        return;

    prepRGB.call(this);
    const cmyk = Color.rgb2cmyk(this.r,p.g,p.b);
    p.c = cmyk[0];
    p.m = cmyk[1];
    p.y = cmyk[2];
    p.k = cmyk[3];
    p.cmykSet = true;
};

const prep = function(){
    const p = this._private;
    if (p.rgbSet)
        return;

    if (p.floatSet)
        float2rgb.call(this);
    else if (p.hexSet) {
        let a = Color.hex2rgb(p.hex);
        p.r = a[0];
        p.g = a[1];
        p.b = a[2];
        if (a.length>3)
            p.ai = a[3];
    }
    else if (p.intSet) {
        let a = Color.int2rgb(p.int);
        p.r = a[0];
        p.g = a[1];
        p.b = a[2];
        if (a.length>3)
            p.ai = a[3];
    }
    p.rgbSet = true;
};

export default class Color {
    constructor(r_int_hex_color=null,g_a=null,b=null,a=null){
        const p = this._private = {
            rf:0,
            gf:0,
            bf:0,
            af:1,
            r:0,
            b:0,
            g:0,
            a:255,
            h:0,
            s:0,
            l:0,
            c:0,
            m:0,
            y:0,
            k:0,
            int:0,
            hex:'',
            aUsed:false,
            rgbSet:false,
            floatSet:false,
            intSet:false,
            hexSet:false,
            hslSet:false,
            cmykSet:false
        };

        if (r_int_hex_color && typeof r_int_hex_color == 'object') {
            if (r_int_hex_color.a)
                a = r_int_hex_color.a;
            if (r_int_hex_color.af)
                a = r_int_hex_color.af;
            b = r_int_hex_color.b;
            g_a = r_int_hex_color.g;
            r_int_hex_color = r_int_hex_color.r;
        }
        if (typeof r_int_hex_color=='string') {
            if (COLORS[r_int_hex_color])
                this.hex = COLORS[r_int_hex_color];
            else
                this.hex = r_int_hex_color;
            if (g_a !== null)
                this['a'+(g_a>1?'i':'f')] = g_a;
        }
        else if (r_int_hex_color!==null) {
            if (b===null) {
                this.int = r_int_hex_color;
                if (g_a !== null)
                    this['a'+(g_a>1?'i':'f')] = g_a;
            }
            else {
                const suffix = (r_int_hex_color<=1 && g_a<=1 && b<=1) ? 'f' : '';
                this['r'+suffix] = r_int_hex_color;
                p['g'+suffix] = g_a;
                p['b'+suffix] = b;
                if (a !== null) {
                    if (!suffix)
                        p.a = a > 1 ? a : a*255;
                    else
                        p.a = a > 1 ? a/255 : a;
                }
            }
        }
        else
            this.r = 0;
    }

    get vec3(){
        const p = this._private;
        return [this.rf,p.gf,p.bf];
    }
    get vec4(){
        const p = this._private;
        return [this.rf,p.gf,p.bf,p.af];
    }
    get rgb(){
        const p = this._private;
        return [this.r,p.g,p.b];
    }
    get rgba(){
        const p = this._private;
        return [this.r,p.g,p.b,p.a];
    }
    get r(){
        prepRGB.call(this);
        return this._private.r;
    }
    get g(){
        prepRGB.call(this);
        return this._private.g;
    }
    get b(){
        prepRGB.call(this);
        return this._private.b;
    }
    get a(){
        prepRGB.call(this);
        return this._private.a;
    }
    get c(){
        prepCMYK.call(this);
        return this._private.c;
    }
    get m(){
        prepCMYK.call(this);
        return this._private.m;
    }
    get y(){
        prepCMYK.call(this);
        return this._private.y;
    }
    get k(){
        prepCMYK.call(this);
        return this._private.k;
    }
    get h(){
        prepHSL.call(this);
        return this._private.h;
    }
    get s(){
        prepHSL.call(this);
        return this._private.s;
    }
    get l(){
        prepHSL.call(this);
        return this._private.l;
    }
    get rf(){
        prepFloat.call(this);
        return this._private.rf;
    }
    get gf(){
        prepFloat.call(this);
        return this._private.gf;
    }
    get bf(){
        prepFloat.call(this);
        return this._private.bf;
    }
    get af(){
        prepFloat.call(this);
        return this._private.af;
    }
    get hex(){
        prepHex.call(this);
        return this._private.hex;
    }
    get int(){
        prepInt.call(this);
        return this._private.int;
    }
    get css(){
        return 'RGBA('+Math.round(this.r)+','+Math.round(this.g)+','+Math.round(this.b)+','+Math.uptoFixed(this.af,2)+')';
        prepInt.call(this);
        return this._private.int;
    }

    set vec3(val){
        const p = this._private;
        this.rf = val[0];
        p.gf = val[1];
        p.bf = val[2];
    }
    set vec4(val){
        const p = this._private;
        this.rf = val[0];
        p.gf = val[1];
        p.bf = val[2];
        p.af = val[3];
    }
    set r(val){
        const p = this._private;
        prepRGB.call(this);
        p.r = val;
        clearTypes.call(this,'rgb');
    }
    set g(val){
        prepRGB.call(this);
        const p = this._private;
        p.g = val;
        clearTypes.call(this,'rgb');
    }
    set b(val){
        prepRGB.call(this);
        const p = this._private;
        p.b = val;
        clearTypes.call(this,'rgb');
    }
    set a(val){
        prepRGB.call(this);
        const p = this._private;
        p.a = val;
        clearTypes.call(this,'rgb');
    }
    set c(val){
        prepCMYK.call(this);
        const p = this._private;
        p.c = val;
        clearTypes.call(this,'cmyk');
    }
    set m(val){
        prepCMYK.call(this);
        const p = this._private;
        p.m = val;
        clearTypes.call(this,'cmyk');
    }
    set y(val){
        prepCMYK.call(this);
        const p = this._private;
        p.y = val;
        clearTypes.call(this,'cmyk');
    }
    set k(val){
        prepCMYK.call(this);
        const p = this._private;
        p.k = val;
        clearTypes.call(this,'cmyk');
    }
    set h(val){
        prepHSL.call(this);
        const p = this._private;
        p.h = val;
        clearTypes.call(this,'hsl');
    }
    set s(val){
        prepHSL.call(this);
        const p = this._private;
        p.s = val;
        clearTypes.call(this,'hsl');
    }
    set l(val){
        prepHSL.call(this);
        const p = this._private;
        p.l = val;
        clearTypes.call(this,'hsl');
    }
    set rf(val){
        prepFloat.call(this);
        const p = this._private;
        p.rf = val;
        clearTypes.call(this,'float');
    }
    set gf(val){
        prepFloat.call(this);
        const p = this._private;
        p.gf = val;
        clearTypes.call(this,'float');
    }
    set bf(val){
        prepFloat.call(this);
        const p = this._private;
        p.bf = val;
        clearTypes.call(this,'float');
    }
    set af(val){
        prepFloat.call(this);
        const p = this._private;
        p.af = val;
        p.aUsed = true;
        clearTypes.call(this,'float');
    }
    set hex(val){
        prepHex.call(this);
        const p = this._private;
        p.hex = val.replace(/^#/,'');
        clearTypes.call(this,'hex');
    }
    set int(val){
        prepInt.call(this);
        const p = this._private;
        p.int = val;
        clearTypes.call(this,'int');
    }

    hasAlpha(){
        return this._private.aUsed;
    }
    merge(color){
        if (!(color instanceof Color))
            color = new Color(color);
        const p = this._private;

        this.r+=color.r;
        p.g+=color.g;
        p.b+=color.b;
        p.a+=color.a;
        p.r/=2;
        p.g/=2;
        p.b/=2;
        p.a/=2;
    }
    customMerge(color,rate=0.5){
        if (!(color instanceof Color))
            color = new Color(color);
        const p = this._private;

        this.r = (this.r*(1-rate))+(color.r*rate);
        p.g = (p.g*(1-rate))+(color.g*rate);
        p.b = (p.b*(1-rate))+(color.b*rate);
        p.f = (p.f*(1-rate))+(color.f*rate);
    }
    mix(color){
        if (!(color instanceof Color))
            color = new Color(color);
        const p = this._private;

        const sa = this.af / (this.af+color.af);
        this.r = (this.r*sa)+(color.r*(1-sa));
        p.g = (p.g*sa)+(color.g*(1-sa));
        p.b = (p.b*sa)+(color.b*(1-sa));
        p.af = (p.af+color.af)/2;
    }
    overlay(color){
        if (!(color instanceof Color))
            color = new Color(color);
        const p = this._private;

        this.r = (this.r*(1-color.af))+(color.r*color.af);
        p.g = (p.g*(1-color.af))+(color.g*color.af);
        p.b = (p.b*(1-color.af))+(color.b*color.af);
        p.af += (1-p.af)*color.af;
    }
    underlay(color){
        if (!(color instanceof Color))
            color = new Color(color);
        const p = this._private;

        this.r = (this.r*this.af)+(color.r*(1-p.af));
        p.g = (p.g*p.af)+(color.g*(1-p.af));
        p.b = (p.b*p.af)+(color.b*(1-p.af));
        p.af += (1-p.af)*color.af;
    }
    add(color) {
        if (!(color instanceof Color))
            color = new Color(color);
        const p = this._private;

        this.r = Math.min(255,this.r+color.r);
        p.g = Math.min(255,p.g+color.g);
        p.b = Math.min(255,p.b+color.b);
        this.af = Math.min(1,this.af+color.a);
    }

    equals(color) {
        if (!(color instanceof Color))
            color = new Color(color);
        const p = this._private;

        return this.r==color.r && this.g==color.g && this.b==color.b && this.a==color.a;
    }
    log(){
        return this._private;
    }

    clone(){
        return new Color(this.r,this.g,this.b,this.a);
    }
    static fromUnkown(u) {
        if (u instanceof Color)
            return u;
        else if (Array.isArray(u))
            return new Color(...u);
        else
            return new Color(u);
    }
    static fromHSL(h,s,l){
        const rgb = Color.hsl2rgb(h,s,l);
        return new Color(rgb[0],rgb[1],rgb[2]);
    }
    static fromCMYK(c,y,m,k){
        const rgb = Color.cmyk2rgb(c,m,y,k);
        return new Color(rgb[0],rgb[1],rgb[2]);
    }

    static addNamedColor(name,color) {
        if (!(color instanceof Color))
            color = new Color(color);
        COLORS[name] = color.hex;
    }

    static cmyk2rgb(c,y,m,k,returnAsObject=false){
        let r=0,g=0,b=0;

        c = c / 100;
        m = m / 100;
        y = y / 100;
        k = k / 100;

        r = 1 - Math.min( 1, c * ( 1 - k ) + k );
        g = 1 - Math.min( 1, m * ( 1 - k ) + k );
        b = 1 - Math.min( 1, y * ( 1 - k ) + k );

        r = Math.round( r * 255 );
        g = Math.round( g * 255 );
        b = Math.round( b * 255 );
        return returnAsObject ? {r,g,b} : [r,g,b];
    }
    static rgb2cmyk(r,g,b,returnAsObject=false){
        let c=0,m=0,y=0,k=0;
        r = r / 255;
        g = g / 255;
        b = b / 255;

        k = Math.min( 1 - r, 1 - g, 1 - b );
        c = ( 1 - r - k ) / ( 1 - k );
        m = ( 1 - g - k ) / ( 1 - k );
        y = ( 1 - b - k ) / ( 1 - k );

        c = Math.round( c * 100 );
        m = Math.round( m * 100 );
        y = Math.round( y * 100 );
        k = Math.round( k * 100 );
        return returnAsObject ? {c,y,m,k} : [c,y,m,k];
    }

    static hsl2rgb(h,s,l,returnAsObject=false){
        let r, g, b;
        h/=360;
        s/=100;
        l/=100;

        if (s == 0)
            r = g = b = l;
        else {

            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
        r = Math.round(r * 255);
        g = Math.round(g * 255);
        b = Math.round(b * 255);
        return returnAsObject ? {r,g,b} : [r,g,b];
    }
    static rgb2hsl(r,g,b,returnAsObject=false){
        r /= 255, g /= 255, b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max == min)
            h = s = 0;
        else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch(max){
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        h*=360;
        s*=100;
        l*=100;
        return returnAsObject ? {h,s,l} : [h,s,l];
    }
    static rgb2hex(r,g,b,a=null) {
        return '#'+r.toString(16)+g.toString(16)+b.toString(16)+(a===null?'':a.toString(16));
    }
    static hex2rgb(str,returnAsObject=false){
        str = str.replace(/^#/,'');
        const size = str.length<6?1:(str.length<12?2:4);
        const count = Math.min(4,Math.ceil(str.length/size));

        let ret = returnAsObject?{}:[];
        for (let i=0;i<count;i++) {
            let val = parseInt(str.substr(i*size, size), 16);
            if (size==1)
                val += (16*val);
            if (returnAsObject)
                ret[LETTERS[i]] = val;
            else
                ret.push(val);
        }
        return ret;
    }
    static int2hex(int){
        let str = int.toString(16);
        const size = str.length<6?1:(str.length<12?2:4);
        str = padLeft(str,'0',str.length+(str.length%size));

        let ret = '';
        for (let i=-size;i>=-str.length;i-=size)
            ret+=str.substr(i,size)

        return ret;
    }
    static hex2int(str){
        const size = str.length<6?1:(str.length<12?2:4);

        let hex = '';
        for (let i=0;i<str.length;i+=size)
            hex = str.substr(i,size)+hex;

        return parseInt(hex,16);
    }
    static rgb2int(r,g,b,a=0){
        return a*Math.pow(256,3) + b*Math.pow(256,2) + g*256 + r;
    }
    static int2rgb(int,returnAsObject=false){
        let ret = returnAsObject?{}:[];
        let ind = 0;
        while (int>=256||!!ind) {
            let v = int%256;
            if (returnAsObject)
                ret[LETTERS[ind]] = v;
            else
                ret.push(v);
            ind++;
            int-=v;
            int/=256;
        }

        return ret;
    }
}
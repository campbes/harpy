/*global Harpy*/

Harpy.util = (function(){

    function getMimetype(type) {

        type = type || "";

        function is(str) {
            return type.indexOf(str) !== -1;
        }

        if(is("image")) {
            return "image";
        }
        if(is("html")) {
            return "html";
        }
        if(is("javascript")) {
            return "js";
        }
        if(is("css")) {
            return "css";
        }
        if(is("text")) {
            return "text";
        }
        return "other";
    }

    function format(val,type) {
        switch(type) {
            case "size" :
                if(val > 1024) {
                    val = Math.round(val/102.4);
                    return val/10+ " KB";
                }
                return val+ " B";
            case "time" :
                if(val > 1000) {
                    val = Math.round(val/10);
                    return val/100+ " s";
                }
                return val+ " ms";
        }
        return val;
    }

    function trimmer(str,val,reverse) {
        var fixie = (str.length > val ? "..." : "");
        if(reverse) {
            return fixie + (str.length > val ? str.substr(str.length-val) : str);
        }
        return str.substr(0,val) + fixie;
    }

    function unitise(obj,attr,unit) {
        return Math.floor(Number(obj.getAttribute(attr))*unit);
    }

    return {

        getMimetype : getMimetype,
        format : format,
        trimmer : trimmer,
        unitise : unitise

    };

}());
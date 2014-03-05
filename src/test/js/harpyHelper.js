returner = function(obj) {
    return obj;
}

chart = {
    draw : function() {},
    computeDiff : function(){}
};

//mock out google charts api
google = {
    visualization : {
        arrayToDataTable : returner,
        BarChart : function() {
            return chart;
        },
        PieChart : function() {
            return chart;
        }
    }
};

Handlebars = {
    registerHelper : returner,
    registerPartial : returner
};

Exos = {
    enable : returner
};

$ = function() {
    return {
        width : returner,
        height : returner,
        each : function(func) {
            func.call(document.createElement("DIV"));
        },
        after : returner
    }
};

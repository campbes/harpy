/*global Harpy, google*/

Harpy.render = (function(){

    var standardConfig = {
        pieSliceTextStyle : {
            color : '#000'
        },
        chartArea : {
            top :30,left: 10,bottom: 30,right: 10,width:300
        },
        diff : {
            oldData : {
                opacity : 0.7
            }
        },
        sliceVisibilityThreshold: 0
    };

    var chartConfigs = {
        time : {
            colors : ['#d9534f','#F63','#F96','#9C9','#FC6','#5cb85c'],
            title : "Time"
        },
        type : {
            colors : ['#CCC','#FFB','#FBF','#BBF','#FBB'],
            title : "Content"
        },
        uncached : {
            colors : ['#CCC','#FFB','#FBF','#BBF','#FBB'],
            title : "Uncached content"
        },
        size : {
            colors : ['#5cb85c','#d9534f'],
            title : "Cache profile"
        }
    };

    function drawPieChart(elID,primaryData,secondaryData,st,cfg) {

        cfg = (cfg ? cfg[st] : chartConfigs[st]);

        var el, stat, stat2, statData, statData2, statProp, conf, chartEl, data, data2, chart;

        if(primaryData.hasOwnProperty(st) && cfg) {
            stat = primaryData[st];
            statData = [["",""]];
            if(secondaryData) {
                stat2 = secondaryData[st];
                statData2 = [["",""]];
            }
            for(statProp in stat) {
                if(stat.hasOwnProperty(statProp)) {
                    statData[statData.length] = [statProp,(stat[statProp] < 0 ? 0 : stat[statProp])];
                    if(stat2 && stat2.hasOwnProperty(statProp)) {
                        statData2[statData2.length] = [statProp,(stat2[statProp] < 0 ? 0 : stat2[statProp])];
                    }
                }
            }

            for(conf in standardConfig) {
                if(standardConfig.hasOwnProperty(conf) && !cfg[conf]) {
                    cfg[conf] = standardConfig[conf];
                }
            }

            chartEl = document.createElement("DIV");
            chartEl.className = 'harpyChart';
            el = document.getElementById(elID);
            if(el) {
                if(el.getAttribute("data-height")) {
                    cfg.chartArea.height = el.getAttribute("data-height");
                }
                el.appendChild(chartEl);
            }
            data = google.visualization.arrayToDataTable(statData);
            chart = new google.visualization.PieChart(chartEl);

            if(secondaryData) {
                data2 = google.visualization.arrayToDataTable(statData2);
                data = chart.computeDiff(data2,data);
            }

            chart.draw(data,cfg);
        }
        return chart;
    }


    function drawPieCharts(el,primaryData,secondaryData,cfg) {

        var st, chart, chartArray = [];
        for(st in primaryData) {
            if(primaryData.hasOwnProperty(st)) {
                chart = drawPieChart(el,primaryData,secondaryData,st,cfg);
                chartArray[chartArray.length] = chart;
            }
        }
        return chartArray;
    }

    function drawBarChart(el,dataArray,cfg) {
        cfg = cfg || {
            colors : ['#5cb85c','#d9534f'],
            legend: "none",
            hAxis : {
                maxValue : 0
            }
        };
        var chartEl = document.createElement("DIV");
        chartEl.className = 'harpyChart harpyBarChart';
        if(document.getElementById(el)) {
            document.getElementById(el).appendChild(chartEl);
        }

        var data = google.visualization.arrayToDataTable(dataArray);
        var chart = new google.visualization.BarChart(chartEl);

        chart.draw(data,cfg);
        return chart;
    }

    return {

        standardConfig : standardConfig,
        chartConfigs : chartConfigs,
        drawPieChart : drawPieChart,
        drawPieCharts : drawPieCharts,
        drawBarChart : drawBarChart

    };

}());
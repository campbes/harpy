/*global $, google, Exos, Handlebars*/

var Harpy = (function() {

    function getMimetype(type) {

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

    var standardConfig = {
        pieSliceTextStyle : {
            color : '#000'
        },
        chartArea : {
            top :30,left: 10,bottom: 30,right: 10,width:300
        }
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

    function createStatConfig() {
        var stats = {
            time : {
                blocked : 0,
                dns : 0,
                connect : 0,
                send : 0,
                wait : 0,
                receive : 0
            },
            type : {
                image : 0,
                html : 0,
                js : 0,
                css : 0,
                text : 0,
                other : 0
            },
            uncached : {
                image : 0,
                html : 0,
                js : 0,
                css : 0,
                text : 0,
                other : 0
            },
            size : {
                cache : 0,
                download : 0
            }
        };
        return stats;
    }

    function drawPieCharts(el,primaryData,secondaryData) {

        var st, stat, stat2, statData, statData2, statProp, conf, chartEl, data, data2, chart;

        for(st in primaryData) {
            if(primaryData.hasOwnProperty(st)) {
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
                    if(standardConfig.hasOwnProperty(conf)) {
                        chartConfigs[st][conf] = standardConfig[conf];
                    }
                }

                chartEl = document.createElement("DIV");
                chartEl.className = 'harpyChart';
                document.getElementById(el).appendChild(chartEl);
                data = google.visualization.arrayToDataTable(statData);
                chart = new google.visualization.PieChart(chartEl);

                if(secondaryData) {
                    data2 = google.visualization.arrayToDataTable(statData2);
                    data = chart.computeDiff(data2,data);
                }

                chart.draw(data,chartConfigs[st]);

            }
        }
    }

    function drawBarChart(el,dataArray) {
        var chartEl = document.createElement("DIV");
        chartEl.className = 'harpyChart';
        chartEl.style.width = "50%";
        document.getElementById(el).appendChild(chartEl);

        var data = google.visualization.arrayToDataTable(dataArray);
        var chart = new google.visualization.BarChart(chartEl);

        chart.draw(data,{
            colors : ['#d9534f','#5cb85c'],
            legend: "none"
        });
    }

    function Viewer(har) {
        var viewer = this;
        var entryCache = {};
        var el = null;
        har = JSON.parse(har);

        var time = har.log.pages[0].pageTimings;
        time.total = time.onLoad;

        var startTime = new Date(har.log.pages[0].startedDateTime);
        var stats = createStatConfig();
        var i, entry, url, type, endTime, x;

        for(i=0; i<har.log.entries.length; i++) {
            entry = har.log.entries[i];
            entry.harpy_info = {};
            entryCache[i] = entry;
            url = entry.request.url;
            if(i>0) {
                url = url.replace(har.log.entries[0].request.url,"");
            }

            type = getMimetype(entry.response.content.mimeType);

            endTime = new Date(entry.startedDateTime).getTime() + entry.time;
            if(endTime > startTime.getTime() + time.total) {
                time.total = endTime - startTime;
            }

            for(x in entry.timings) {
                if(entry.timings.hasOwnProperty(x)) {
                    if( entry.timings[x] > 0) {
                        stats.time[x] += entry.timings[x];
                    }
                }
            }

            stats.type[type] += entry.response.bodySize;
            stats.uncached[type] += entry.response.bodySize;
            stats.size.download += entry.response.bodySize;

            entry.harpy_info.index = i+1;
            entry.harpy_info.url = url;
            entry.harpy_info.mimetype = type;
            entry.harpy_info.cache = (entry.response.status === '(cache)' ? ' cache' : '');

            if(entry.cache.hasOwnProperty('afterRequest')) {
                stats.size.cache += entry.response.content.size;
                stats.type[type] += entry.response.content.size;
                entry.harpy_info.size = entry.response.content.size;
            } else {
                entry.harpy_info.size = entry.response.bodySize;
            }
            entry.harpy_info.startTime = new Date(entry.startedDateTime) - startTime;
        }

        var harpy_info = {};
        harpy_info.time = time;
        harpy_info.time.onContentLoad = time.onContentLoad || time.onLoad;
        harpy_info.size = stats.size;
        har.log.pages[0].harpy_info = harpy_info;

        function resize() {
            var timeline = $('#'+el+' th.timeline');
            var unit = timeline.width()/time.total;
            var times = $('#'+el+' table.harpy div');
            var marker = $('#'+el+' table.harpy div.loadMarker');
            var tableHeight = $('#'+el+' table.harpy>tbody').height() + "px";

            function unitise(obj,attr) {
                return Math.floor(Number(obj.getAttribute(attr))*unit);
            }

            times.each(function() {
                if(this.hasAttribute('data-start')) {
                    this.style.marginLeft = unitise(this,"data-start") + "px";
                }
                if(this.hasAttribute('data-time')) {
                    this.style.width = unitise(this,"data-time") + "px";
                }
            });

            marker.each(function(){
                var left = 0;
                var width = 0;
                if(this.hasAttribute('data-dom')) {
                    left = unitise(this,"data-dom");
                }
                if(this.hasAttribute('data-page')) {
                    width = unitise(this,"data-page") - left;
                }
                this.style.marginLeft = left + "px";
                this.style.width = width + "px";
                this.style.height = tableHeight;
            });
        }

        this.resize = resize;

        this.showInfo = function(obj) {
            var id = obj.getAttribute("data-id");
            entry = entryCache[id];
            if(entry.info) {
                entry.info.style.display = (entry.info.style.display === "none" ? "table-row" : "none");
                resize();
                return;
            }
            var infoRow = document.createElement("TR");
            infoRow.innerHTML = Handlebars.templates.info(entry);
            $(obj).after(infoRow);
            entry.info = infoRow;
            resize();
        };

        function drawCharts() {
            drawPieCharts(el,stats);
        }

        this.draw = function(elID) {
            el = elID;
            this.el = el;

            if(!google.visualization) {
                google.load("visualization", "1", {packages:["corechart"]});
                google.setOnLoadCallback(drawCharts);
            } else {
                drawCharts();
            }

            var bhvr = {};
            bhvr["#"+el+" table.harpy>tbody>tr"] = {
                click : function(e,obj) {
                    viewer.showInfo(obj);
                }
            };
            Exos.enable([bhvr,{window : { resize : function(){ viewer.resize();}}}]);

            Handlebars.registerHelper("trimmer",trimmer);
            Handlebars.registerHelper("format",format);
            Handlebars.registerPartial("timeline",Harpy.Templates.timeline);
            document.getElementById(el).innerHTML = Harpy.Templates.data(har);
            setTimeout(this.resize,1);

            if($.tablesorter){
                $("#"+el+">table").tablesorter({
                    sortList : [[0,0]]
                });
            }
        };
    }

    function Comparator(har1,har2) {

        har1 = JSON.parse(har1);
        har2 = JSON.parse(har2);

        var el;

        function getStats(har) {
            var entry, i, url, type, endTime, x;
            var time = har.log.pages[0].pageTimings;
            time.total = time.onLoad;
            var startTime = new Date(har.log.pages[0].startedDateTime);
            var stats = createStatConfig();

            for(i=0; i<har.log.entries.length; i++) {
                entry = har.log.entries[i];
                url = entry.request.url;
                type = getMimetype(entry.response.content.mimeType);

                endTime = new Date(entry.startedDateTime).getTime() + entry.time;
                if(endTime > startTime.getTime() + time.total) {
                    time.total = endTime - startTime;
                }

                for(x in entry.timings) {
                    if(entry.timings.hasOwnProperty(x)) {
                        if( entry.timings[x] > 0) {
                            stats.time[x] += entry.timings[x];
                        }
                    }
                }

                stats.type[type] += entry.response.bodySize;
                stats.uncached[type] += entry.response.bodySize;
                stats.size.download += entry.response.bodySize;

                if(i>0) {
                    url = url.replace(har.log.entries[0].request.url,"");
                }
                if(entry.cache.hasOwnProperty('afterRequest')) {
                    stats.size.cache += entry.response.content.size;
                    stats.type[type] += entry.response.content.size;
                }
            }

            return stats;
        }

        function getUncachedEntries(har) {
            var entries = har.log.entries;
            var uncachedEntries = 0;
            var i;
            for(i=entries.length-1; i>=0; i--) {
                if(entries[i].response.status !== "(cache)") {
                    uncachedEntries += 1;
                }
            }
            return uncachedEntries;
        }

        var stats1 = getStats(har1);
        var stats2 = getStats(har2);

        var uncachedEntries1 = getUncachedEntries(har1);
        var uncachedEntries2 = getUncachedEntries(har2);

        var har1Times = har1.log.pages[0].pageTimings;
        var har2Times = har2.log.pages[0].pageTimings;

        var headings = ["Metric","Uncached","Primed cache"];

        var times = [
            headings,
            ["Dom load", har2Times.onContentLoad/1000,har1Times.onContentLoad/1000],
            ["Load", har2Times.onLoad/1000,har1Times.onLoad/1000],
            ["Total", har2Times.total/1000,har1Times.total/1000]
        ];

        var requests = [
            headings,
            ["Requests", uncachedEntries2,uncachedEntries1]
        ];

        function drawCharts() {
            drawPieCharts(el,stats1,stats2);
            drawBarChart(el,requests);
            drawBarChart(el,times);
        }

        this.draw = function(elID) {
            el = elID;
            this.el = el;
            if(!google.visualization) {
                google.load("visualization", "1", {packages:["corechart"]});
                google.setOnLoadCallback(drawCharts);
            } else {
                drawCharts();
            }

        };
    }

    return {
        Viewer : Viewer,
        Comparator : Comparator
    };

}());

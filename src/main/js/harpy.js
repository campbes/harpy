/*global $, google, Exos*/

var Harpy = (function() {

    function elStr(tag,content,attrs) {
        var str = '<', att;
        str += tag;
        for (att in attrs) {
            if(attrs.hasOwnProperty(att)) {
                str += ' ';
                str += att;
                str += '="';
                str += attrs[att];
                str += '"';
            }
        }
        str += '>';
        if(content) {
            str += content;
        }
        str += '</';
        str += tag;
        str += '>';

        return str;
    }

    function buildTimeline(obj,startTime) {

        var str = "";
        var timings = ["blocked","dns","connect","send","wait","receive"];
        var timingsLength = timings.length;
        var i = 0;
        var timing;
        var attrs;

        for(i=0; i<timingsLength; i++) {
            timing =timings[i];
            attrs = {
                "class" : timing,
                "data-time" : obj.timings[timing]
            };
            if(timing === "blocked") {
                attrs["data-start"] = new Date(obj.startedDateTime) - startTime;
            }
            str += elStr("div","",attrs);
        }

        return str;
    }

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

    function buildMarker(time) {
        return elStr("div","",{
            "class" : "loadMarker",
            "data-dom" : (time.onContentLoad || time.onLoad),
            "data-page" :time.onLoad
        });
    }

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

        var st, stat, stat2, statData, statData2, statProp, conf, chartEl, data, chart;

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
                    }
                    if(stat2 && stat2.hasOwnProperty(statProp)) {
                        statData2[statData2.length] = [statProp,(stat2[statProp] < 0 ? 0 : stat2[statProp])];
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
                    var data2 = google.visualization.arrayToDataTable(statData2);
                    data = chart.computeDiff(data2,data);
                }

                chart.draw(data,chartConfigs[st]);

            }
        }
    }

    function drawBarChart(el,dataArray) {
        chartEl = document.createElement("DIV");
        chartEl.className = 'harpyChart';
        chartEl.style.width = "50%";
        document.getElementById(el).appendChild(chartEl);

        data = google.visualization.arrayToDataTable(dataArray);
        chart = new google.visualization.BarChart(chartEl);

        chart.draw(data,{
            colors : ['#d9534f','#5cb85c'],
            legend: "none"
        });
    }

    function Viewer(har) {
        var viewer = this;
        var entryCache = {};
        var el = null;
        var output = "";
        har = JSON.parse(har);

        var time = har.log.pages[0].pageTimings;
        time.total = time.onLoad;

        var startTime = new Date(har.log.pages[0].startedDateTime);
        var stats = createStatConfig();

        var headers = ["Req.","Meth.","URL","Status","Type","Size",{
            val : buildMarker(time),
            attrs : {
                "class" : "timeline"
            }
        }];
        var headersLength = headers.length;
        var header;
        var i = 0;
        output += "<thead><tr>";
        for (i=0; i<headersLength; i++) {
            header = headers[i];
            if (typeof header === "string") {
                output += elStr("th",header);
            }
            if(header.val) {
                output += elStr("th",header.val,header.attrs);
            }
        }
        output += "</tr></thead>";

        output+= "<tbody>";

        var entry, url, type, endTime, x;

        for(i=0; i<har.log.entries.length; i++) {
            entry = har.log.entries[i];
            entryCache[i] = entry;
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
            output += "<tr data-id='"+i+"' class='"+type+(entry.response.status === '(cache)' ? ' cache' : '')+"'>";
            output += elStr("td",(i+1));
            output += elStr("td",entry.request.method);
            output += elStr("td",url.substr(0,30)+(url.length > 30 ? "..." : ""),{
                title : url,
                "class" : "url"
            });
            output += elStr("td",entry.response.status,{
                title : entry.response.status+" "+entry.response.statusText
            });
            output += elStr("td",type,{
                title : entry.response.content.mimeType
            });
            if(entry.cache.hasOwnProperty('afterRequest')) {
                output += elStr("td",format(entry.response.content.size,'size'));
                stats.size.cache += entry.response.content.size;
                stats.type[type] += entry.response.content.size;
            } else {
                output += elStr("td",format(entry.response.bodySize,'size'));
            }
            output += elStr("td",buildTimeline(entry,startTime),{
                title : format(entry.time,'time')
            });
            output += "</tr>";
        }
        output += "</tbody>";
        output += "<tfoot><tr class='total'>";
        output += elStr("td",har.log.entries.length);
        output += elStr("td","",{
            colspan : 4
        });
        output += elStr("td",format((stats.size.download+stats.size.cache),'size'));
        output += "<td>";
        output += format(stats.size.cache,'size')+" from cache)";
        output += elStr("span",format(time.total,'time'),{
            title  : "DOM: "+format(time.onContentLoad || time.onLoad,'time')+", Page: "+format(time.onLoad,'time')
        });
        output += "</td>";
        output += "</tr></tfoot>";


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
            var info = elStr("td");
            info += "<td class='info' colspan='6'>";
            info += "<a href='"+entry.request.url+"' target='_blank'><strong>"+entry.request.url+"</strong></a>";
            info += "<br/>";
            info += entry.response.content.mimeType;
            info += "<hr/>";
            info += elStr("strong","Request headers");
            info += "<table>";
            for (i=0; i<entry.request.headers.length; i++){
                info += "<tr>";
                info += elStr("td",entry.request.headers[i].name);
                info += elStr("td",entry.request.headers[i].value);
                info += "</tr>";
            }
            info += "</table>";
            info += "<hr/>";
            info += elStr("strong","Response headers");
            info += "<table>";
            for (i=0; i<entry.response.headers.length; i++){
                info += "<tr>";
                info += elStr("td",entry.response.headers[i].name);
                info += elStr("td",entry.response.headers[i].value);
                info += "</tr>";
            }
            info += "</table>";
            info += "</td>";

            var infoRow = document.createElement("TR");
            infoRow.innerHTML = info;

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

            var table = document.createElement("TABLE");
            table.className = "harpy";
            table.innerHTML = output;
            document.getElementById(el).appendChild(table);
            setTimeout(this.resize,1);

            if($.tablesorter){
                $(table).tablesorter({
                    sortList : [[0,0]]
                });
            }
        };
    }

    function Comparator(har1,har2) {

        har1 = JSON.parse(har1);
        har2 = JSON.parse(har2);

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
            for(var i=entries.length-1; i>=0; i--) {
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

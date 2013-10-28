var Harpy = function() {

    var tablesize = 500;

    function buildTimeline(obj,unit,startTime) {

        var start = new Date(obj.startedDateTime) - startTime;

        var str = "";
        str += "<div class='blocked' style='width:"+obj.timings.blocked*unit+"px;margin-left:"+start*unit+"px'></div>";
        str += "<div class='send' style='width:"+obj.timings.send*unit+"px'></div>";
        str += "<div class='wait' style='width:"+obj.timings.wait*unit+"px'></div>";
        str += "<div class='receive' style='width:"+obj.timings.receive*unit+"px'></div>";
        return str;
    }

    function Viewer(har) {
        var output = "<table>";
        har = JSON.parse(har);

        var time = har.log.pages[0].pageTimings.onLoad;
        var unit = tablesize/time;
        var startTime = new Date(har.log.pages[0].startedDateTime);

        for(var i=0; i<har.log.entries.length; i++) {
            var entry = har.log.entries[i];
            var url = entry.request.url;
            if(i>0) {
                url = url.replace(har.log.entries[0].request.url,"");
            }
            output += "<tr>";
            output += "<td>"+url+"</td>";
            output += "<td>"+entry.response.status+" "+entry.response.statusText+"</td>";
            output += "<td>"+Math.round(entry.response.bodySize/1024)+" KB</td>";
            output += "<td>"+buildTimeline(entry,unit,startTime)+"</td>"
            output += "</tr>";
        }
        output += "</table>";
        this.draw = function() {
            document.body.innerHTML = output;
        }
    }


    return {
        Viewer : Viewer
    }

}();
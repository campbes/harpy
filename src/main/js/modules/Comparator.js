/*global Harpy, $harpy, google*/

Harpy.Comparator = function($harpy) {

    return function(har1,har2) {

        har1 = JSON.parse(har1);
        har2 = JSON.parse(har2);

        var harpy1 = $harpy.harpify(har1);
        var harpy2 = $harpy.harpify(har2);

        var stats1 = harpy1.stats;
        var stats2 = harpy2.stats;
        var el;

        var headings = ["Metric","Primed cache","Uncached"];

        var timings = [
            headings,
            ["Dom load", stats1.timing.onContentLoad/1000,stats2.timing.onContentLoad/1000],
            ["Load", stats1.timing.onLoad/1000,stats2.timing.onLoad/1000],
            ["Total", stats1.timing.total/1000,stats2.timing.total/1000]
        ];

        var requests = [
            headings,
            ["Requests", stats1.requests.uncached,stats2.requests.uncached]
        ];
        var size = [
            headings,
            ["Size", stats1.size.download/1024,stats2.size.download/1024]
        ];

        function drawCharts() {
            $harpy.render.drawPieCharts(el,stats1,stats2);
            $harpy.render.drawBarChart(el,timings);
            $harpy.render.drawBarChart(el,requests);
            $harpy.render.drawBarChart(el,size);
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
            return this;
        };
    };
};
/*global Harpy, $harpy, $, google, Exos, Handlebars*/

Harpy.Viewer = function($harpy) {

    return function(har) {
        var viewer = this;
        var el = null;
        har = JSON.parse(har);
        var harpyData = $harpy.harpify(har);
        har = harpyData.har;
        var entryCache = harpyData.entryCache;
        var stats = harpyData.stats;

        function resize() {
            var timeline = $('#'+el+' th.timeline');
            var unit = timeline.width()/har.log.pages[0].harpy_info.time.total;
            var times = $('#'+el+' table.harpy div');
            var marker = $('#'+el+' table.harpy div.loadMarker');
            var tableHeight = $('#'+el+' table.harpy>tbody').height() + "px";

            times.each(function() {
                if(this.hasAttribute('data-start')) {
                    this.style.marginLeft = $harpy.util.unitise(this,"data-start",unit) + "px";
                }
                if(this.hasAttribute('data-time')) {
                    this.style.width = $harpy.util.unitise(this,"data-time",unit) + "px";
                }
            });

            marker.each(function(){
                var left = 0;
                var width = 0;
                if(this.hasAttribute('data-dom')) {
                    left = $harpy.util.unitise(this,"data-dom",unit);
                }
                if(this.hasAttribute('data-page')) {
                    width = $harpy.util.unitise(this,"data-page",unit) - left;
                }
                this.style.marginLeft = left + "px";
                this.style.width = width + "px";
                this.style.height = tableHeight;
            });
        }

        this.resize = resize;

        this.showInfo = function(obj) {
            var id = obj.getAttribute("data-id");
            var entry = entryCache[id];
            if(entry.info) {
                entry.info.style.display = (entry.info.style.display === "none" ? "table-row" : "none");
                resize();
                return;
            }
            var infoRow = document.createElement("TR");
            infoRow.innerHTML = Harpy.Templates.info(entry);
            $(obj).after(infoRow);
            entry.info = infoRow;
            resize();
            return obj;
        };


        this.draw = function(elID,cfg) {
            el = elID;
            this.el = el;

            var $table;

            function recalculateTotals() {
                var $tfootCells = $table.find('tfoot>tr>td');
                var $rows = $table.find('tbody>tr').filter(':visible');
                $tfootCells.filter('[data-field="requests"]').text($rows.length);
                var size = 0;
                var cached = 0;
                $rows.each(function(i,row) {
                    var $row = $(row);
                    var weight = $row.find('td[data-field="size"]').data('sort');
                    if($row.find('td[data-field="status"][data-sort="(cache)"]').length > 0) {
                        cached += weight;
                    } else {
                        size += weight;
                    }
                });
                $tfootCells.filter('[data-field="size"]').text($harpy.util.format(size,"size"));
                $tfootCells.find('span[data-field="cache"]').text($harpy.util.format(cached,"size"));
            }

            function drawCharts() {
                $harpy.render.drawPieCharts(el,stats,null,cfg);
            }

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

            bhvr["#"+el+" table.harpy>thead input"] = {
                keyup : function(e,obj) {
                    var $obj = $(obj);
                    var filters = obj.value.split(',');
                    var field = $obj.data('field');
                    var value;

                    $("#"+el).find("table.harpy>tbody>tr").each(function(i,row) {
                        var $row = $(row);
                        var visible = false;
                        value = $row.find('>td[data-field="'+field+'"]').attr('data-sort');
                        if(filters.length === 1 && filters[0] === "") {
                            visible = true;
                        } else {
                            filters.forEach(function(filter) {
                                if(filter.length > 0 && value.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
                                    visible = true;
                                }
                            });
                        }
                        if(visible) {
                            $row.removeAttr('data-filtered-'+field);
                        } else {
                            $row.attr('data-filtered-'+field,true);
                        }
                    });

                    recalculateTotals();
                }
            };

            viewer.behaviours = [bhvr,{window : { resize : function(){ viewer.resize();}}}];

            Exos.enable(viewer.behaviours);

            Handlebars.registerHelper("trimmer",$harpy.util.trimmer);
            Handlebars.registerHelper("format",$harpy.util.format);
            Handlebars.registerPartial("timeline",Harpy.Templates.timeline);

            var table = document.createElement("TABLE");
            table.innerHTML = Harpy.Templates.data(har);
            table.className = "harpy";
            if(document.getElementById(el)) {
                document.getElementById(el).appendChild(table);
            }
            $table = $(table);
            setTimeout(this.resize,1);

            if($.tablesorter){
                $table.tablesorter({
                    sortList : [[0,0]]
                });
            }

            return this;
        };

        this.destroy = function() {
            Exos.remove(viewer.behaviours);
        };

    };
};

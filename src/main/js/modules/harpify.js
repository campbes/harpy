/*global Harpy, $harpy*/

Harpy.harpify = function($harpy) {

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
            },
            requests : {
                cached : 0,
                uncached : 0
            },
            timing : {
                onContentLoad : 0,
                onLoad : 0,
                total : 0
            }
        };
        return stats;
    }

    function harpify(har) {

        var entryCache = {};
        var stats = createStatConfig();

        var time = har.log.pages[0].pageTimings;
        stats.timing.onLoad = time.onLoad;
        stats.timing.total = time.onLoad;
        stats.timing.onContentLoad = time.onContentLoad || time.onLoad;

        var startTime = new Date(har.log.pages[0].startedDateTime);

        var i, entry, url, type, endTime, x, domain, source, urlDomain, redirect;

        for(i=0; i<har.log.entries.length; i++) {
            entry = har.log.entries[i];
            url = entry.request.url;

            urlDomain = url.split("://")[1].split("/")[0];
            redirect = (Number(entry.response.status) === 301 || Number(entry.response.status) === 302);

            if(!domain && !redirect) {
                domain = urlDomain;
            }

            if(urlDomain === domain) {
                source = "identical";
            } else if(redirect || (domain && urlDomain.indexOf(domain.substr(domain.indexOf("."))) !== -1)) {
                source = "internal";
            } else {
                source = "external";
            }

            entry.harpy_info = {};
            entryCache[i] = entry;

            entry.harpy_info.source = source;
            if(i>0) {
                url = url.replace(har.log.entries[0].request.url,"");
            }

            type = $harpy.util.getMimetype(entry.response.content.mimeType);

            endTime = new Date(entry.startedDateTime).getTime() + entry.time;
            if(endTime > startTime.getTime() + time.total) {
                stats.timing.total = endTime - startTime;
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
            if(entry.response.status === '(cache)') {
                entry.harpy_info.cache = "cache";
                stats.requests.cached += 1;
            } else {
                stats.requests.uncached += 1;
                if(Number(entry.response.status) > 399) {
                    entry.harpy_info.error = 'error';
                }
            }
            if(entry.cache.hasOwnProperty('afterRequest')) {
                stats.size.cache += entry.response.content.size;
                stats.type[type] += entry.response.content.size;
                entry.harpy_info.size = entry.response.content.size;
            } else {
                entry.harpy_info.size = entry.response.bodySize;
            }
            entry.harpy_info.startTime = new Date(entry.startedDateTime) - startTime;
            entry.harpy_info.endTime = entry.harpy_info.startTime + entry.time;
        }

        var harpy_info = {};
        harpy_info.time = stats.timing;
        harpy_info.size = stats.size;
        har.log.pages[0].harpy_info = harpy_info;

        return {
            har : har,
            stats : stats,
            entryCache : entryCache
        };
    }

    return harpify;

};
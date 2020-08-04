(function() {
    if (window.ksRunnerInit) return;

    // This line gets patched up by the cloud
    var pxtConfig = {
    "relprefix": "/docs/",
    "verprefix": "",
    "workerjs": "/docs/worker.js",
    "monacoworkerjs": "/docs/monacoworker.js",
    "gifworkerjs": "/docs/gifjs/gif.worker.js",
    "serviceworkerjs": "/docs/serviceworker.js",
    "pxtVersion": "6.1.24",
    "pxtRelId": "",
    "pxtCdnUrl": "/docs/",
    "commitCdnUrl": "/docs/",
    "blobCdnUrl": "/docs/",
    "cdnUrl": "/docs/",
    "targetVersion": "0.0.0",
    "targetRelId": "",
    "targetUrl": "",
    "targetId": "teknikio-bluebird",
    "simUrl": "/docs/simulator.html",
    "simserviceworkerUrl": "/docs/simulatorserviceworker.js",
    "simworkerconfigUrl": "/docs/workerConfig.js",
    "partsUrl": "/docs/siminstructions.html",
    "runUrl": "/docs/run.html",
    "docsUrl": "/docs/docs.html",
    "multiUrl": "/docs/multi.html",
    "asseteditorUrl": "/docs/asseteditor.html",
    "isStatic": true
};

    var scripts = [
        "/docs/highlight.js/highlight.pack.js",
        "/docs/bluebird.min.js",
        "/docs/marked/marked.min.js",
    ]

    if (typeof jQuery == "undefined")
        scripts.unshift("/docs/jquery.js")
    if (typeof jQuery == "undefined" || !jQuery.prototype.sidebar)
        scripts.push("/docs/semantic.js")
    if (!window.pxtTargetBundle)
        scripts.push("/docs/target.js");
    scripts.push("/docs/pxtembed.js");

    var pxtCallbacks = []

    window.ksRunnerReady = function(f) {
        if (pxtCallbacks == null) f()
        else pxtCallbacks.push(f)
    }

    window.ksRunnerWhenLoaded = function() {
        pxt.docs.requireHighlightJs = function() { return hljs; }
        pxt.setupWebConfig(pxtConfig || window.pxtWebConfig)
        pxt.runner.initCallbacks = pxtCallbacks
        pxtCallbacks.push(function() {
            pxtCallbacks = null
        })
        pxt.runner.init();
    }

    scripts.forEach(function(src) {
        var script = document.createElement('script');
        script.src = src;
        script.async = false;
        document.head.appendChild(script);
    })

} ())

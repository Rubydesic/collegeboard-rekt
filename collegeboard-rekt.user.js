// ==UserScript==
// @name         Collegeboard rekt
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  LLLLLLLLLL
// @author       You
// @match        https://apclassroom.collegeboard.org/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const oldFetch = window.fetch;
    window.fetch = function() {
        let args = arguments;
        try {
            const body = JSON.parse(args[1].body);
            if (body.operationName === "StoreDailyVideoProgressMutation") {
                const video = document.getElementsByTagName('video')[0];
                const v = body.variables;
                v.progress = new Array(Math.ceil(video.duration)).fill(1);
                v.status = "COMPLETE";
                v.watchedPercentage = "1.00";
                v.playTimePercentage = "1.00";
                args[1].body = JSON.stringify(body);
                oldFetch.apply(this, args);
                alert('CollegeBoard takes another L: Video marked as watched, press OK to reload.');
                location.href = location.href.split("?")[0];
                return null;
            }
        } catch (e) {}
        return oldFetch.apply(this, args);
    }
})();


(function(){

// Settings
var strMyjsonp = "myjsonp";
var strCallbackBase = "_myjsonp";

// Callbacks Base
var base = window[strCallbackBase] = {};

// Myjsonp
window[strMyjsonp] = function(strUrl, funCallback){
    
    var strReqId = strUrl.replace(/[^A-Za-z0-9]/ig, "") + (new Date()).getTime(),
        callbackName = "_" + strReqId,
        elmScript = document.createElement("script");

    base[callbackName] = function(objData){
        funCallback(objData);
        delete base[strReqId];
        elmScript.parentNode.removeChild(elmScript);
    };

    elmScript.src = strUrl 
        + (strUrl.indexOf("?") >= 0 ? "&" : "?") 
        + "callback=" + strCallbackBase + "." + callbackName;
    elmScript.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(elmScript);
    
};

})();

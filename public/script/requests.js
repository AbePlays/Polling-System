var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
//@ts-ignore
var ref = firebase.firestore().collection("requests");
ref.onSnapshot(function (snapshot) {
    var requests = [];
    snapshot.forEach(function (doc) {
        requests.push(__assign(__assign({}, doc.data()), { id: doc.id }));
    });
    var html = "";
    requests.forEach(function (request) {
        html += "<li>" + request.text + "</li>";
    });
    document.querySelector("ul").innerHTML = html;
});

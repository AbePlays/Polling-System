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
        html += "\n        <li>\n            <span class=\"text\">" + request.text + "</span>\n            <div>\n                <span class=\"votes\">" + request.upvotes + "</span>\n            <i class=\"material-icons upvote\">arrow_upward</i>\n            </div>\n        </li>\n    ";
    });
    document.querySelector("ul").innerHTML = html;
});

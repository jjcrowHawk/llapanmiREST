var elem = document.querySelector('select');
var instance = M.FormSelect.init(elem, {});

var elem = document.querySelector('.sidenav');
var instance = M.Sidenav.init(elem, {});

var elem = document.querySelector('.fixed-action-btn');
var instance = M.FloatingActionButton.init(elem, { direction: "right" });

var elem = document.querySelector('.modal');
var instance = M.Modal.init(elem, {
    dismissible: true,
});
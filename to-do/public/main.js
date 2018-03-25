var deleter = document.querySelectorAll("#delete");

for (var i = 0; i < deleter.length; i++) {
    deleter[i].addEventListener("click", function(event) {
        var targetElement = event.target || event.srcElement;
        console.log(targetElement.dataset.deleter);
        fetch('item', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'_id': targetElement.dataset.deleter})
        }).then(res => {
            if (res.ok) return res.json();
        }).then(data => {
            console.log(data);
            window.location.reload();
        });
    }, false);
}
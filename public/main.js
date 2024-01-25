// UPDATE
// reference and store update button
const update = document.getElementById('update-button');

// calls fetch function on the client side to update info
update.addEventListener('click', _ => {
    // reference and store username and password
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // call fetch request to /users endpoint using PUT
    fetch('/users', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        // stringify response
        body: JSON.stringify({
            username: username,
            password: password
        }),
    })
        //returning info in JSON format
        //reloads page
        .then(res => {
            console.log(`main.js res`, JSON.stringify(res));
            window.location.reload(true);
            if (res.ok) return res.json();
        })

})


// DELETE
const deleteButton = document.getElementById('delete-button');

deleteButton.addEventListener('click', () => {
    const username = document.getElementById("username").value;

    fetch('/users', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: username
        }),
    })
    .then(res => {
        console.log('deleted')
        if (res.ok) return res.json();
    })
    .then(res =>{
        window.location.reload(true)
    })
})
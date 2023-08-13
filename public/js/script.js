
// date 
const header = document.querySelector('header');
const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const today = new Date();
const month = monthName[today.getMonth()];
const date = today.getDate();
const year = today.getFullYear(); // this function will be removed after setting EJS view engine

header.innerHTML = '' + `
    <p>${date}-${month}-${year}</p>
`
// nav collapse
const menu = document.getElementById('menu');
const navUl = document.getElementById('nav-ul')

menu.addEventListener('click', e => {
    e.preventDefault();
    navUl.classList.toggle('nav-ul--expanded');
});

// dropdown list
const navLi = document.querySelectorAll('.nav-li')

navLi.forEach(btn => {
    btn.addEventListener('click', e => {
      const dropdown = btn.querySelector('.dropdown');
      if (dropdown) {
        dropdown.classList.toggle('dropdown--expanded');
        btn.classList.toggle('nav-li--expanded');
      }
    });
});

// expand to view content
const viewMoreBtns = document.querySelectorAll('.expand-icon');

viewMoreBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        const parent = e.currentTarget.parentElement;
        const bookDetails = parent.querySelector('.book-details');
        bookDetails.classList.toggle('book-details--expanded');
    });
});

// delete book
const deleteBtns = document.querySelectorAll('.delete');

deleteBtns.forEach(btn => {
    btn.addEventListener('click', async e => {
        e.preventDefault();
        
        const deleteBtn = e.currentTarget;
        await fetch(`/books/${deleteBtn.dataset.doc}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => window.location.href = data.redirect)
            .catch(err => console.log(err));
    });
});
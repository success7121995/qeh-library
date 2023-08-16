
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

// toggle delete prompt
const prompt = document.querySelectorAll('.delete');

if (prompt) {
    prompt.forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();

            // target the specific confirm prompt
            const parent = e.currentTarget.closest('.grid');
            const confirmPrompt = parent.querySelector('.confirm-block')
            confirmPrompt.classList.toggle('confirm-block--prompt');

            // cancel confirm prompt
            const cancelBtn = parent.querySelector('.cancel-btn');
            cancelBtn.addEventListener('click', e => {
                e.preventDefault();

                confirmPrompt.classList.remove('confirm-block--prompt');
            });
        });
    });
};

// delete book
const deleteBtns = document.querySelectorAll('.confirm-btn');

if (deleteBtns) {
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
};

// prompt btns
const optionBtns = document.querySelectorAll('.option-btns');

if (optionBtns) {
    optionBtns.forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();

            // return function
            if (btn.classList.contains('return-btn')) {
                location.assign('/');
            };

            if (btn.classList.contains('next-btn')) {
                location.assign('/books/upload');
            };
        });
    });
};
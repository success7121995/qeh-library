
// upload book form
const uploadBooks = document.getElementById('upload-books');

uploadBooks.addEventListener('submit', e => {
    e.preventDefault();

    // get checkbox values
    let isNewAddition = uploadBooks.querySelector('.checkbox.new-addition');
    isNewAddition = isNewAddition.checked;
    let loanable = uploadBooks.querySelector('.checkbox.loanable');
    loanable = loanable.checked;

    // get form values
    const title = uploadBooks.title.value;
    const author = uploadBooks.author.value;
    const isbn = uploadBooks.isbn.value;
    const description = uploadBooks.description.value;
    
});
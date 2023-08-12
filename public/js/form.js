
// upload book form
const uploadBooks = document.getElementById('upload-books');

uploadBooks.addEventListener('submit', async e => {
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
    const callNo = uploadBooks.callNo.value;
    const description = uploadBooks.description.value;

    // error messages
    const titleError = uploadBooks.querySelector('.title.error');
    const authorError = uploadBooks.querySelector('.author.error');
    const isbnError = uploadBooks.querySelector('.isbn.error');
    const callNoError = uploadBooks.querySelector('.callNo.error');
    const descriptionError = uploadBooks.querySelector('.description.error');
    const imgError = uploadBooks.querySelector('.img.error');

    // reset error messages
    titleError.textContent = '';
    authorError.textContent = '';
    isbnError.textContent = '';
    callNoError.textContent = '';
    descriptionError.textContent = '';
    imgError.textContent = '';


    // create a new FormData object
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('isbn', isbn);
    formData.append('callNo', callNo);
    formData.append('description', description);
    formData.append('isNewAddition', isNewAddition);
    formData.append('loanable', loanable);

    // check if a file is selected
    if (uploadBooks.img.files.length > 0) {
        formData.append('img', uploadBooks.img.files[0]);
    }

    // send data to the server
    const res = await fetch('/books/upload', {
        method: 'POST',
        body: formData
    });

    // handle the response
    const data = await res.json();
    if (data.book) {
        uploadBooks.reset();
    };
    if (data.errors) {
        titleError.textContent = data.errors.title;
        authorError.textContent = data.errors.author;
        isbnError.textContent = data.errors.isbn;
        callNoError.textContent = data.errors.callNo;
        descriptionError.textContent = data.errors.description;
        imgError.textContent = data.errors.img;
    };
});
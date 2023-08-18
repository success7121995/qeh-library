
// upload book form
const uploadBooks = document.getElementById('upload-books');
if (uploadBooks) {
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
        };

        // send data to the server
        const res = await fetch('/books/upload', {
            method: 'POST',
            body: formData
        });

        // handle the response
        const data = await res.json();
        if (data.book) {
            // prompt
            const prompt = uploadBooks.querySelector('.confirm-block');
            prompt.classList.toggle('confirm-block--prompt');
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
}

// update book form
const updateBook = document.getElementById('update-book');

if (updateBook) {
    updateBook.addEventListener('submit', async e => {
        e.preventDefault();
    
        // get checkbox values
        let isNewAddition = updateBook.querySelector('.checkbox.new-addition');
        isNewAddition = isNewAddition.checked;
        let loanable = updateBook.querySelector('.checkbox.loanable');
        loanable = loanable.checked;
    
        // get form values
        const title = updateBook.title.value;
        const author = updateBook.author.value;
        const isbn = updateBook.isbn.value;
        const callNo = updateBook.callNo.value;
        const description = updateBook.description.value;
        const id = updateBook.id.value;
    
        // error messages
        const titleError = updateBook.querySelector('.title.error');
        const authorError = updateBook.querySelector('.author.error');
        const isbnError = updateBook.querySelector('.isbn.error');
        const callNoError = updateBook.querySelector('.callNo.error');
        const descriptionError = updateBook.querySelector('.description.error');
        const imgError = updateBook.querySelector('.img.error');
    
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
        if (updateBook.img.files.length > 0) {
            formData.append('img', updateBook.img.files[0]);
        }
    
        // send data to the server
        const res = await fetch(`/books/${id}`, {
            method: 'PUT',
            body: formData
        });
    
        // handle the response
        const data = await res.json();
        if (data.book) {
            location.assign('/books');
        };

        if (data.errors) {
            console.log(data.errors)
            titleError.textContent = data.errors.title;
            authorError.textContent = data.errors.author;
            isbnError.textContent = data.errors.isbn;
            callNoError.textContent = data.errors.callNo;
            descriptionError.textContent = data.errors.description;
            imgError.textContent = data.errors.img;
        };
    });
};

// sign up
const signupForm = document.getElementById('signup-form');

if (signupForm) {
    signupForm.addEventListener('submit', async e => {
        e.preventDefault();

        // get form values
        const titles = signupForm.titles.value;
        const firstName = signupForm.firstName.value;
        const lastName = signupForm.lastName.value;
        const email = signupForm.email.value;
        const password = signupForm.password.value;
        const password1 = signupForm.password1.value;
        const phone = signupForm.phone.value;
        const hospital = signupForm.hospital.value;
        const dept = signupForm.dept.value;
        const position = signupForm.position.value;

        // errors message
        const titlesError = signupForm.querySelector('.titles.error');
        const firstNameError = signupForm.querySelector('.firstName.error');
        const lastNameError = signupForm.querySelector('.lastName.error');
        const emailError = signupForm.querySelector('.email.error');
        const passwordError = signupForm.querySelector('.password.error');
        const password1Error = signupForm.querySelector('.password1.error');
        const phoneError = signupForm.querySelector('.phone.error');;
        const hospitalError = signupForm.querySelector('.hospital.error');
        const deptError = signupForm.querySelector('.dept.error');
        const positionError = signupForm.querySelector('.position.error');

        // reset error messages
        titlesError.textContent = '';
        firstNameError.textContent = '';
        lastNameError.textContent = '';
        emailError.textContent = '';
        passwordError.textContent = '';
        password1Error.textContent = '';
        phoneError.textContent = '';
        hospitalError.textContent = '';
        deptError.textContent = '';
        positionError.textContent = '';


        // check if password matching, if yes send data to server
        if (password !== password1) {
            password1Error.textContent = 'Password must match.';
        } else {
            const res = await fetch('/users/signup', {
                method: 'POST',
                body: JSON.stringify({
                    titles,
                    firstName,
                    lastName,
                    email,
                    password,
                    phone,
                    hospital,
                    dept,
                    position
                }),
                headers: { 'Content-Type': 'application.json' }
            });

            // handle the response
            const data = await res.json();
            if (data.user) {
                location.assign('/'); // temporary
            };

            if (data.errors) {
                titlesError.textContent = data.errors.titles;
                firstNameError.textContent = data.errors.firstName;
                lastNameError.textContent = data.errors.lastName;
                emailError.textContent = data.errors.email;
                passwordError.textContent = data.errors.password;
                phoneError.textContent = data.errors.phone;
                hospitalError.textContent = data.errors.hospital;
                deptError.textContent = data.errors.dept;
                positionError.textContent = data.errors.position;
            };
        };
    });
};

/* Imports */
// this will check if we have a user and set signout link if it exists
import '../auth/user.js';
import { createPet, uploadImage } from '../fetch-utils.js';
// > Part A: import upload image
// > Part B: import fetch to create a pet

/* Get DOM Elements */
const petForm = document.getElementById('pet-form');
const errorDisplay = document.getElementById('error-display');
const imageInput = document.getElementById('image-input');
const preview = document.getElementById('preview');
const addButton = petForm.querySelector('button');

/* State */
let error = null;

/* Events */
imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
        preview.src = URL.createObjectURL(file);
    } else {
        preview.src = '../assets/pet-photo-placeholder.png';
    }
});

petForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(petForm);

    const imageFile = formData.get('image');
    const randomFolder = Math.floor(Date.now() * Math.random());
    const imagePath = `pets/${randomFolder}/${imageFile.name}`;

    const url = await uploadImage('images', imagePath, imageFile);
    // > Part A: Call upload image with the bucket ("images"),
    // the imagePath, and the imageFile - and store the returned url

    const pet = {
        name: formData.get('name'),
        bio: formData.get('bio'),
        image_url: url,
        // > Part B: add the name, bio, and image_url fields to the pet object
    };

    const response = await createPet(pet);
    error = response.error;
    addButton.disabled = false;

    if (error) {
        displayError();
    } else {
        location.assign('/');
    }
    // > Part B:
    //    - call function to create the pet in the database
    //    - store the error and pets state from the response
    //    - either display the error or redirect the user to the home page
});

/* Display Functions */

function displayError() {
    if (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

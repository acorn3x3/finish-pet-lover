export function renderPet(pet) {
    const li = document.createElement('li');

    // > Part C: set the image url, name, and bio on
    // the right elements below:

    const img = document.createElement('img');

    const h2 = document.createElement('h2');

    const p = document.createElement('p');

    li.append(img, h2, p);

    return li;
}

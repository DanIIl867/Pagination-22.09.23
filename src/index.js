const apiKey = '39207285-d041e2c31bc045f629cb08e2c';
const perPage = 10;
let currentPage = 1;

const imageContainer = document.querySelector('.image-container');
const loadMoreButton = document.getElementById('load-more');
const pagination = document.getElementById('pagination');

async function fetchImages(page) {
    const response = await fetch(`https://pixabay.com/api/?key=${apiKey}&q=&page=${page}&per_page=${perPage}`);
    const data = await response.json();
    return data.hits;
}

function displayImages(images) {
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.webformatURL;
        imgElement.alt = image.tags;
        imageContainer.appendChild(imgElement);
    });
}

async function updatePage(page) {
    currentPage = page;
    const images = await fetchImages(currentPage);
    displayImages(images);
}

updatePage(currentPage);


async function loadMore() {
    const nextPage = currentPage + 1;
    const images = await fetchImages(nextPage);
    if (images.length > 0) {
        displayImages(images);
        currentPage = nextPage;
    } else {
        loadMoreButton.disabled = true;
        loadMoreButton.textContent = 'Більше зображень відсутні';
    }
}

loadMoreButton.addEventListener('click', loadMore);

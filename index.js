/* all code in index.js is currently only for the cat images program */
const imagesContainer = document.querySelector(".images-container");
const previousButton = document.querySelector(".previous");
const nextButton = document.querySelector(".next");

/* page startup */
let buttonClick = 0;
addImages(buttonClick);

previousButton.addEventListener("click", () => {
    buttonClick--;
    removeOldImages();
    changePage(buttonClick);
    addImages(buttonClick);
});

nextButton.addEventListener("click", () => {
    buttonClick++;
    removeOldImages();
    changePage(buttonClick);
    addImages(buttonClick);
});

function removeOldImages() {
    const allImages = document.querySelectorAll("img");
    allImages.forEach((catImage) => {
        catImage.remove();
    });
}

function changePage(number) {
    const pageIndicator = document.querySelector(".page-indicator");
    pageIndicator.textContent = `Showing page ${number}`;
}

async function addImages(number) {
    imagesContainer.textContent = "Loading...";
    previousButton.disabled = true;
    nextButton.disabled = true;
    try {
        const response = await fetch(
            `https://api.thecatapi.com/v1/images/search?limit=12&page=${number}&order=ASC`,
            {
                headers: {
                    "x-api-key": "2ed27aa1-4bc3-4364-b046-9f3a2adcd8dc",
                },
            }
        );
        const data = await response.json();
        imagesContainer.textContent = "";
        data.forEach((catImage) => {
            const img = document.createElement("img");
            imagesContainer.append(img);
            img.src = catImage.url;
        });
    } catch (error) {
        imagesContainer.textContent = "Something went wrong while fetching data from the server";
    }
    if (buttonClick > 0) {
        previousButton.disabled = false;
        nextButton.disabled = false;
    } else if (buttonClick === 0) {
        previousButton.disabled = true;
        nextButton.disabled = false;
    }
}

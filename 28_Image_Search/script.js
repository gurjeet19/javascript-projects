async function getApiKey() {
  const response = await fetch("http://localhost:3000/unsplash-api-key");
  const data = await response.json();
  return data.apiKey;
}

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;
let accessKey = "";

async function searchImages() {
  if (!accessKey) {
      accessKey = await getApiKey();  // Fetch API key from Express server
  }

  keyword = searchBox.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

  const response = await fetch(url);
  const data = await response.json();
  if (page === 1) {
      searchResult.innerHTML = "";
  }

  const results = data.results;

  results.map((result) => {
      const image = document.createElement("img");
      image.src = result.urls.small;
      const imageLink = document.createElement("a");
      imageLink.href = result.links.html;
      imageLink.target = "_blank";  // Open link in a new tab

      imageLink.appendChild(image);
      searchResult.appendChild(imageLink);
  });
  showMoreBtn.style.display = "block";
}

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  page = 1;
  await searchImages();
});

showMoreBtn.addEventListener("click", async () => {
  page++;
  await searchImages();
});

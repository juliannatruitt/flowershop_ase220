//var offset = 0;
//var rpp = 3;
let document_url = "https://jsonblob.com/api/1212461580683173888"
//var flowerarray= [];

async function flower_card(flower, index) {
    try {
        let html = '';
        let htmlSegment = `
            <div class="col-lg-4 col-sm-12" data-index="${index}">
                <div class="card" style="width: 18rem;">
                    <img src="${flower.image}" class="card-img-top" alt="Image of ${flower.name}">
                    <div class="card-body">
                        <h5 class="card-title">${flower.name}</h5>
                        <p class="card-text">Price: $${flower.price}</p>
                        <a href="detail.html?id=${index}" class="card-link">More information</a>
                        <a href="update.html?id=${index}"><button class="btn btn-small btn-primary btn-edit-flower">Edit</button></a>
                        <button class="btn btn-sm btn-danger" data-index="${index}">Delete</button>
                    </div>
                </div>
            </div>`;

        document.getElementById("flower_container").innerHTML += htmlSegment;
    } catch (error) {
        console.error("Error while processing flower data:", error);
    }
}

function getQueryParam(key){
    let queryParams=new URLSearchParams(window.location.search);
    return queryParams.has(key) ? queryParams.get(key) : null;
}

// Function to handle editing a flower card
function edit_flower(index, newData) {
    flowerarray[index] = newData;
    renderFlowerCards(); // Re-render flower cards after editing
}

function flower_details(id, flowerarray){
    console.log(id);
    if (id !== null && id >= 0 && id < flowerarray.length) {
        let html = 
        `<div class="row">
        <div class="col-lg-6 col-sm-12">
            <img src="${flowerarray[id].image}" class="card-img-top" alt="Image of a ${flowerarray[id].name}">
        </div>
        <div class="col-lg-6 col-sm-12">
            <dl class="row"></dl>
            <dt class="col-sm-3">Name:</dt>
            <dd class="col-sm-9">${flowerarray[id].name}</dd>
            <dt class="col-sm-3">Flowers included:</dt>
            <dd class="col-sm-9">${flowerarray[id].flowers}</dd>
            <dt class="col-sm-3">For occassion:</dt>
            <dd class="col-sm-9">${flowerarray[id].occasion}</dd>
            <dt class="col-sm-3">Price:</dt>
            <dd class="col-sm-9">${flowerarray[id].price}</dd>
        `;
        document.getElementById('flower_details_container').innerHTML = html;
    } else {
        window.location.href = 'index.html';
    }
}

function add_the_flowers_to_page() {
    for (let i=offset; i < Math.min(offset+rpp, flowerarray.length); i++){
          flower_card(flowerarray[i], i);
        }
  };

function create_pagination_buttons(pages){
    $('#hold_buttons').empty();
    for (let i=0; i<pages; i++){
        let page_number_button = document.createElement('button');
        page_number_button.setAttribute('data-page', i+1);
        page_number_button.classList.add('btn_pagination');
        page_number_button.classList.add('btn');
        page_number_button.classList.add('btn-outline-primary');
        page_number_button.classList.add('m-1');
        page_number_button.innerText=i+1;

        if (i === Math.ceil(offset / rpp)) {
            page_number_button.classList.remove('btn-outline-primary');
            page_number_button.classList.add('btn-primary');
            page_number_button.classList.add('disabled');
        }
        $('#hold_buttons').append(page_number_button);
    }
};

function calculate_pages(flowerarray){
        pages = Math.ceil(flowerarray.length / rpp);
        return pages;
};
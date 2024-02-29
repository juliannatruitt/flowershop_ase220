//const api_url="http://jsonblob.com/api/jsonBob/1212461580683173888";
//
//document.addEventListener("DOMContentLoaded", function() {
//    fetch(api_url)
//        .then(response => response.json())
//        .then(data => {
//            flowerarray = data;
//            flower_card();
//        })
//        .catch(error => console.error("Error fetching data:", error));
//});
// async function load_file(url) {
//     try {
//         const response = await fetch(url);
//         const data = await response.text();
//         return data;
//     }   catch (error) {
//         console.error("Error while loading the file:", error);
//     }
// }


var offset = 0;
var rpp = 3;
let document_url = "http://jsonblob.com/api/1212461580683173888"
var flowerarray= [];
//   document.addEventListener("DOMContentLoaded", function() {
//   $.get(document_url, function(data, status){
//   flowerarray = data;
//   console.log(flowerarray);
//   });
// });
//
async function flower_card(flower, index) {
    try {
        let html = '';
        let htmlSegment = `
            <div class="col-lg-4 col-sm-12" data-index="${index}">
                <div class="card" style="width: 18rem;">
                    <img src="${flower.image}" class="card-img-top" alt="Image of ${flower.name}">
                    <div class="card-body">
                        <h5 class="card-title">${flower.name}</h5>
                        <p class="card-text">Price: ${flower.price}</p>
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

// function flower_cards() {
//     // Add event listeners for edit and delete buttons
//     document.querySelectorAll('.btn-edit-flower').forEach(button => {
//         button.addEventListener('click', function() {
//             // Implement edit functionality
//             // You need to determine the index of the flower to edit
//             // Then you can call edit_flower(index, newData)
//         });
//     });
//     document.querySelectorAll('.btn-danger').forEach(button => {
//         button.addEventListener('click', function() {
//             const index = parseInt(button.getAttribute('data-index'));
//             delete_flower(index);
//         });
//     });
// }

// Function to handle editing a flower card
function edit_flower(index, newData) {
    flowerarray[index] = newData;
    renderFlowerCards(); // Re-render flower cards after editing
}

// Function to handle deleting a flower card
function delete_flower(index) {
    flowerarray.splice(index, 1);
    flower_cards(); // Re-render flower cards after deletion
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
            <dl class="row" id="pet_box">
            </dl>
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

$(document).on('click', '.btn-danger', function(event) {
    event.stopPropagation();
    console.log($(this))
    const index = parseInt($(this).attr('data-index'));
    console.log(index);
    petarray.splice(index, 1);
    $(this).closest('.col-lg-4').remove();
    $.ajax({
        type: "PUT",
        url: document_url,
        data: JSON.stringify(flowerarrayarray),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(xhr,data,response){
            console.log(xhr);
            console.log(data);
            console.log(response);
            console.log(response.getAllResponseHeaders());
        },
        error: function(errMsg) {
            console.log(errMsg);
        }
    });
});
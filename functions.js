const api_url="http://jsonblob.com/api/1212461580683173888";

document.addEventListener("DOMContentLoaded", function() {
    fetch(api_url)
        .then(response => response.json())
        .then(data => {
            flowerarray = data;
            flower_cards();
        })
        .catch(error => console.error("Error fetching data:", error));
});
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
var rpp = 9;

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
                        <a href="detail.html" class="card-link">More information</a>
                        <button class="btn btn-small btn-primary btn-edit-flower">Edit</button>
                        <button class="btn btn-sm btn-danger" data-index="${index}">Delete</button>
                    </div>
                </div>
            </div>`;

        document.getElementById("flower_container").innerHTML += htmlSegment;
    } catch (error) {
        console.error("Error while processing flower data:", error);
    }
    if (offset+rpp > flowerarray.length) more_flowers.hidden = true;
}




function flower_cards() {
    document.getElementById("flower_container").innerHTML = ""; // Clear existing content
    for (let i = offset; i < Math.min(offset + rpp, flowerarray.length); i++) {
        flower_card(flowerarray[i], i);
    }
    // Add event listeners for edit and delete buttons
    document.querySelectorAll('.btn-edit-flower').forEach(button => {
        button.addEventListener('click', function() {
            // Implement edit functionality
            // You need to determine the index of the flower to edit
            // Then you can call edit_flower(index, newData)
        });
    });
    document.querySelectorAll('.btn-danger').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(button.getAttribute('data-index'));
            delete_flower(index);
        });
    });
}

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


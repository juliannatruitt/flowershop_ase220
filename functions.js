const api_url="http://jsonblob.com/api/1212134580797956096";

async function load_file(url) {
    try {
        const response = await fetch(url);
        const data = await response.text();
        return data;
    }   catch (error) {
        console.error("Error while loading the file:", error);
    }
}


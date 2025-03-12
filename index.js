function loadButton() {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => {
            // console.log("API Response:", data); 
            displayCategory(data.categories
            );
        })
        .catch(error => console.error("fetch problem:", error));
}

function displayCategory(buttons) {
    console.log("Loaded Categories:", buttons);
    const myButton = document.getElementById('container-category');


    for (const button of buttons) {
        const div = document.createElement('div');
        div.innerHTML = `
            <button class="btn hover:bg-red-600 hover:text-white">${button.category
            }</button>
        `;
        myButton.appendChild(div);
    }
}

loadButton();

const videoLoad = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => {
            console.log(data.videos);
            videoContainer(data.videos);
        })
}

const videoContainer = (videos) => {
    const container = document.getElementById('video-container');
    videos.forEach(video => {
        const videoCart = document.createElement('div');
        videoCart.innerHTML = `
            <div class="card bg-base-100 shadow-md">
                    <figure class="relative ">
                        <img class="w-full h-[150px] object-cover" src=${video.thumbnail} alt="" />
                        <span class="absolute bottom-2 right-2 bg-black px-2 py-1 text-sm text-white rounded-sm">3hrs 56 min ago</span>
                    </figure>
                    <div class=" flex gap-4 px-1 mt-4">
                       <div>
                        <div class="avatar">
                            <div class="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2">
                                <img  src=${video.authors[0].profile_picture} />
                            </div>
                        </div>
                       </div>
                       <div>
                        <h2 class="text-xl font-bold ">${video.title}</h2>
                        <p class="text-gray-500 flex gap-4  mt-3">${video.authors[0].profile_name} <img class="w-8" src="./assets/ok1.png" alt=""> </p>
                        <p class="text-gray-500">${video.others.views} views </p>
                       </div>
                    </div>
                </div>

        `;
        container.appendChild(videoCart)
    })
}




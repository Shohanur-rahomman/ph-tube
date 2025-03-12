function removeActive() {
    const btns = document.getElementsByClassName('active');
    for (let btn of btns) {
        btn.classList.remove('active');
    }
}

function loadButton() {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => {
            // console.log("API Response:", data); 
            displayCategory(data.categories);
        })
        .catch(error => console.error("fetch problem:", error));
}

const categoriesVideos = (id) => {
    let url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActive();
            const clickButton = document.getElementById(`btn-${id}`);
            clickButton.classList.add('active')
            console.log(clickButton);
            videoContainer(data.category)
        })
}



function displayCategory(buttons) {

    const myButton = document.getElementById('container-category');


    for (const button of buttons) {
        const div = document.createElement('div');
        div.innerHTML = `
            <button id="btn-${button.category_id}" onclick="categoriesVideos(${button.category_id})" class="btn hover:bg-red-600 hover:text-white">${button.category
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
            removeActive()
            document.getElementById('btn-all').classList.add('active')
            videoContainer(data.videos);
        })
}

const loadVideoDetails = (videoId) => {
    console.log(videoId);
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => videoDisplayDetails(data.video))
}

const videoDisplayDetails = (video) => {
    console.log(video);
    document.getElementById('video_details').showModal();
    const detailsContainer = document.getElementById('details-container');

    detailsContainer.innerHTML = `
    <div class="card bg-base-100  shadow-sm">
  <figure>
    <img
      src=${video.thumbnail}
      alt="" />
  </figure>
  <div class="">
    <h2 class="cart text-xl font-bold mt-2">${video.title}</h2>
    <p class="text-lg font-semibold">${video.authors[0].profile_name}</p>
    <p>${video.description}</p>
  </div>
</div>

    `
}

const videoContainer = (videos) => {
    const container = document.getElementById('video-container');
    container.innerHTML = '';//before data remove
    if (videos.length === 0) {
        container.innerHTML = `
        <div class="col-span-full flex flex-col justify-center items-center py-10">
                <img src="./assets/Icon.png" alt="">
                <h2 class="text-3xl font-bold">Oops!! Sorry, There is no content here</h2>
              </div> 
        `
        return;
    }
    videos.forEach(video => {
        const videoCart = document.createElement('div');
        videoCart.innerHTML = `
            <div class="card bg-base-100 shadow-md">
                    <figure class="relative ">
                        <img class="w-full h-[150px] object-cover" src=${video.thumbnail} alt="" />
                        <span class="absolute bottom-2 right-2 bg-black px-2 py-1 text-sm text-white rounded-sm">3hrs 56 min ago</span>
                    </figure>
                    <div class=" flex gap-4 px-1 mt-4 pl-2">
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
                        <p class="text-gray-500 pb-2">${video.others.views} views </p>
                       </div>
                    </div>
                    <button onclick=loadVideoDetails('${video.video_id}') class="btn btn-block">Show details</button>
                </div>

        `;
        container.appendChild(videoCart)
    })
}




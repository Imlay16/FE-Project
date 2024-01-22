const btn = document.querySelector('.show-more-btn');

const subBtn = document.querySelector('.subscribe button');
const modalBtn = document.querySelector('#modal');
const okBtn = document.querySelector('#modal button');

const scrollBtn = document.querySelector('.bottom-img img:last-child');

const showBtn = document.querySelector('.show-more-btn');
const showFrame = document.querySelector('.show-btn');

const modalNode = document.querySelector('#modal p');
let inputValue;

showBtn.onclick = () => {
    window.scrollTo({top: 800, behavior: "smooth"});
    showFrame.style.display = "none";
}

scrollBtn.onclick = () => {
    window.scrollTo({top: 0, behavior:"auto"});
}
function mouseover() {
    scrollBtn.setAttribute("src", "./images/scroll-top-btn-hover.png");
}

function mouseleave() {
    scrollBtn.setAttribute("src", "./images/scroll-top-btn.png");
}

subBtn.addEventListener('click', function() {
    modalBtn.style.display = "flex";
    inputValue = document.querySelector('.input-form input').value;
    const newTag = document.createElement("span");
    newTag.innerText = inputValue;
    modalBtn.insertBefore(newTag, modalNode);
})

okBtn.addEventListener('click', function () {
    modalBtn.style.display = "none";
    const tag = document.querySelector('#modal span');
    tag.remove();
})


const imagelist = document.querySelector('.infinite-img');
let pageTofetch = 1;
let temp;

btn.addEventListener('click', ()=> {
    window.addEventListener('scroll', ()=> {
        const height = window.innerHeight + document.documentElement.scrollTop + 10;

        if(!temp) {
            temp = setTimeout(function() {
                temp = null;

                if (height >= document.documentElement.offsetHeight) {
                    fetchImages(pageTofetch++);
                }
            }, 300);
        }
    })
})

fetchImages();
async function fetchImages(pageNum){
    try {
        const response = await fetch('https://picsum.photos/v2/list?page=' + pageNum + '&limit=6');
        if (!response.ok) {
            throw new Error('네트워크 응답에 문제가 있습니다.');
        }

        const datas = await response.json();

        makeImageList(datas);

    } catch (error) {
        console.error('데이터를 가져오는데 문제가 발생했습니다 :', error);
    }
}
function makeImageList(datas) {
    if (imagelist.children.length < datas[5].id && imagelist.children.length < 100) {
        datas.forEach((item)=> {
            imagelist.innerHTML += "<li><img src=" + item.download_url + " alt=''></li>"
        })
    }
}

var mapContainer = document.getElementById('map-frame'), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption);

var markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);

// 마커를 생성합니다
var marker = new kakao.maps.Marker({
    position: markerPosition
});

// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);

// 마커가 드래그 가능하도록 설정합니다
marker.setDraggable(true);
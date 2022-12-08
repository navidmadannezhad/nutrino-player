// all we need to do, reference the js file
// create a play button on videos with class "ntr-play-btn"
// pass the aparat url into data-ntrurl
// done!

let videoModalHtml = `
    <div class="videoModal videoModal-closed">
        <button class="close">close</button>
        <div class="container">
        </div>
    </div>
`;

let videoModalCss = `
    .videoModal{
        background: linear-gradient(to bottom, rgba(0,0,0,0.7),rgba(0,0,0,0));
        height: 100vh;
        width: 100%;

        position: fixed;
        top: 0;
        left: 0;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        align-items: center;
        transition: all 0.5s ease-in;
        z-index:9999;
    }

    .videoModal .close{
        width: 90%;
        max-width: 800px;
        color:white;

        background-color: transparent;
        border: none;
        margin-top: 40px;

        font-size: 1.1rem;
        font-family: sans-serif;
        cursor: pointer;

        text-align: right;
    }

    .videoModal .container{
        width: 100%;
        max-width: 800px;
        margin-top: 100px;
    }

    .video-modal .container > div{
        width: 100%;
    }

    .videoModal-opened{
        transform: translate(0,0);
    }
    .videoModal-closed{
        transform: translate(0,-100%);
    }
`

exports.initNtrPlayer = () => {
    window.addEventListener("load", () => {
        const organizeModal = () => {
            let parser = new DOMParser();
            let modalDom = parser.parseFromString(videoModalHtml, 'text/html');
            document.body.appendChild(modalDom.getRootNode().body.children[0]);
    
            let styleEl = document.createElement("style");
            styleEl.textContent = videoModalCss;
            document.head.appendChild(styleEl);
        }
        
        organizeModal();
    
        let videoModalCloseBtn = document.querySelector(".videoModal .close");
        let videoModal = document.querySelector(".videoModal");
        
        const initiateVideo = (videoUrl, randomID) => {
            let divEl = document.createElement("div");
            divEl.setAttribute("id", randomID);
            document.querySelector(".videoModal .container").appendChild(divEl);
        
            let scrEl = document.createElement("script");
            scrEl.setAttribute("src", `https://www.aparat.com/embed/${videoUrl.slice(25,videoUrl.length)}?data[rnddiv]=${randomID}&data[responsive]=yes`);
            document.querySelector(".videoModal .container > div").appendChild(scrEl);
        }
    
        const cleanVideoContainer = () => {
            let containerChild = document.querySelector(".videoModal .container > div");
            if(containerChild){
                document.querySelector(".videoModal .container").removeChild(containerChild);
            }
        }
        
        document.addEventListener("click", e => {
            if(e.target.classList.contains("ntr-play-btn")){
                let videoUrl = e.target.dataset.ntrurl;
                if(videoUrl){
                    let randomID = String(Math.random()).slice(2, 13);
                    cleanVideoContainer();
    
                    initiateVideo(videoUrl, randomID);
                    toggleVideoModal();
                }
            }
        });
          
        videoModalCloseBtn.addEventListener("click", e => {
            toggleVideoModal();
        })
        
        const toggleVideoModal = () => {
            
            let videoModalClosed = videoModal.classList.contains("videoModal-closed");
        
            if(videoModalClosed){
                videoModal.classList.remove("videoModal-closed");
                videoModal.classList.add("videoModal-opened");
            }else{
                cleanVideoContainer();
                videoModal.classList.remove("videoModal-opened");
                videoModal.classList.add("videoModal-closed");
            }
        }
    })
}
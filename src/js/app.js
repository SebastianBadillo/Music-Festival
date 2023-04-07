document.addEventListener('DOMContentLoaded', function(){
    startApp();
});

function startApp(){
    fixedNavegation();
    createGallery();
    scrollNav();
}

function fixedNavegation(){
    const header = document.querySelector('.header');
    const festival = document.querySelector('.festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function(){
        console.log(festival.getBoundingClientRect());

        if(festival.getBoundingClientRect().bottom<0){
            header.classList.add('fixedd');
            body.classList.add('body-scroll')

        }else{
            header.classList.remove('fixedd');
            body.classList.remove('body-scroll');
        }
    })

    console.log(header);
}



function scrollNav(){
    const links = document.querySelectorAll('.principal-navegation a');
    links.forEach(link =>{
        link.addEventListener('click', function(e){
            e.preventDefault();
            const scrollSection = e.target.attributes.href.value;
            const section = document.querySelector(scrollSection);
            section.scrollIntoView({behavior: "smooth"});
        })
    });
}   

function createGallery(){
    const gallery = document.querySelector('.gallery-container')
    for(let i = 1; i <= 12; i++ ){
        const image = document.createElement('picture');
        image.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img loading= "lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="Singer Image">
            
        
        `;
        image.onclick = function() {
            showImgae(i);
        }
        gallery.appendChild(image);

    }

}

function showImgae(id){
    const image = document.createElement('picture');
        image.innerHTML = `
            <source srcset="build/img/grande/${id}.avif" type="image/avif">
            <source srcset="build/img/grande/${id}.webp" type="image/webp">
            <img loading= "lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="Singer Image">
            
        `;

        // Create overlay with the image
        const overlay = document.createElement('DIV');
        overlay.appendChild(image);
        overlay.classList.add('overl');
        overlay.onclick= function(){
            const body= document.querySelector('body');
            overlay.remove();
            body.classList.remove('fix-body');
        }

        // Button for closing the Modal
        const closeModal = document.createElement('P');
        closeModal.textContent = 'X';
        closeModal.classList.add('btn-close');
        closeModal.onclick= function(){
            const body= document.querySelector('body');
            overlay.remove();
            body.classList.remove('fix-body');
        };

        overlay.appendChild(closeModal);

        // Add to the body
        const body= document.querySelector('body');
        body.appendChild(overlay);
        body.classList.add('fix-body');

}

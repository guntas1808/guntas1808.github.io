// Loading Screen


function showPage(){
    document.querySelector('.loading-screen').classList.add('disappear-animation');


    document.querySelector('.image-frame').classList.add('appear-animate');
    document.querySelector('.caption').classList.add('appear-animate');

    document.querySelectorAll('.intro-span').forEach(elem => elem.classList.add('appear-animate'));
    document.querySelectorAll('.letter-span').forEach(elem => elem.classList.add('letter-pop-animate'));

    document.querySelectorAll('.social-icon').forEach(elem => elem.classList.add('social-links-animate'));
}

window.addEventListener('load', showPage);

// Handling square elements
let square_elements =  document.querySelectorAll('.square');

function resizeSquareElements(){
    square_elements.forEach(elem => elem.style.height = elem.offsetWidth + 'px');
}

resizeSquareElements();
window.addEventListener('resize', resizeSquareElements);

// Adjusting image at the centre of a frame and fill the frame
let square_images = document.querySelectorAll('.centre-image');

function adjustSquareImage(img){
    // console.log(img.clientWidth,img.clientHeight);
    // console.log('adjusting ', img);
    let overflow;
    let img_height = img.offsetHeight;
    let img_width = img.offsetWidth;
    let img_ratio = img_width/img_height;
    let frame_height = img.parentNode.offsetHeight;
    let frame_width = img.parentNode.offsetWidth;
    let frame_ratio = frame_width/frame_height;

    // console.log(img_width, img_height, frame_width, frame_height);
    if(frame_ratio > img_ratio){
        img.style.setProperty('height', 'initial');
        img.style.width = '100%';
        overflow = img.offsetHeight - frame_height;
        img.style.top = '-' + (overflow/2) + 'px';
    }else if(frame_ratio < img_ratio){
        img.style.setProperty('width', 'initial');
        img.style.height = '100%';
        overflow = img.offsetWidth - frame_width;
        img.style.left = '-' + (overflow/2)+ 'px';
    }

    // console.log(img.offsetWidth, img.offsetHeight, img.parentNode.offsetWidth, img.parentNode.offsetHeight);
}

function adjustSquareImages(){
    square_images.forEach(img => adjustSquareImage(img));
}

square_images.forEach(img => (img.onload = function(){adjustSquareImage(this)}));
window.addEventListener('resize', adjustSquareImages);

adjustSquareImages();

// Tab Switching Logic
let tab_map = {
    'home-tab-content' : 0,
    'skills-tab-content' : 1,
    'projects-tab-content' : 2,
    'education-tab-content' : 3,
    'experience-tab-content' : 4,
    'interests-tab-content' : 5,
    'contact-tab-content' : 6
                }
let tabs = document.querySelectorAll('.tab');
let sections = document.querySelectorAll('section');

let skill_bars = document.querySelectorAll('.bar');
let letter_spans = document.querySelectorAll('.letter-span');

function activateTab(e){
    tabs.forEach(tab => tab.classList.remove('active'));

    // sections.forEach(section => section.classList.remove('show-section'));

    this.classList.add('active');
    // console.log(document.getElementById('sections-container').style.left);
    let tab_class = `${this.id}-content`;
    console.log(tab_class);

    if(tab_class == 'skills-tab-content'){
        skill_bars.forEach(bar => bar.classList.add('bar-animate'));
    }else{
        skill_bars.forEach(bar => bar.classList.remove('bar-animate'));
    }

    if(tab_class == 'home-tab-content'){

        document.querySelector('.image-frame').classList.add('appear-animate');
        document.querySelector('.caption').classList.add('appear-animate');
    
        document.querySelectorAll('.intro-span').forEach(elem => elem.classList.add('appear-animate'));
        document.querySelectorAll('.letter-span').forEach(elem => elem.classList.add('letter-pop-animate'));
    
        // document.querySelectorAll('.social-icon').forEach(elem => elem.classList.add('social-links-animate'));
    }else{

        document.querySelector('.image-frame').classList.remove('appear-animate');
        document.querySelector('.caption').classList.remove('appear-animate');
    
        document.querySelectorAll('.intro-span').forEach(elem => elem.classList.remove('appear-animate'));
        document.querySelectorAll('.letter-span').forEach(elem => elem.classList.remove('letter-pop-animate'));
    
        // document.querySelectorAll('.social-icon').forEach(elem => elem.classList.remove('social-links-animate'));
    }

    document.getElementById('sections-container').style.left = '-' + tab_map[`${this.id}-content`]*100 + '%';
    // document.getElementById(`${this.id}-content`).classList.add('show-section');
    // sections.forEach(section => console.log(section.classList));
}

tabs.forEach(tab => tab.addEventListener('click', activateTab))
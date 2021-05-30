// Handling square elements
let square_elements =  document.querySelectorAll('.square');

function resizeSquareElements(){
    square_elements.forEach(elem => elem.style.height = elem.offsetWidth + 'px');
}

resizeSquareElements();
window.addEventListener('resize', resizeSquareElements);

// Adjusting image in a square frame
let square_images = document.querySelectorAll('.square-image');

function adjustSquareImage(img){
    console.log(img.clientWidth,img.clientHeight);
    console.log('adjusting ', img);
    let overflow;
    if(img.offsetWidth < img.offsetHeight){
        img.style.setProperty('height', 'initial');
        img.style.width = '100%';
        overflow = img.offsetHeight - img.offsetWidth;
        img.style.top = '-' + (overflow/2) + 'px';
    }else if(img.offsetWidth > img.offsetHeight){
        img.style.setProperty('width', 'initial');
        img.style.height = '100%';
        overflow = img.offsetWidth - img.offsetHeight;
        img.style.left = '-' + (overflow/2)+ 'px';
    }
}

function adjustSquareImagess(){
    square_images.forEach(img => adjustSquareImage(img));
}

square_images.forEach(img => (img.onload = function(){adjustSquareImage(this)}));
window.addEventListener('resize', adjustSquareImagess);

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

function activateTab(e){
    tabs.forEach(tab => tab.classList.remove('active'));

    // sections.forEach(section => section.classList.remove('show-section'));

    this.classList.add('active');
    // console.log(document.getElementById('sections-container').style.left);
    let tab_class = `${this.id}-content`;
    console.log(tab_class);
    if(tab_class == 'skills-tab-content'){
        document.querySelectorAll(".bar").forEach(bar => bar.classList.add('bar-animate'));
    }else{
        document.querySelectorAll(".bar-animate").forEach(bar => bar.classList.remove('bar-animate'));
    }

    document.getElementById('sections-container').style.left = '-' + tab_map[`${this.id}-content`]*100 + '%';
    // document.getElementById(`${this.id}-content`).classList.add('show-section');
    // sections.forEach(section => console.log(section.classList));
}

tabs.forEach(tab => tab.addEventListener('click', activateTab))
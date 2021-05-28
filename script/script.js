// Handling square elements
let square_elements =  document.querySelectorAll('.square');

function resizeSquareElements(){
    square_elements.forEach(elem => elem.style.height = elem.offsetWidth + 'px');
}

resizeSquareElements();
window.addEventListener('resize', resizeSquareElements);

// Handling images inside a square frame
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
    }else{
        img.style.setProperty('width', 'initial');
        img.style.height = '100%';
        overflow = img.offsetWidth - img.offsetHeight;
        img.style.left = '-' + (overflow/2)+ 'px';
    }
}

function adjustSquareImages(){
    square_images.forEach(img => adjustSquareImage(img));
}

square_images.forEach(img => (img.onload = function(){adjustSquareImage(this)}));
window.addEventListener('resize', adjustSquareImages);

// Tab Switching Logic

let tabs = document.querySelectorAll('.tab');
let sections = document.querySelectorAll('section');

function activateTab(e){
    tabs.forEach(tab => tab.classList.remove('active'));

    sections.forEach(section => section.classList.remove('show-section'));

    this.classList.add('active');
    document.getElementById(`${this.id}-content`).classList.add('show-section');
    sections.forEach(section => console.log(section.classList));
}

tabs.forEach(tab => tab.addEventListener('click', activateTab))
// ****************************************************************************************************
//**************************************** Loading Screen *********************************************
// ****************************************************************************************************
function showPage(){
    document.querySelector('.loading-screen').classList.add('disappear-animation');


    document.querySelector('.image-frame').classList.add('appear-animate');
    document.querySelector('.caption').classList.add('appear-animate');

    document.querySelectorAll('.intro-span').forEach(elem => elem.classList.add('appear-animate'));
    document.querySelectorAll('.letter-span').forEach(elem => elem.classList.add('letter-pop-animate'));

    document.querySelectorAll('.social-icon').forEach(elem => elem.classList.add('social-links-animate'));
}

window.addEventListener('load', showPage);

// *****************************************************************************************************
//************************************ Handling square elements ****************************************
// *****************************************************************************************************
let square_elements =  document.querySelectorAll('.square');

function resizeSquareElements(){
    square_elements.forEach(elem => elem.style.height = elem.offsetWidth + 'px');
}

resizeSquareElements();
window.addEventListener('resize', resizeSquareElements);
// ******************************************************************************************************
//**************************************** Home Section  *****************************************
// ******************************************************************************************************
let home_section_content = document.querySelector('#home-tab-content');

function setHomeSectionLines(){
    let intro_elem_style = getComputedStyle(home_section_content.children[1]);
    let intro_para_style = getComputedStyle(home_section_content.children[1].children[1])
    let image_frame_elem = home_section_content.children[0].children[0];
    let horizontal_line_elem = image_frame_elem.children[0];
    let vertical_line_elem = image_frame_elem.children[1];

    horizontal_line_elem.style.left = (image_frame_elem.offsetWidth-2) + 'px';
    horizontal_line_elem.style.top = image_frame_elem.offsetHeight/2 + 'px';
    horizontal_line_elem.style.width = parseInt(intro_elem_style.paddingLeft.slice(0,-2)) + parseInt(intro_para_style.marginLeft.slice(0,-2)) + 3 + 'px';
    console.log(parseInt(intro_elem_style.paddingLeft.slice(0,-2)) + 'px');

    let caption_elem_style = getComputedStyle(home_section_content.children[0].children[1]);
    vertical_line_elem.style.top = image_frame_elem.offsetHeight - 2;
    vertical_line_elem.style.left = image_frame_elem.offsetWidth/2;
    vertical_line_elem.style.height =  parseInt(caption_elem_style.marginTop.slice(0, -2)) + 3 + 'px';
    console.log(vertical_line_elem.style.height);
}

window.addEventListener('load', setHomeSectionLines);
window.addEventListener('resize', setHomeSectionLines);
// ******************************************************************************************************
//**************************************** Experience Timeline  *****************************************
// ******************************************************************************************************
let experience_entries= document.querySelectorAll('.experience-entry')

function setTimelineElementDimensions(experience_entry){
    let date_elem = experience_entry.children[0];
    let timeline_elem = experience_entry.children[1];
    let description_elem = experience_entry.children[2];

    let image_elem = timeline_elem.children[0];
    let bottom_line_elem = timeline_elem.children[1];
    let horizontal_line_elem = timeline_elem.children[2];

    let image_width = timeline_elem.children[0].offsetWidth;
    
    image_elem.style.height = image_width + 'px';
    
    // console.log(timeline_elem.children[2]);

    bottom_line_elem.style.height = '0px';             //set the timeline height to 0 to let description div adjust its height
    description_elem = experience_entry.children[2]; //get updated description div

    timeline_elem.style.height = Math.max(image_width*1.7 , date_elem.offsetHeight, description_elem.offsetHeight) + 'px';   //Adjusting the size of timeline div
    bottom_line_elem.style.height = Math.max(image_width*0.7, timeline_elem.offsetHeight-image_width) + 'px';

    let image_margin = timeline_elem.offsetWidth - image_width;     //Adjusting position and size of the horzontal line
    let description_elem_style = getComputedStyle(description_elem.children[0]);
    horizontal_line_elem.style.width = (image_margin/2 + parseInt(description_elem_style.marginLeft.slice(0, -2))) + 'px';
    horizontal_line_elem.style.left = (image_width + image_margin/2) + 'px';
    horizontal_line_elem.style.top = image_width/2 + 'px';

    date_elem.style.paddingTop = image_width/2 + 'px';      //Adjusting position of the date div
    let date_horizontal_line = date_elem.children[0].children[0];
    date_horizontal_line.style.top = date_elem.children[0].offsetHeight/2 + 'px';
    date_horizontal_line.style.left = date_elem.children[0].offsetWidth - 2 + 'px';
    date_horizontal_line.style.width = image_margin/2 + (date_elem.offsetWidth - date_elem.children[0].offsetWidth) + 'px';
    console.log(date_elem.children[0].offsetWidth);
    // console.log(timeline_elem.offsetHeight, timeline_elem.children[0].offsetHeight, timeline_elem.children[1].offsetHeight );
}

function adjustTimeline(){
    experience_entries.forEach(experience_entry => setTimelineElementDimensions(experience_entry));
}

window.addEventListener('resize', e => adjustTimeline());
window.addEventListener('load', adjustTimeline);

// **********************************************************************************************************
//*********************** Adjusting image at the centre of a frame and fill the frame ***********************
//***********************************************************************************************************
let square_images = document.querySelectorAll('.centre-image');

function adjustSquareImage(img){
    console.log(img.clientWidth,img.clientHeight);
    console.log('adjusting ', img);
    let overflow;
    let img_height = img.offsetHeight;
    let img_width = img.offsetWidth;
    let img_ratio = img_width/img_height;
    let frame_height = img.parentNode.offsetHeight;
    let frame_width = img.parentNode.offsetWidth;
    let frame_ratio = frame_width/frame_height;

    console.log(img_width, img_height, frame_width, frame_height);
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

    console.log(img.offsetWidth, img.offsetHeight, img.parentNode.offsetWidth, img.parentNode.offsetHeight);
}

function adjustSquareImages(){
    square_images.forEach(img => adjustSquareImage(img));
}

square_images.forEach(img => (img.onload = function(){adjustSquareImage(this)}));
window.addEventListener('resize', adjustSquareImages);

adjustSquareImages();

// *********************************************************************************************************
//**************************************** Tab Switching Logic *********************************************
// *********************************************************************************************************
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
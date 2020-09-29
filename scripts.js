const sliderImages = document.querySelectorAll('.slide-in')
const hiddenMsg = document.querySelectorAll('span')
const pressed = []
const secretCode = 'thisdevislookingforwork'

function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function checkSlide(e) {
    sliderImages.forEach(sliderImg => {
        const slideInAt = (window.scrollY + window.innerHeight) - sliderImg.height / 2 // gives us scroll position at bottom of page instead of top(default) then gives us scroll position of 1/2 way through Img
        const imgBottom = sliderImg.offsetTop + sliderImg.height; // offSetTop gets the distance from the top of the page to top of the img then add the height of the Img to give the distance to bottom. 
        const isHalfShown = slideInAt > sliderImg.offsetTop;
        const isNotScrolledPast = window.scrollY < imgBottom;


        if (isHalfShown && isNotScrolledPast) {
            sliderImg.classList.add('active')
        } else {
            sliderImg.classList.remove('active')
        }
    })

    hiddenMsg.forEach(msg => {
        const slideInAt = (window.scrollY + window.innerHeight) - msg.offsetHeight // gives us scroll position at bottom of page instead of top(default) then gives us scroll position of 1/2 way through Img
        const msgBottom = msg.offsetTop + msg.offsetHeight; // offSetTop gets the distance from the top of the page to top of the img then add the height of the Img to give the distance to bottom. 
        const halfShown = slideInAt > msg.offsetTop;
        const notScrolledPast = window.scrollY < msgBottom;

        if (halfShown && notScrolledPast) {
            msg.classList.add('hiddenMsg')
        } else {
            msg.classList.remove('hiddenMsg')
        }
    })
}

function decode(e) {
    // if key is pressed put values into array and remove excess over length of secret code // 
    if (e.key) {
        pressed.push(e.key)
        pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length); // the - before secertCode.length allows the splice to go backwards replacing the first item in the array not the last. 

        let joinedPressed = pressed.join('')
        if (joinedPressed === secretCode) {
            window.location.assign("mailto:nikrowedev@gmail.com?Subject=" + encodeURIComponent('We love your work!') + "&body=" + encodeURIComponent('Thanks for contacting me! You can erase this and put your message content here :) '));

        }
    }
}

window.addEventListener('scroll', debounce(checkSlide))
window.addEventListener('keyup', decode)
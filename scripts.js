const sliderImages = document.querySelectorAll('.slide-in')

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

        console.log('imgBottom :', imgBottom)
        console.log('isHalfShown :', isHalfShown)
        console.log('isNotScrolledPast :', isNotScrolledPast)

        if (isHalfShown && isNotScrolledPast) {
            sliderImg.classList.add('active')
        } else {
            sliderImg.classList.remove('active')
        }

    })
}

window.addEventListener('scroll', debounce(checkSlide))
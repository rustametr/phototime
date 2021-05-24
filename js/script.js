let design_blocks_array = document.querySelectorAll('.design_text_container');
let design_left_button = document.querySelectorAll('.design_slider_button')[0];
let design_right_button = document.querySelectorAll('.design_slider_button')[1];
let design_indicator = document.getElementById('design_indicator');

let community_left_button = document.querySelectorAll('.community_slider_button')[0];
let community_right_button = document.querySelectorAll('.community_slider_button')[1];
let community_containers_array = document.querySelector('.community_img_container');

let design_transform_slide = 33.6;

let community_transform_slide = 60;

let active_page = 1;

let right_slise_amount = 0;
let left_slise_amount = 0;

let community_first_last = false;
let community_second_last = true;

let community_right_slise_amount = 0;
let community_left_slise_amount = 0;

design_left_button.addEventListener('click', function() {
	if (right_slise_amount >= 1) {
		for (let i = 0; i < design_blocks_array.length; i++) {
			design_blocks_array[i].style.transform = `translate(${design_transform_slide *
				(left_slise_amount + 1)}vw, 0)`;
		}
		right_slise_amount -= 1;
		design_indicator.innerHTML = `0${active_page - 1}/05`;
		active_page -= 1;
		left_slise_amount += 1;
	}
});

design_right_button.addEventListener('click', function() {
	if (right_slise_amount < 4) {
		for (let i = 0; i < design_blocks_array.length; i++) {
			design_blocks_array[i].style.transform = `translate(-${design_transform_slide *
				(right_slise_amount + 1)}vw, 0)`;
		}
		right_slise_amount += 1;
		design_indicator.innerHTML = `0${active_page + 1}/05`;
		active_page += 1;
		left_slise_amount -= 1;
	}
});

//функция throttle запускает функцию  func после задержки limit 
function throttle(func, limit) {
    let inThrottle
    return function() {
    const args = arguments
        const context = this;
        if (!inThrottle) {
            func.apply(context, args)
            inThrottle = true
            setTimeout(function() { inThrottle = false }, limit)
        }
    }
}

function endLeftMove() {
	community_containers_array.style.transition = '';
    //первые два элемента переставляются на последнюю позицию
    for (let i = 0; i < 2; i++) {
        let first_community_container = community_containers_array.children[0];
        first_community_container.remove();
        community_containers_array.append(first_community_container);
    }

	community_containers_array.style.transform = '';
}
// функция, которая передвигает элементы влево
function left() {
    community_containers_array.style.transition = `transform 0.3s`;
	community_containers_array.style.transform = `translateX(0px)`;

	setTimeout(endLeftMove, 300);
}


function endRightMove() {
    community_containers_array.style.transition = '';
    //последние два элемента переставляются на первую позицию
    for (let i = 0; i < 2; i++) {
        let last_community_container = community_containers_array.children[community_containers_array.children.length - 1];
        last_community_container.remove();
        community_containers_array.prepend(last_community_container);
    }
	community_containers_array.style.transform = '';
}
// функция, которая передвигает элементы вправо
function right() {
	let width = community_containers_array.offsetWidth;

	community_containers_array.style.transition = `transform 0.3s`;
    community_containers_array.style.transform = `translateX(calc(-64vw - ${width}px))`;
	setTimeout(endRightMove, 300);
}

community_left_button.addEventListener('click', throttle(left, 300));
community_right_button.addEventListener('click', throttle(right, 300));
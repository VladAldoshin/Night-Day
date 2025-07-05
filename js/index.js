console.clear();


let duration = 0.4;
let isDay = false;


let back = document.getElementById('back');
let front = document.getElementById('front');

let switchTime = () => {
	
	back.setAttribute('href', '#' + (isDay ? 'day' : 'night'));
	front.setAttribute('href', '#' + (isDay ? 'night' : 'day'));
}
let scale = 30;
let toNightAnimation = gsap.timeline();

toNightAnimation
.to('#night-content', {duration: duration * 0.5, opacity: 1, ease: 'power2.inOut', x: 0})
.to('#circle', {
	duration: duration,
	ease: 'power4.in',
	scaleX: scale,
	scaleY: scale,
	x: 1,
	transformOrigin: '100% 50%',
}, 0)
.to('.day-label', {duration: duration * 2, ease: 'power2.inOut', opacity: 0.2}, 0)
.to('.night-label', {duration: duration * 2, ease: 'power2.inOut', opacity: 1}, 0)
.set('#circle', {
	// transformOrigin: '0% 50%',
	scaleX:-scale,
	// x: 8.5,
	onUpdate: () => switchTime()
}, duration).to('#circle', {
	duration: duration,
	ease: 'power4.out',
	scaleX: -1,
	scaleY: 1,
	x: 2,
}, duration)
// .to('#night-back', {duration: duration, fill: '#000033'}, 0)
.to('.clouds', {duration: duration * 0.75, opacity: 0.7, ease: 'power2.inOut'}, duration * 1.25)
.to('#land', {duration: duration * 0.75, opacity: 1, ease: 'power2.inOut'}, duration * 1.25)
.to('body', {backgroundColor: '#b0b0b9', color: 'black', duration: duration * 2}, 0)

let stars = Array.from(document.getElementsByClassName('star'));
stars.map(star => gsap.to(star, {duration: 'random(0.4, 1.5)', repeat: -1, yoyo: true, opacity: 'random(0.2, 0.5)'}))
gsap.to('.clouds-big', {duration: 15, repeat: -1, x: -74, ease: 'linear'})
gsap.to('.clouds-medium', {duration: 20, repeat: -1, x: -65, ease: 'linear'})
gsap.to('.clouds-small', {duration: 25, repeat: -1, x: -71, ease: 'linear'})
gsap.to('#land', {duration: 7, repeat: -1, x: 18, ease: 'linear'})

let switchToggle = document.getElementById('input');
switchToggle.addEventListener('change', () => toggle())

let balloonSwitchTween = gsap.to('#switch', {duration: 6, y: -6, x: -1, ease: 'power2.inOut', repeat: -1, yoyo: true})
let balloonTween = gsap.to('#balloon', {duration: 6, y: -7, x: -2, rotate: 15, transformOrigin: '12 10', ease: 'power2.inOut', repeat: -1, yoyo: true})
let balloonStringTween = gsap.to('#string-bend', {duration: 6, rotate: -15, transformOrigin: '0 0',  morphSVG: "#string-straight", ease: 'power2.inOut', repeat: -1, yoyo: true})

let toggle = () => 
{
	isDay = switchToggle.checked == true;
	if (isDay) {
    	toNightAnimation.reverse();
		balloonSwitchTween.restart();
		balloonTween.restart();
		balloonStringTween.restart();
	} else {
    	toNightAnimation.play();
		balloonSwitchTween.pause();
		balloonTween.pause();
		balloonStringTween.pause();
		gsap.to('#switch', {duration: duration, y: 0, x: 0, ease: 'power2.inOut'})
		gsap.to('#balloon', {duration: duration, y: 0, x: -2, ease: 'power2.inOut'})
	}
}
toggle();
if(CodePen.isThumbnail) toggle();



toNightAnimation.reverse();
toNightAnimation.pause();
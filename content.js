const getVideo = () => document.querySelector('video');

chrome.runtime.onMessage.addListener((request) => {
	const video = getVideo();
	if (!video) return;

	switch (request.action) {
		case 'speed_up':
			video.playbackRate = Math.min(video.playbackRate + 0.25, 5);
			break;
		case 'speed_down':
			video.playbackRate = Math.max(video.playbackRate - 0.25, 0.25);
			break;
		case 'reset_speed':
			video.playbackRate = 1;
			break;
		case 'set_speed_1x':
			video.playbackRate = 1;
			break;
		case 'set_speed_2x':
			video.playbackRate = 2;
			break;
		case 'set_speed_3x':
			video.playbackRate = 3;
			break;
	}
});

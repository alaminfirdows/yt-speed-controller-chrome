const getVideo = () => document.querySelector('video');

const showToast = (message) => {
	// Remove existing toast if any
	const existingToast = document.querySelector('.video-speed-toast');
	if (existingToast) {
		existingToast.remove();
	}

	const toast = document.createElement('div');
	toast.className = 'video-speed-toast'; // Add class for easy selection
	toast.textContent = message;
	toast.style.position = 'fixed';
	toast.style.bottom = '20px';
	toast.style.right = '20px';
	toast.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
	toast.style.color = 'white';
	toast.style.padding = '10px 20px';
	toast.style.borderRadius = '5px';
	toast.style.zIndex = '10000';
	document.body.appendChild(toast);

	// Remove the toast after 2 seconds
	setTimeout(() => {
		toast.remove();
	}, 2000);
};

chrome.runtime.onMessage.addListener((request) => {
	const video = getVideo();
	if (!video) return;

	switch (request.action) {
		case 'speed_up':
			video.playbackRate = Math.min(video.playbackRate + 0.25, 5);
			showToast(`Speed: ${video.playbackRate}x`);
			break;
		case 'speed_down':
			video.playbackRate = Math.max(video.playbackRate - 0.25, 0.25);
			showToast(`Speed: ${video.playbackRate}x`);
			break;
		case 'reset_speed':
			video.playbackRate = 1;
			showToast('Speed reset to 1x');
			break;
		case 'set_speed_1_5x':
			video.playbackRate = 1.5;
			showToast('Speed set to 1.5x');
			break;
	}
});

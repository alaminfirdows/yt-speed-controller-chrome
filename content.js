const getVideo = () => {
	// Try multiple selectors to find the YouTube video
	return (
		document.querySelector('video') ||
		document.querySelector('ytd-player video') ||
		document.querySelector('#movie_player video')
	);
};

const showToast = (speed) => {
	// Remove existing toast if any
	const existingToast = document.querySelector('.video-speed-toast');
	if (existingToast) {
		existingToast.remove();
	}

	// Find the YouTube player container
	const playerContainer =
		document.querySelector('ytd-player') ||
		document.querySelector('#movie_player') ||
		document.body;

	const toast = document.createElement('div');
	toast.className = 'video-speed-toast';
	toast.textContent = `${speed}x`;
	toast.style.position = 'absolute';
	toast.style.top = '50%';
	toast.style.left = '50%';
	toast.style.transform = 'translate(-50%, -50%)';
	toast.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
	toast.style.color = 'white';
	toast.style.width = '80px';
	toast.style.height = '80px';
	toast.style.display = 'flex';
	toast.style.alignItems = 'center';
	toast.style.justifyContent = 'center';
	toast.style.borderRadius = '8px';
	toast.style.fontSize = '24px';
	toast.style.fontWeight = 'bold';
	toast.style.fontFamily = 'Arial, sans-serif';
	toast.style.zIndex = '10000';
	toast.style.pointerEvents = 'none'; // Allow clicks to pass through
	playerContainer.appendChild(toast);

	// Remove the toast after 1.5 seconds
	setTimeout(() => {
		toast.remove();
	}, 1500);
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	const video = getVideo();
	if (!video) {
		console.log('No video element found');
		sendResponse({ success: false, error: 'No video found' });
		return;
	}

	try {
		switch (request.action) {
			case 'speed_up':
				video.playbackRate = Math.min(video.playbackRate + 0.25, 5);
				showToast(video.playbackRate);
				break;
			case 'speed_down':
				video.playbackRate = Math.max(video.playbackRate - 0.25, 0.25);
				showToast(video.playbackRate);
				break;
			case 'reset_speed':
				video.playbackRate = 1;
				showToast(1);
				break;
			case 'set_speed_1_5x':
				video.playbackRate = 1.5;
				showToast(1.5);
				break;
		}
		sendResponse({ success: true, playbackRate: video.playbackRate });
	} catch (error) {
		console.error('Error controlling video speed:', error);
		sendResponse({ success: false, error: error.message });
	}
});

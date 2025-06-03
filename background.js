chrome.commands.onCommand.addListener((command) => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		if (tabs[0].id && tabs[0].url && tabs[0].url.includes('youtube.com')) {
			chrome.tabs.sendMessage(tabs[0].id, { action: command }, (response) => {
				if (chrome.runtime.lastError) {
					// Content script not ready or doesn't exist, ignore silently
					console.log(
						'Content script not available:',
						chrome.runtime.lastError.message
					);
				}
			});
		}
	});
});

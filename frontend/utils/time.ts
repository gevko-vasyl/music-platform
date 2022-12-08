export const convertSecToMinAndSec = (seconds: number) => {
	const minutes = Math.floor(seconds / 60);
	const extraSeconds = seconds % 60;
	const minutesStr = minutes > 10 ? minutes : "0" + minutes;
	const extraSecondsStr = extraSeconds > 10 ? extraSeconds : "0" + extraSeconds;
	return minutesStr + ":" + extraSecondsStr;
};

export function formatDate(timeBySeconds: number) {

  let time = new Date(timeBySeconds); 
	return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
}

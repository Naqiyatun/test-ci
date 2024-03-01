function updateTimer() {
    const future = Date.parse("jan 28, 2024 22:00:00");
    const now = new Date();
    const diff = future - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor(diff / (1000 * 60));
    const secs = Math.floor(diff / 1000);

    // d = days;
    const h = hours - days * 24;
    const m = mins - hours * 60;
    const s = secs - mins * 60;

    return [h, m, s]
}
const countdown = setInterval(updateTimer, 1000)
export default countdown;


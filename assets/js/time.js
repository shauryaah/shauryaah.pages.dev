function updateTime() {
    let now = new Date();
    let hours = now.getHours().toString().padStart(2, "0");
    let minutes = now.getMinutes().toString().padStart(2, "0");
    document.getElementById("time").textContent = `${hours}:${minutes}`;
}

// Update every minute
setInterval(updateTime, 60000);
updateTime(); // Initial call

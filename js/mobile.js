let sensor = new Accelerometer();
sensor.addEventListener('reading', function(e) {
    console.log(e.target);
    cursor.y += Math.round(e.target.y);
    cursor.x += Math.round(e.target.z);
});
sensor.start();
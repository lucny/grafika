let sensor = new Accelerometer();
sensor.addEventListener('reading', function(e) {
    console.log(e.target);
    cursor.y += Math.round(Math.sqrt(e.target.y));
    cursor.x += Math.round(Math.sqrt(e.target.x));
});
sensor.start();
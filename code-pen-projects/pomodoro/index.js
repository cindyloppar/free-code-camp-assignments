    <script>

        
        function startTimer() {
            var presentTime = document.getElementById("time").innerHTML;
            var timeArray = presentTime.split(/[:]+/);
            var min = timeArray[0];
            var second = checkSecond(timeArray[1] - 1);
            if (second == 59) {
                min--;

            }
            document.getElementById("time").innerHTML = min + ":" + second;
            var timer = setTimeout(startTimer, 1000);
            console.log(timer)
            stopCounting(timer, timeArray)


        }
        function checkSecond(sec) {
            if (sec < 10 && sec >= 0) {
                sec = "0" + sec;
            }
            if (sec < 0) {
                sec = "59";
            }
            return sec;
        }
        function stopButton(){
            var min = "0";
            var sec = "00";
            console.log("time has stopped");
            document.getElementById('time').innerHTML = min + ":" + sec;
            clearTimeout(startTimer);
        }
        function stopCounting(func, arr) {
            if (arr[0] === "0" && arr[1] === "00") {
                var min = "0";
                var sec = "00";
                console.log("time has stopped");
                document.getElementById('time').innerHTML = min + ":" + sec;
                clearTimeout(func);
            }
        }

        function decreaseMinutes() {
            var presentTime = document.getElementById("time").innerHTML;
            var arr = presentTime.split(":");
            var setMin = parseInt(arr[0]);
            setMin--;
            document.getElementById("time").innerHTML = setMin + ":" + "00";


        }
        function increaseMinutes() {
            var presentTime = document.getElementById("time").innerHTML;
            var arr = presentTime.split(":");
            var setMin = parseInt(arr[0]);
            setMin++;
            document.getElementById("time").innerHTML = setMin + ":" + "00";
        }

    </script>


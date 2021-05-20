window.onload = function() {
    class Quiz_Arr {
        constructor(id, firstA, secA) {
            this.id = id;
            this.firstA = firstA;
            this.secA = secA;
            // add Event
            document.getElementById(id).getElementsByClassName("startBtn")[0].addEventListener("click", function() {
                const obj = eval(this.parentElement.getAttribute("id"));
                obj.playQ();
            });
        }
        playQ() {
            const obj = this;
            
            const startBtn = document.getElementById(this.id).getElementsByClassName("startBtn")[0];
            
            const appSec = document.getElementById(this.id).getElementsByClassName("appSec")[0];
            
            const questSec = appSec.getElementsByClassName("questSec")[0];
            const question = questSec.getElementsByClassName("question")[0];
            const reply01 = questSec.getElementsByClassName("reply01")[0];
            const reply02 = questSec.getElementsByClassName("reply02")[0];
            const checkBtn = questSec.getElementsByClassName("checkBtn")[0];
            
            const resultSec = appSec.getElementsByClassName("resultSec")[0];
            const result = resultSec.getElementsByClassName("result")[0];
            const answer = resultSec.getElementsByClassName("answer")[0];
            const nextBtn = resultSec.getElementsByClassName("nextBtn")[0];
            
            const endSec = appSec.getElementsByClassName("endSec")[0];
            const endResult = endSec.getElementsByClassName("endResult")[0];
            const endBtn = endSec.getElementsByClassName("endBtn")[0];
            
            const numA = Array.from(Array(this.firstA.length).keys());
            function  setDisplay(appSecD, questSecD, resultSecD, endSecD) {
                const appSec = document.getElementById(obj.id).getElementsByClassName("appSec")[0];
                appSec.style.display = appSecD;
                appSec.getElementsByClassName("questSec")[0].style.display = questSecD;
                appSec.getElementsByClassName("resultSec")[0].style.display = resultSecD;
                appSec.getElementsByClassName("endSec")[0].style.display = endSecD;
            }
            function  startQ() {
                startBtn.style.display = "none";
                setDisplay("block", "block", "none", "none");
            }
            function makeQ() {
                setDisplay("block", "block", "none", "none");
                const n = Math.floor(Math.random() * (numA.length));
                reply01.value = "";
                reply02.value = "";
                question.innerHTML = obj.firstA[numA[n]];
                numA.splice(n, 1);
            }
            function checkF() {
                setDisplay("block", "none", "block", "none");
                const n = obj.firstA.indexOf(question.innerHTML);
                if (Number(reply01.value) === (n + 1) && reply02.value === obj.secA[n]) {
                    answer.style.display = "none";
                    result.innerHTML = "정답입니다!";
                } else {
                    answer.style.display = "block";
                    result.innerHTML = "오답입니다."
                    answer.innerHTML = "정답 : " + String(n + 1) + " , " + obj.secA[n];
                }
                if (numA.length !== 0) {
                    nextBtn.innerHTML = "다음 문제";
                } else {
                    nextBtn.innerHTML = "결과 보기";
                }
            }
            function nextQ() {
                if (numA.length !== 0) {
                    makeQ();
                } else {
                    showResultQ();                    
                }
            }
            function showResultQ() {
                setDisplay("block", "none", "none", "block");
                endResult.innerHTML = "문제가 끝났습니다.";
            }
            function endQ() {
                setDisplay("none", "none", "none", "none");
                startBtn.style.display = "block";
            }
            checkBtn.addEventListener("click", checkF);
            nextBtn.addEventListener("click", nextQ);
            endBtn.addEventListener("click", endQ);
            startQ();
            makeQ();
        }
    }

    const korE = ["수소", "헬륨", "리튬", "베릴륨"];
    const engE = ["H", "He", "Li", "Be"];
    const elementSymbol = new Quiz_Arr("elementSymbol", korE, engE);
}

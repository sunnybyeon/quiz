class Quiz {
    constructor(id, content) {
        this.id = id;
        if (Array.isArray(content)) {
            this.firstA = content[0];
            this.secA = content[1];
            this.askNum = true;
        } else if (typeof content === "object") {
            this.firstA = [];
            this.secA = [];
            this.askNum = false;
            for (const key in content) {
                this.firstA.push(key);
                this.secA.push(content[key]);
            }
        }
        // add Event
        document
            .getElementById(id)
            .getElementsByClassName("startBtn")[0]
            .addEventListener("click", function () {
                const obj = quizes[this.parentElement.getAttribute("id")];
                obj.playQ();
            });
    }
    playQ() {
        const obj = this;

        const startBtn = document
            .getElementById(this.id)
            .getElementsByClassName("startBtn")[0];

        const appSec = document
            .getElementById(this.id)
            .getElementsByClassName("appSec")[0];

        const questSec = appSec.getElementsByClassName("questSec")[0];
        const question = questSec.getElementsByClassName("question")[0];
        const reply01 = questSec.getElementsByClassName("reply01")[0];
        // reply02가 없는 경우에는 undefined
        const reply02 = questSec.getElementsByClassName("reply02")[0];
        const checkBtn = questSec.getElementsByClassName("checkBtn")[0];

        const resultSec = appSec.getElementsByClassName("resultSec")[0];
        const result = resultSec.getElementsByClassName("result")[0];
        const answer = resultSec.getElementsByClassName("answer")[0];
        const nextBtn = resultSec.getElementsByClassName("nextBtn")[0];

        const endSec = appSec.getElementsByClassName("endSec")[0];
        const endResult = endSec.getElementsByClassName("endResult")[0];
        const endBtn = endSec.getElementsByClassName("endBtn")[0];

        // 정답 개수 세는 변수
        let correct = 0;
        // 0부터 시작되는 숫자로 문제 배열 길이만큼 긴 배열 생성
        const numA = Array.from(Array(this.firstA.length).keys());

        function setDisplay(
            appSecD,
            questSecD,
            resultSecD,
            endSecD,
            otherQuizD
        ) {
            const appSec = document
                .getElementById(obj.id)
                .getElementsByClassName("appSec")[0];
            appSec.style.display = appSecD;
            appSec.getElementsByClassName("questSec")[0].style.display =
                questSecD;
            appSec.getElementsByClassName("resultSec")[0].style.display =
                resultSecD;
            appSec.getElementsByClassName("endSec")[0].style.display = endSecD;
            const allQuiz = Array.from(
                document.getElementsByTagName("body")[0].children
            );
            allQuiz.forEach((element) => {
                if (element.getAttribute("id") !== obj.id) {
                    element.style.display = otherQuizD;
                }
            });
        }

        function startQ() {
            startBtn.style.display = "none";
            setDisplay("block", "block", "none", "none", "none");
            makeQ();
        }

        function makeQ() {
            setDisplay("block", "block", "none", "none", "none");
            const n = Math.floor(Math.random() * numA.length);
            reply01.value = "";
            if (obj.askNum) {
                reply02.value = "";
            }
            question.innerHTML = obj.firstA[numA[n]];
            numA.splice(n, 1);
            reply01.focus();
        }

        function checkF() {
            setDisplay("block", "none", "flex", "none", "none");
            const n = obj.firstA.indexOf(question.innerHTML);
            if (obj.askNum) {
                if (
                    Number(reply01.value) === n + 1 &&
                    reply02.value === obj.secA[n]
                ) {
                    answer.style.display = "none";
                    result.innerHTML = "정답";
                    result.style.marginBottom = "0";
                    result.style.color = "#5d8530";
                    correct++;
                } else {
                    answer.style.display = "block";
                    result.innerHTML = "오답";
                    result.style.marginBottom = "0.2rem";
                    result.style.color = "#d42a2a";
                    answer.innerHTML = String(n + 1) + " , " + obj.secA[n];
                }
            } else {
                if (reply01.value === obj.secA[n]) {
                    answer.style.display = "none";
                    result.innerHTML = "정답";
                    result.style.marginBottom = "0";
                    result.style.color = "#5d8530";
                    correct++;
                } else {
                    answer.style.display = "block";
                    result.innerHTML = "오답";
                    result.style.marginBottom = "0.2rem";
                    result.style.color = "#d42a2a";
                    answer.innerHTML = obj.secA[n];
                }
            }
            if (numA.length !== 0) {
                nextBtn.innerHTML = "다음 문제";
            } else {
                nextBtn.innerHTML = "결과 보기";
            }
            nextBtn.focus();
        }

        function nextQ() {
            if (numA.length !== 0) {
                makeQ();
            } else {
                showResultQ();
            }
        }

        function showResultQ() {
            setDisplay("block", "none", "none", "flex", "none");
            endResult.innerHTML =
                String(correct) + "/" + String(obj.firstA.length);
            endBtn.focus();
        }

        function endQ() {
            setDisplay("none", "none", "none", "none", "block");
            startBtn.style.display = "block";
        }

        checkBtn.addEventListener("click", checkF);
        nextBtn.addEventListener("click", nextQ);
        endBtn.addEventListener("click", endQ);
        startQ();
    }
}

const quizes = {
    elementSymbol: new Quiz("elementSymbol", [data.korE, data.engE]),
    engKor: new Quiz("engKor", data.dic),
    chineseChar: new Quiz("chineseChar", data.chineseChar),
    earthlyBranches: new Quiz("earthlyBranches", data.earthlyBranches),
    classicalChinese: new Quiz("classicalChinese", data.classicalChinese),
};

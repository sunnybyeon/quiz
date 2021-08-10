window.onload = function() {
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

            function  setDisplay(appSecD, questSecD, resultSecD, endSecD, otherQuizD) {
                const appSec = document.getElementById(obj.id).getElementsByClassName("appSec")[0];
                appSec.style.display = appSecD;
                appSec.getElementsByClassName("questSec")[0].style.display = questSecD;
                appSec.getElementsByClassName("resultSec")[0].style.display = resultSecD;
                appSec.getElementsByClassName("endSec")[0].style.display = endSecD;
                const allQuiz = Array.from(document.getElementsByTagName("body")[0].children);
                allQuiz.forEach(element => {
                    if (element.getAttribute("id") !== obj.id) {
                        element.style.display = otherQuizD;
                    }
                })
            }

            function  startQ() {
                startBtn.style.display = "none";
                setDisplay("block", "block", "none", "none", "none");
                makeQ();
            }

            function makeQ() {
                setDisplay("block", "block", "none", "none", "none");
                const n = Math.floor(Math.random() * (numA.length));
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
                    if (Number(reply01.value) === (n + 1) && reply02.value === obj.secA[n]) {
                        answer.style.display = "none";
                        result.innerHTML = "정답";
                        result.style.marginBottom = "0";
                        result.style.color = "#5d8530";
                        correct++;
                    } else {
                        answer.style.display = "block";
                        result.innerHTML = "오답"
                        result.style.marginBottom = "0.2rem"
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
                        result.innerHTML = "오답"
                        result.style.marginBottom = "0.2rem"
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
                endResult.innerHTML = String(correct) + "/" + String(obj.firstA.length);
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

    const korE = [
        "수소", "헬륨", "리튬", "베릴륨", "붕소", "탄소", "질소", "산소", "플루오린", "네온", "소듐(나트륨)", "마그네슘", "알루미늄", "규소", "인", "황", "염소", "아르곤", "포타슘(칼륨)", "칼슘"
    ];
    const engE = [
        "H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar", "K", "Ca"
    ];
    const elementSymbol = new Quiz("elementSymbol", [korE, engE]);

    const dic = {
        "treat" : "대하다",
        "diagnose" : "진단하다",
        "possess" : "지니다",
        "conformity" : "순응",
        "associate" : "관련시켜 생각하다",
        "overwhelm" : "압도하다",
        "devote" : "헌신하다",
        "persistence" : "끈기",
        "intend" : "의도하다",
        "detain" : "억류하다",
        "relevant" : "관련된",
        "protable" : "휴대용의",
        "measure" : "재다",
        "hesitate" : "주저하다",
        "include" : "포함하다",
        "enhance" : "향상시키다",
        "academic" : "학업의",
        "partly" : "부분적으로",
        "effectively" : "효과적으로",
        "overcome" : "극복하다",
        "neglect" : "등한시하다",
        "embrace" : "받아들이다",
        "celebrated" : "유명한",
        "advise" : "조언하다",
        "inward" : "안쪽으로",
        "invalid" : "효력 없는",
        "stimulate" : "자극하다",
        "mathematical" : "수학적인",
        "still" : "가만히 있는",
        "adjust" : "적응하다",
        "preferred" : "선호되는",
        "contaminate" : "오염시키다",
        "control" : "통제 집단",
        "vessel" : "그릇, 용기",
        "mythological" : "신화적인",
        "retell" : "다시 말하다",
        "means" : "수단",
        "motivate" : "동기를 부여하다",
        "unify" : "단결하다",
        "moral" : "도덕적인",
        "modesty" : "겸손",
        "heroic" : "영웅적인",
        "institution" : "단체",
        "socialization" : "사회화",
        "reinforce" : "강화시키다",
        "unite" : "결속시키다",
        "gratification" : "만족감",
        "whirring" : "윙윙거리는",
        "enthusiasm" : "열정",
        "favorable" : "유리한",
        "agony" : "괴로움",
        "lable" : "꼬리표를 붙이다",
        "continuous" : "지속적인",
        "improbable" : "있을 것 같지 않은",
        "predominate" : "지배하다",
        "retail" : "소매",
        "neutral" : "중립적인",
        "haunted" : "유령이 나오는",
        "stain" : "얼룩",
        "arrange" : "준비하다",
        "strict" : "엄격한",
        "estimate" : "가늠하다",
        "collection" : "소장품",
        "practicality" : "실용성",
        "support" : "후원",
        "scheme" : "계획",
        "surge" : "(갑자기) 밀려듦",
        "scatter" : "뿌리다",
        "imperative" : "필수적인",
        "impulsive" : "충동적인",
        "intermediate" : "중간의",
        "astray" : "길을 잃고",
        "novelist" : "소설가",
        "harness" : "(동력원 등으로) 이용하다",
        "misbehave" : "버릇없이 행동하다",
        "boom" : "호황기",
        "core" : "핵심적인",
        "desirable" : "바람직한",
        "utilize" : "이용하다",
        "annual" : "연례의"
    }
    const engKor = new Quiz("engKor", dic);
}

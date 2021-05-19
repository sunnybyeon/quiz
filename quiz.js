window.onload = function() {
    class Quiz_Arr {
        constructor(id, firstA, secA) {
            this.id = id;
            this.firstA = firstA;
            this.secA = secA;
            // add Event
            document.getElementById(id).getElementsByClassName("startBtn")[0].addEventListener("click", function() {
                const constructor = eval(this.parentElement.getAttribute("id"));
                constructor.startQ();
                constructor.playQ();
            });
        }
        startQ() {
            const startBtn = document.getElementById(this.id).getElementsByClassName("startBtn")[0];
            const questArt = document.getElementById(this.id).getElementsByClassName("questArt")[0];
            startBtn.style.display = "none";
            questArt.style.display = "block";
        }
        playQ() {
            const constructor = this;
            const question = document.getElementById(this.id).getElementsByClassName("questArt")[0].getElementsByClassName("question")[0];
            const reply_n = document.getElementById(this.id).getElementsByClassName("questArt")[0].getElementsByClassName("reply_n")[0];
            const reply_s = document.getElementById(this.id).getElementsByClassName("questArt")[0].getElementsByClassName("reply_s")[0];
            const check = document.getElementById(this.id).getElementsByClassName("questArt")[0].getElementsByClassName("check")[0];
            const answer = document.getElementById(this.id).getElementsByClassName("questArt")[0].getElementsByClassName("answer")[0];
            const numA = Array.from(Array(this.firstA.length).keys());
            function makeQ() {
                const n = Math.floor(Math.random() * (numA.length));
                reply_n.value = "";
                reply_s.value = "";
                question.innerHTML = constructor.firstA[numA[n]];
                numA.splice(n, 1);
            }
            function checkF() {
                const n = constructor.firstA.indexOf(question.innerHTML);
                if (Number(reply_n.value) === (n + 1) && reply_s.value === constructor.secA[n]) {
                    alert("정답입니다!");
                } else {
                    alert("오답입니다!");
                }
                if (numA.length !== 0) {
                    makeQ();
                } else {
                    document.getElementById(constructor.id).getElementsByClassName("questArt")[0].style.display = "none";
                }
            }
            check.addEventListener("click", checkF);
            makeQ();
        }
    }

    const korE = ["수소", "헬륨", "리튬", "베릴륨", "붕소", "탄소", "질소", "산소"];
    const engE = ["H", "He", "Li", "Be", "B", "C", "N", "O"];
    const elementSymbol = new Quiz_Arr("elementSymbol", korE, engE);
}


let juris = [];
let participants = [];
let corectusers = [];
let cnt = true;
let arrRender = [];
let numberct = 0;
let winers = [];


for (let i = 1; ; i++) {
    if (localStorage.getItem(`Participant-${i}-name`) != null) {
        let name = localStorage.getItem(`Participant-${i}-name`);
        participants.push(name.replace(':'));
    }
    else {
        break;
    }

}

for (let i = 1; ; i++) {
    if (localStorage.getItem(`Judge-${i}-name`) != null) {
        juris.push(localStorage.getItem(`Judge-${i}-name`))
    }
    else {
        break;
    }

}

function startTournament() {
    let counter = 0;
    let users = [];

    participants.map((elem) => {
        elem = new user(elem, ++counter, givemark(juris));
        users.push(elem);
    })

    let usersnames = [];
    users.map(elem => {
        usersnames.push(elem.name)
        if (cnt) {
            usersnames.sort(uaSort);
        }

    })


    function i() {

        let arrmarks = [];
        users.map((elem) => {
            arrmarks.push(elem.markSum);
        })
        arrmarks.sort((a, b) => {
            return b - a;
        });
        first: for (let i = 0; i < users.length; i++) {
            for (let count = 0; count < arrmarks.length; count++) {
                if (users[i].markSum == arrmarks[count]) {

                    corectusers[count] = users[i];
                    arrmarks[count] = 0;
                    continue first;

                }
            }
        }
        arrmarks = []
    }

    i();
}


class user {
    constructor(name, id, mark) {
        this.name = name;
        this.id = id;
        this.mark = mark;
        this.markSum = this.marckssum();
    }
    marckssum() {
        let marks = [];

        this.mark.map(elem => {
            marks.push(elem.marks);
        });
        let o = 0;
        return Math.round(marks.reduce((sum, current) => sum + current, 0));
    }
    createuser() {

    }
}

class Juri {
    constructor(name) {
        this.name = name;
    }
    givemark() {
        let rand = Math.floor(Math.random() * 10);
        rand = (rand != 0) ? rand : 1
        return rand;
    }
}

function givemark(juri) {
    let marks = [];
    juri.map(elem => {

        let elem1 = new Juri(elem.slice(0, elem.indexOf(':')), elem.slice(elem.indexOf(':')));
        marks.push({
            name: elem1.name,
            marks: elem1.givemark(),
        });
    })
    return marks
}


function uaSort(s1, s2) {
    return s1.localeCompare(s2);
}


function renderuser() {
    var arrRender = [
        `<tr><th></th><th>Name</th><th>${juris[0]}</th><th>${juris[1]}</th><th>${juris[2]}</th></tr>`
    ];

    let count = 1;

    arrRender.push(
        ...corectusers.map(elem => {
            return `<tr>
        <td>${count++}</td>
        <td>${elem.name}</td>
        ${elem.mark.map(elem1 => {
                return `<td>${elem1.marks}</td>`;
            }).join('')}
      </tr>`;
        })
    );

    return arrRender.join('');
}

function renderTour() {
    startTournament();
    let table = document.querySelector('tbody');

    if (table != undefined) {
        table.innerHTML = '';
        table.innerHTML = renderuser();
    }

    participants = [];
    arrRender = [];


    console.log(corectusers);
    for (let i = 0; i < corectusers.length / 2; i++) {
        participants[i] = corectusers[i].name;
        winers[i] = corectusers[i];
    }

    corectusers = [];

}



renderTour();

let btn = document.querySelectorAll('.start-btn');



console.log(participants)
if (btn != undefined) {
    for (let i = 0; i < btn.length; i++) {
        btn[i].addEventListener('click', () => {
            console.log(participants.length >= 10);
            if (participants.length > 10) {
                numberct++;

                cnt = false;
                renderTour();


            }
            else {
                localStorage.clear()
                for (let i = 1; i < 4; i++) {

                    localStorage.setItem(`Winner_${i}`, `${participants[i - 1]}: ${winers[i].markSum}`);



                }
                for (let i = 0; i < btn.length; i++) {
                    btn[i].innerHTML = 'finall';
                    btn[i].addEventListener('click', () => {
                        btn[i].href = '../pages/finalPage.html';
                    })
                }
                renderTour();
            }
        })


    }
}


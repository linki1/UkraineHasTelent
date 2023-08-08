const trParticipants = document.querySelector('.participants-table tr:first-child');
const tbodyParticipants = document.querySelector('.participants-table tbody');
let i = 1;

const keys = Object.keys(localStorage);

keys.forEach(key => {
    if (key.startsWith("Judge")) {
        const value = localStorage.getItem(key);
        let newTh = document.createElement('th');

        newTh.innerHTML = `${value}`;
        trParticipants.appendChild(newTh);
    }

    if (key.startsWith("Participant")) {
        const value = localStorage.getItem(key);
        let newTh = document.createElement('tr');

        newTh.innerHTML = `
            <td data-cell="number">${i}</td>
            <td data-cell="name">${value}</td>
        `;
        tbodyParticipants.appendChild(newTh);
        i++;
    }
});



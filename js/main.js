localStorage.clear();
const openButtons = document.querySelectorAll("#modal-open");
console.log(openButtons);
const modal = document.getElementById(`modal-dialog`);

openButtons.forEach(openButton => {
  openButton.addEventListener('click', () => {
    modal.showModal();
    modal.style.opacity = '1';
  });
});

const createBtn = document.querySelector('.create-btn');
const participants = document.getElementById('participants');
const handwrite = document.getElementById('handwrite');

createBtn.addEventListener('click', () => {
  localStorage.setItem("All_Participants", participants.value);
});
createBtn.addEventListener('click', () => {
  localStorage.setItem("handwrite_participants", handwrite.checked);
});
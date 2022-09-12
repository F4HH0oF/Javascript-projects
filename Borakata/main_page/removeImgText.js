const div = document.getElementById('box');
const removeBtn = document.getElementById('remove');

removeBtn.addEventListener('click', ()=> {
    div.classList.remove('removable');
})
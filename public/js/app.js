
const weatherform =document.querySelector('form');
const search =document.querySelector('input');
const messagrOne =document.querySelector('#message-1');
const messagrTwo =document.querySelector('#message-2');
messagrOne.textContent='From javascript';
weatherform.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location =search.value;
    messagrOne.textContent='Lodding...';
        messagrTwo.textContent='';
fetch('/weather?address='+location).then((responce)=>{
    responce.json().then((data)=>{

        if(data.error){
        messagrOne.textContent='Error: '+ data.error;
        messagrTwo.textContent='';
        }
        else{
            messagrOne.textContent='Location: '+ data.Location;
            messagrTwo.textContent='Location: '+ data.Forecast;
        }
    })
});
})
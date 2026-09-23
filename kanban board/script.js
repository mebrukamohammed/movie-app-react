const cards=document.querySelectorAll(".card");
const lists=document.querySelectorAll(".list");
for( const card of cards){
    card.addEventListener("dragstart" ,dragStart);
    card.addEventListener("dragend", dragEnd);

}
for(const list of lists){
list.addEventListener("dragover",dragOver);
list.addEventListener("dragenter" ,dragEnter);
list.addEventListener("dragleave",dragLeave);
list.addEventListener("drop",dragDrop);
}
function dragStart(e){
    e.dataTransfer.setData("text/plain",this.id);

}
function dragEnd(e){
    console.log("dragend");
}
 function dragOver(e){
    e.preventDefault();
 }
 function dragEnter(e){
    e.preventDefault();
    this.classList.add("over");
 }

 function dragLeave(e){
   this.classList.remove("over")
 }
 function dragDrop(e){
   const id=e.dataTransfer.getData("text/plain");
   const card=document.getElementById(id);

   this.appendChild(card);
   this.classList.remove("over");
 }
 const addBtn=document.querySelectorAll(".add-btn");
 addBtn.forEach(btn=>{
     btn.addEventListener("click" ,(e)=>{
    
    const clickedList=e.currentTarget.parentElement;
    console.log(clickedList);
        const newCard=document.createElement("div");
        newCard.classList.add("card");
        newCard.draggable=true;
        newCard.id="card-"+Date.now();
        const input=document.createElement("input");
     
        if (clickedList.id === "list1") {
            input.placeholder = "What to do?";
        }
        else if (clickedList.id === "list2") {
            input.placeholder = "What is being done?";
        }
        else if (clickedList.id === "list3") {
            input.placeholder = "Accomplished";
        }
        newCard.appendChild(input);
        clickedList.insertBefore(newCard, e.currentTarget);
        
        
      newCard.addEventListener("dragstart" ,dragStart);
    newCard.addEventListener("dragend", dragEnd);
  

    
 })
 

});

 
    
import { async } from "regenerator-runtime";

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteBtns = document.querySelectorAll(".fa-trash-alt");

const addComment = (text, id) => {
    const videoComments = document.querySelector(".video__comments ul");
    const newComment = document.createElement("li");
    newComment.dataset.id = id;
    newComment.className = "video__comment";
    const icon = document.createElement("i");
    icon.className = "fas fa-comment";
    const span = document.createElement("span");
    span.innerText = ` ${text}`;
    const span2 = document.createElement("span");
    span2.className = "far fa-trash-alt";
    newComment.appendChild(icon);
    newComment.appendChild(span);
    newComment.appendChild(span2);
    videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
    event.preventDefault();
    const textarea = form.querySelector("textarea");
    const text = textarea.value;
    const videoId = videoContainer.dataset.id;
    if(text === ""){
        return;
    }
    const response = await fetch(`/api/videos/${videoId}/comment`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify({text}),
    });
    if(response.status === 201) {
        textarea.value = ""; 
        const {newCommentId} = await response.json();
        addComment(text, newCommentId);
    }
};

const handleDelete = async(event)=>{
    const{
        target:{parentElement:deleteComment}
    }=event;
    const{
        dataset:{id},
    }=deleteComment;

    deleteComment.remove();

    await fetch(`/api/comment/${id}/delete`,{
        method:"DELETE",
    });
};

deleteBtns.forEach((btn)=>{
    btn.addEventListener("click",handleDelete);
});

if(form){
    form.addEventListener("submit",handleSubmit);
}
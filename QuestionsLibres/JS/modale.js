function showModal(message) {
    var modal = document.getElementById("modal");
    var span = document.getElementsByClassName("close-button")[0];
    var modalText = document.getElementById("modal-text");
    modalText.innerHTML = message;
    modal.style.display = "block";
  
    span.onclick = function() {
      modal.style.display = "none";
    }
  
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }
  
  // Ensuite, remplacez les alert("Incorrect... dans votre fonction buttonElt.addEventListener par showModal("Incorrect...
  
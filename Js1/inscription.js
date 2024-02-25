document.addEventListener('DOMContentLoaded', function() {
    // Cache le modal initialement
    const modal = document.getElementById('subscribeModal');
    modal.style.visibility = 'hidden';
    modal.style.opacity = '0';
    
    const loginModal = document.getElementById('loginModal');
    
    // Fonction pour afficher le modal
    function showModal() {
      modal.style.visibility = 'visible';
      modal.style.opacity = '1';
    }
    
    // Fonction pour cacher le modal
    function hideModal() {
      modal.style.visibility = 'hidden';
      modal.style.opacity = '0';
    }
  
    // Fonction pour afficher la modale de connexion
    function showLoginModal() {
      loginModal.style.visibility = 'visible';
      loginModal.style.opacity = '1';
    }
  
    // Fonction pour cacher la modale de connexion
    function hideLoginModal() {
      loginModal.style.visibility = 'hidden';
      loginModal.style.opacity = '0';
    }
    
    // Définit un délai de 4 secondes pour afficher le modal
    setTimeout(showModal, 4000);
    
    // Ajoute un gestionnaire d'événements pour le bouton "Non merci"
    const declineButton = document.getElementById('declineButton');
    declineButton.addEventListener('click', hideModal);
  
    // Ajoute un gestionnaire d'événements pour le bouton "Connectez-vous"
    const loginButton = document.getElementById('loginButton');
    loginButton.addEventListener('click', function() {
      hideModal();
      showLoginModal();
    });
  
    // Ajoute un gestionnaire d'événements pour le bouton de fermeture de la modale de connexion
    const closeLoginModalButton = document.getElementById('closeLoginModal');
    closeLoginModalButton.addEventListener('click', hideLoginModal);
  });
  

  document.addEventListener('DOMContentLoaded', function() {
    // Cache le modal initialement
    const modal = document.getElementById('subscribeModal');
    modal.style.visibility = 'hidden';
    modal.style.opacity = '0';
  
    // Fonction pour afficher le modal
    function showModal() {
      modal.style.visibility = 'visible';
      modal.style.opacity = '1';
    }
  
    // Fonction pour cacher le modal
    function hideModal() {
      modal.style.visibility = 'hidden';
      modal.style.opacity = '0';
    }
  
    // Définit un délai de 4 secondes pour afficher le modal
    setTimeout(showModal, 2000);
  
    // Ajoute un gestionnaire d'événements pour le bouton "Non merci"
    const declineButton = document.getElementById('declineButton');
    declineButton.addEventListener('click', hideModal);
  }); 
// Fonction récursive pour générer les palindromes
function generatePalindromesHelper(currPalindrome) {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Lettres disponibles
    const results = [];
  
    // Vérifier si la longueur du palindrome est atteinte
    if (currPalindrome.length === numLetters) {
      postMessage({ type: 'result', result: currPalindrome });
      return;
    }
  
    // Ajouter chaque lettre possible au palindrome
    for (let i = 0; i < letters.length; i++) {
      const nextPalindrome = currPalindrome + letters[i];
      let valid = true;
  
      // Vérifier si la contrainte est respectée
      for (let j = 0; j < nextPalindrome.length - 2; j++) {
        if (nextPalindrome[j] === nextPalindrome[j + 1] && nextPalindrome[j] === nextPalindrome[j + 2]) {
          valid = false;
          break;
        }
      }
  
      if (valid) {
        generatePalindromesHelper(nextPalindrome);
      }
    }
  
    postMessage({ type: 'complete' });
  }
  
  // Écouter les messages envoyés par le script principal
  onmessage = (event) => {
    if (event.data.numLetters) {
      generatePalindromesHelper('');
    }
  };
  
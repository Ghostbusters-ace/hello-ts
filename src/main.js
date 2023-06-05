/**
 * main.ts
 * @author Aélion <jean-luc.aubert@aelion.fr>
 * @version 1.0.0
 *
 * Entry point of our frontend application
 */
var myName;
myName = 'Jean-Luc';
var myLastName = 'Aubert';
var myArray = ['Aubert', 'Casper', 'Tartempion'];
myArray.push('Talut');
console.table(myArray);
console.log(myName);
/**
 * Récupère dans le DOM (Document Object Model) le premier Objet (élément HTML)
 * qui dispose d'un attribut "app"
 */
var app = document.querySelector('[app]');
app.innerHTML = myName;

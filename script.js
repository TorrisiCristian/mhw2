const risposte_finali= {}; //questo è dove salvo tutte le scelte

function reset() {

    for(const risposta_finale in risposte_finali){
        delete risposte_finali[risposta_finale];
    }

    const final = document.querySelector("#final-score");
    final.classList.add('hidden');

    for(const box of boxes){
        box.addEventListener('click', choice);
        box.classList.remove('deselected');
        box.querySelector('.checkbox').src = "./images/unchecked.png";
        box.classList.remove('selezione');
    }
}




function aggiungRisposta(image) {

    risposte_finali[image.dataset.questionId] = image.dataset.choiceId;

    if (risposte_finali.one && risposte_finali.two && risposte_finali.three) { //verfica
        for (const box of boxes) {
            box.removeEventListener('click',choice);
        }

        const personalita = risposte_finali.one;
        if(risposte_finali.one === risposte_finali.two || risposte_finali.one === risposte_finali.three)
        personalita.risposte_finali = risposte_finali.one;
        if(risposte_finali.two === risposte_finali.one || risposte_finali.two === risposte_finali.three)
        personalita.risposte_finali = risposte_finali.two;
        if(risposte_finali.three === risposte_finali.one || risposte_finali.three === risposte_finali.two)
        personalita.risposte_finali = risposte_finali.three;



        const show_score = document.querySelector('#final-score');

        show_score.querySelector('h1').textContent = RESULTS_MAP[personalita].title;
        show_score.querySelector('p').textContent = RESULTS_MAP[personalita].contents;
        show_score.classList.remove('hidden');

        const reset_button = document.querySelector('#button');
        reset_button.addEventListener('click', reset);
    }
}



function choice(event) {

    const image = event.currentTarget; //scelta corrente

    image.classList.add('selezione');
    image.classList.remove('deselected');
    image.querySelector('.checkbox').src = "images/checked.png";
    
    
    const selectedImage = image.dataset.choiceId;
    const risposte = image.parentNode.querySelectorAll('div');



    for (const non_risposta of risposte) {
        if (non_risposta.dataset.choiceId !== selectedImage) {
            non_risposta.classList.add('deselected');
            non_risposta.querySelector('.checkbox').src = 'images/unchecked.png';
            non_risposta.classList.remove('selezione');
        }
    }
    
    aggiungRisposta(image); 
}


const boxes = document.querySelectorAll('.choice-grid div');
for (const box of boxes) {
    box.addEventListener('click',choice);
}
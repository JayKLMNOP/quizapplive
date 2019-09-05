let currentQuestionIndex = 0;
let userCorrectAnswers = 0;


function startQuiz(){

    console.log("startQuiz() ran");

    $('.qa-start-page').hide();

    $('.qa-result-page').hide();

    $('.qa-feedback-page').hide();

    const firstQuestion = getQuestionHTML(currentQuestion());

    renderQuestion(firstQuestion);
}

function renderQuestion(question) {
    $('#qa-question-area').html(question);
    showQuestionCount();
    $('.qa-quiz-box').fadeIn("slow");
}


function showQuestionCount(){
    
    $(".qa-progress-page .qa-question-count").text(`Question  ${currentQuestionIndex + 1} of ${questions.length}`);
    
}

function currentQuestion() {
    return questions[currentQuestionIndex];
}

// function handleSubmitAnswer() {
//         event.preventDefault();
//         console.log("handleSubmitAnser() ran");
//         let selectedOption = $('input[type=radio]:checked').val();
//         if(selectedOption === undefined){
//             alert("you have not chosen an option");            
//         } else {
//             $('input[type=radio]:checked').attr('checked', false);
//             checkAnswer(event);
//         }
// }

function checkAnswer(event){
    event.preventDefault();
    console.log("checkAnswer() ran");
    const currentAnswer = $('.qa-quiz-questions input:checked').val();
    const correctAnswer = currentQuestion().correctAnswer;
        const isCorrect = currentAnswer === correctAnswer;
    userCorrectAnswers = userCorrectAnswers + isCorrect;
    console.log(currentAnswer, correctAnswer, isCorrect);
    renderFeedback(isCorrect);
}


function renderFeedback(isCorrect) {
    $('.qa-quiz-box').hide();
    $('.qa-feedback-page').show();
    const question = currentQuestion();
    let userFeedback;
    if (isCorrect) {
        userFeedback = `Congrats you did it!`;
    } else {
        userFeedback = `Sorry you got it wrong. The correct answer is ${question.correctAnswer}.`;
    }
    const html = `
    <div class="qa-feedback">
    <img src="${question.imageURL}" class="qa-question-img"/>
        <section class="qa-feedback-section">
            ${userFeedback}
                <div>
                    ${question.feedback}                
                </div>
        </section>
    </div>
    `;
    
    $('#qa-feedback-content-area').html(html);   
    
}

function goToNextQuestion(event) {
    console.log('next question');
    event.preventDefault();
    currentQuestionIndex = currentQuestionIndex + 1;
    console.log(currentQuestionIndex);
    console.log(currentQuestionIndex === questions.length);
    if (currentQuestionIndex === questions.length) {
        renderResultPage();
    } else {
        const newQuestion = getQuestionHTML(currentQuestion());
        renderQuestion(newQuestion);
        $('.qa-feedback-page').hide();
        $('.qa-quiz-box').fadeIn("slow");
    }
}

function renderResultPage(){
    $('.qa-feedback-page').hide();
    $('.header').hide();   
    $('.qa-quiz-box').hide();
    $('.qa-result-page').show(); 
    const html = `
    <div class=qa-result-page>
    <p>Good job you finished, now here are your results...</p>
    <img src="http://clipart-library.com/img/1835335.jpg" class="qa-happy-food"/>
    <div>${userCorrectAnswers} / ${questions.length}</div>
    <button class="qa-js-restart-btn">Restart</button>
    </div>`
    $('.qa-result-page').html(html);
    $('.qa-result-page .qa-js-restart-btn').on('click', function(event){
        event.preventDefault();
        console.log("test");
        currentQuestionIndex = 0;
        userCorrectAnswers = 0;
        init();
    })
}

function getQuestionHTML(question){
    
    const html=
    `<div class="qa-question-container">
    <img src="${question.imageURL}" class="qa-question-img"/>
    </div>
    
    <ul class="qa-quiz-questions">
    
    <li>
    <input type="radio" required id="answerOptionOne" name="answerOption" value="${question.optionOne}"> 
    <label for="answerOptionOne">${question.optionOne}</label>
    </li>
    
    <li>
    <input type="radio" required id="answerOptionTwo" name="answerOption" value="${question.optionTwo}"> 
    <label for="answerOptionTwo">${question.optionTwo}</label>
    </li>
    
    <li>
    <input type="radio" required id="answerOptionThree" name="answerOption" value="${question.optionThree}"> 
    <label for="answerOptionThree">${question.optionThree}</label>
    </li>
    
    <li>
    <input type="radio" required id="answerOptionFour" name="answerOption" value="${question.optionFour}"> 
    <label for="answerOptionFour">${question.optionFour}</label>
    </li>
    
    </ul>`;
    
    return html;
};

const questions = [
    {
        
        imageURL: "https://thewoksoflife.com/wp-content/uploads/2017/02/pad-see-ew-11.jpg",        
        optionOne: "Pad Thai",
        optionTwo: "Chowmein",
        optionThree: "Jjapchae",
        optionFour: "Phat Si-io",
        correctAnswer: "Phat Si-io",
        feedback: `Phat si-io (also transliterated as pad see ew, pad siew, or pad siu) is a Chinese-influenced stir fried noodle dish that is commonly eaten in Thailand. It is also quite popular in Thai restaurants around the world.
        The name of the dish translates to fried (with) soy sauce and it is very similar to the char kway teow of Singapore and Malaysia. Phat si-io is normally stir fried dry while another similar dish, rat na (in Thai) or lard na (in Laos), is served in a thickened sauce and generally has a lighter taste.
        Phat si-io is made with dark soy sauce (si-io dam), light soy sauce (si-io khao), garlic, broad rice noodles called kuaitiao sen yai in Thai (commonly abbreviated to just sen yai meaning "big strip"), Chinese broccoli, egg, and some form of thinly sliced meat — commonly pork, chicken or beef — or shrimp or mixed seafood.
        Pad See'ew is sometimes also called kuaitiao phat si-io, which reflects the general practice of using fresh flat rice noodle as the main ingredient. However, other types of noodles may also be used.`,
        
    },
    {
        
        imageURL: "https://www.chinasichuanfood.com/wp-content/uploads/2014/09/xiao-long-bao-25-500x500.jpg",    
        optionOne: "Xiao Long Bao",
        optionTwo: "Bao Beef Bun",
        optionThree: "Hotteok",
        optionFour: "Dumplings",
        correctAnswer: "Xiao Long Bao",
        feedback: `Xiaolongbao is a type of Chinese steamed bun (baozi) from the Jiangnan region, especially associated with Shanghai and Wuxi. In Shanghainese, they are known as siaulon moedeu or xiaolong-style mantous as Wu Chinese speaking peoples use the traditional definition of "mantou" which refers to both filled and unfilled buns. It is traditionally prepared in Xiaolong, which is a kind of small bamboo steaming basket, which give them their name. Xiaolongbao is often referred to as a kind of "dumpling", but should not be confused with British or American-style dumplings, nor with Chinese jiaozi.
        They are also called a "soup dumpling" because they are filled with hot soup and must be eaten carefully.`
    },
    {
        
        imageURL: "https://www.maangchi.com/wp-content/uploads/2008/11/jjamppong-youtube.jpg",    
        optionOne: "Braised Beef Noodle Soup",
        optionTwo: "Jjangppong",
        optionThree: "Spicy Ramen",
        optionFour: "Pho",
        correctAnswer: "Jjangppong",
        feedback: `Jjamppong  is a Korean noodle soup common ingredients include onions, garlic, Korean zucchini, carrots, cabbages, squid, mussels, and pork.Although the dish itself derived from Shandong-style chǎomǎmiàn (炒码面), the dish name derived from chanpon, a Japanese Chinese dish derived from Fujian-style mènmiàn (焖面). During the Japanese occupation (1910–1945), the Japanese saw chǎomǎmiàn in Chinese restaurants in Korea and named it chanpon, as the white soup seemed similar to the soup of chanpon to their eyes. The Japanese word was adapted phonetically into Korean as jjamppong. Addition of gochugaru (chili powder) and chili oil to jjamppong began in the 1960s.`
    },
    {
        
        imageURL: "https://assets.epicurious.com/photos/579fa13520ada1484ddf303c/master/pass/fillet-of-beef-wellington.jpg",    
        optionOne: "Meatpie",
        optionTwo: "Shepherds Pie",
        optionThree: "Beef Wellington",
        optionFour: "Steak",
        correctAnswer: "Beef Wellington",
        feedback: `Beef Wellington is a preparation of fillet steak coated with pâté (often pâté de foie gras) and duxelles, which is then wrapped in parma ham, puff pastry and baked. Some recipes include wrapping the coated meat in a crêpe to retain the moisture and prevent it from making the pastry soggy.
        A whole tenderloin may be wrapped and baked, and then sliced for serving, or the tenderloin may be sliced into individual portions prior to wrapping and baking.The origin of the name is unclear, with no definite connection to Arthur Wellesley, 1st Duke of Wellington. Leah Hyslop, writing in The Daily Telegraph, observes that by the time Wellington became famous, meat baked in pastry was a well-established part of English cuisine. There is a mention of "fillet of beef, a la Wellington" in the Los Angeles Times of 1903, and an 1899 reference in a menu from the Hamburg-America line. It may be related to 'steig' or steak Wellington, an Irish dish (the Duke was Irish in origin), but the dates for this are unclear. An installment of a serialized story entitled "Custom Built" by Sidney Herschel Small in 1930 had two of its characters in a restaurant in Los Angeles that had "beef Wellington" on its menu. The first occurrence of the dish recorded in the Oxford English Dictionary is a quotation from a 1939 New York food guide with "Tenderloin of Beef Wellington" which is cooked, left to cool and rolled in a pie crust.`
    },
    {
        
        imageURL: "https://www.traegergrills.com/images/en-us/Shared/images/recipes/banners/Beef/Traeger-BBQ-Brisket_Traeger-Wood-Fired-Grills_RE_HE_M.jpg",    
        optionOne: "Skirt Steaks",
        optionTwo: "Lamb",
        optionThree: "Brisket",
        optionFour: "Flank Steak",
        correctAnswer: "Brisket",
        feedback: `Brisket is a cut of meat from the breast or lower chest of beef or veal. The beef brisket is one of the nine beef primal cuts, though the precise definition of the cut differs internationally. The brisket muscles include the superficial and deep pectorals. As cattle do not have collar bones, these muscles support about 60% of the body weight of standing or moving cattle. This requires a significant amount of connective tissue, so the resulting meat must be cooked correctly to tenderize the connective tissue.
        According to the Random House Dictionary of the English Language, Second Edition, the term derives from the Middle English brusket which comes from the earlier Old Norse brjósk, meaning cartilage. The cut overlies the sternum, ribs, and connecting costal cartilages.`
    }
]; 
function init(){
    $('.qa-result-page').hide();
    $('.qa-quiz-box').hide();
    $('.qa-feedback-page').hide();
    $('.qa-start-page').show();
    $('.qa-js-start-btn').on('click', startQuiz);
    $('#qa-quiz-app-form').on('submit', checkAnswer);
    $('.qa-feedback-page .qa-js-next-btn').on('click', goToNextQuestion);
    }
$(init());
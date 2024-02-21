const arrOfQuestions = ['monkey', 'baloon', 'miracle', 'balance', 'cat', 'summer', 'wine', 'pizza'];

addEventListener("load", showCards);

//функция, которая рандомно выбирает слово из массива
function randWord(){
    const index = Math.floor(Math.random()*arrOfQuestions.length);
    console.log(index);
    return arrOfQuestions[index];
}

//функция, которая выводит слово на экран (буквы прозрачные)
function showCards(){
    const word = randWord();
    let arrOfLetters = word.split('');
 
    //получаем доступ к div, в который будем выводить слово
    const field = document.querySelector('#answer');
    for(i=0; i<arrOfLetters.length; i++){
        let newSpan = document.createElement('span');
        newSpan.textContent=arrOfLetters[i];
        newSpan.style.color = 'transparent';
        field.appendChild(newSpan);
    }
    return arrOfLetters;
}



// Находим элемент canvas по id
var canvas = document.querySelector('canvas');
// Получаем контекст для рисования
var ctx = canvas.getContext("2d");
// Задаем ширину и высоту холста
canvas.width = 400;
canvas.height = 400;
// Задаем цвет и толщину линий
ctx.strokeStyle = "black";
ctx.lineWidth = 4;

// Функция для рисования виселицы
function drawGallows(part) {

    switch (part){
// Рисуем основание
case "base":
    ctx.beginPath();
    ctx.moveTo(50, 350);
    ctx.lineTo(350, 350);
    ctx.stroke();
    break;
    
// Рисуем столб
case "pillar":
    ctx.beginPath();
    ctx.moveTo(100, 350);
    ctx.lineTo(100, 50);
    ctx.stroke();
    break;
// Рисуем перекладину
case "crossbar":
    ctx.beginPath();
    ctx.moveTo(100, 50);
    ctx.lineTo(250, 50);
    ctx.stroke();
    break;
// Рисуем веревку
case "rope":
    ctx.beginPath();
    ctx.moveTo(250, 50);
    ctx.lineTo(250, 100);
    ctx.stroke();
    break;
case "head":
// Рисуем голову
    ctx.beginPath();
    ctx.arc(250, 125, 25, 0, Math.PI * 2);
    ctx.stroke();
    break;
case "body":
// Рисуем тело
    ctx.beginPath();
    ctx.moveTo(250, 150);
    ctx.lineTo(250, 250);
    ctx.stroke();
    break;
case "leftArm":
// Рисуем левую руку
    ctx.beginPath();
    ctx.moveTo(250, 175);
    ctx.lineTo(200, 200);
    ctx.stroke();
    break;
case "rightArm":
// Рисуем правую руку
    ctx.beginPath();
    ctx.moveTo(250, 175);
    ctx.lineTo(300, 200);
    ctx.stroke();
    break;
case "leftLeg":
// Рисуем левую ногу
    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.lineTo(200, 300);
    ctx.stroke();
    break;
case "rightLeg":
// Рисуем правую ногу
    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.lineTo(300, 300);
    ctx.stroke();
}
}


//массив названий частей виселицы для вызова функции
const arrOfDrawParts = ["base", "pillar", "crossbar", "rope","head", "body", "leftArm", "rightArm", "leftLeg", "rightLeg"];
//ставим счестчик -1, чтобы при первой ошибке индекс стал 0 и был выбран 0-ой элемент массива arrOfDrawParts
let count = -1;

//добавялем слушатель событий на кнопку TRY
document.querySelector('button').addEventListener("click", attempt);

//добавляем слушатель событий на Enter
document.addEventListener( 'keyup', event => {
    if( event.code === 'Enter' ) attempt();
  });


//создаем массив попыток, чтобы хранить использованные буквы
const arrOfAttempts = [];

function attempt(){
    //полчаем доступ к полю ввода
    const input = document.querySelector('#guess>input');
    //получаем значение поля ввода
    let val = input.value.toLowerCase();
    //проверяем, чтобы были введены именно буквы
    if(!/[a-z]/g.test(val)){
        alert("Enter any letter!");
        return;
    };

    //добавляем все спаны с буквами в массив
    let spans = document.querySelectorAll('#answer>span');
    let arrletters = [];
    spans.forEach(function(elem){arrletters.push(elem.outerText)});   

    const indices = [];
    //ищем в массиве букв соответствие с тем, что введено в инпут
    let idx = arrletters.indexOf(val);

    //если ничего не найдено, то
    if(idx == -1) {
        let used = arrOfAttempts.indexOf(val);
        //ищем в массиве прошлых попыток введенную букву, если находим - выводим сообщение
        if(used != -1){
            alert("this letter has already been used. try another one");
            input.value = '';
            return;
        }
        //получаем доступ к полю, где будет показывать использованные буквы
        const attempts = document.querySelector('#attempts');
        let letter = document.createElement('span');
        letter.textContent = val + " ";
        letter.style.textDecoration = "line-through";
        attempts.appendChild(letter);
        //добавялем неудачную попытку в массив
        arrOfAttempts.push(val);
        //увеличиваем кол-во неудачных попыток на +1
        count++;
        //вызываем из массива частей виселицы название 
        drawGallows(arrOfDrawParts[count]);
        //обнуляем инпут
        input.value = '';
        //проверяем выиграли или нет
        winOrNot();
        if(count == 9){
            alert('You loose!');
            document.querySelector('button').setAttribute('disabled', '');
            //красим все буквы слова в черный, чтобы было видно слово целиком
            spans.forEach(function(el){
                if(el.style.color !== 'black'){el.style.color = 'black'}
                else {return};
            })
            //предлагем сыграть еще
            wantToPlayAgain();
        } 
        return count;}
       
   //проводим проверку пока не сравним со всеми буквами
   //если соответсвие найдено
    while (idx != -1) {
    //проверяем не была ли буква найдена ранее
    if(spans[idx].style.color == 'black'){
        alert('yes! this letter was there and you have already found it!');
        input.value = '';
        return};

    //находим букву и выделяем черным
    spans[idx].style.color = 'black';
    indices.push(idx);
    idx = arrletters.indexOf(val, idx + 1);
    input.value = '';
    //проверяем выиграли или нет
    winOrNot();
    } 
}
    


//функция для вывода предложения сыграть еще раз
function wantToPlayAgain(){
    const input = document.querySelector('#guess>input');
    let confirmation;
    //устанавливаем таймер на исполнение 
    let timer = setTimeout(function(){
        confirmation = confirm("Want to play again?");
        //если ответ "да" - перезагружвем страницу
        if(confirmation){location.reload()}
        //если "отмена" - делаем инпут недоступным для ввода
        else input.setAttribute("readonly", "")},2000);
    }

//функция для проверки выиграл или проиграл
function winOrNot(){
    // предполагаем, что все элементы зеленые
    let win = true; 
    const spans = document.querySelectorAll('#answer>span'); 
    // перебираем элементы span
    for(let span of spans){ 
    // если цвет не черный
    if(span.style.color != 'black' ){ 
    // меняем значение win на false
    win = false; 
    // прерываем цикл
    break; 
    }
    }
    if(win){
        alert('you are win!');
        document.querySelector('button').setAttribute('disabled', '');
        wantToPlayAgain();
    }
    // возвращаем значение win
    //return win; 
    }



















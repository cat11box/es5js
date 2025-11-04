// script.js

/* begin notify *******************/
// замыкание чтобы не засорять контекст 
function closureMakeNotify() {

    let notifyDiv;
    let notifyTimeout;

    // плавно закрывает и удаляет уведомление из DOM 
    function closeNotify() {
        if(notifyTimeout) {
            clearTimeout(notifyTimeout);
            notifyTimeout = null;
        }
        if(notifyDiv) {
            notifyDiv.style.marginTop = '0px';
            setTimeout(function() {
                if(notifyDiv) {
                    notifyDiv.remove();
                    notifyDiv = null;
                }
            }, 500)
        }
    };

    return function(message, status, timeout) {

        if(['info','positive','negative'].indexOf(status) === -1) status = 'info';
        if(isNaN(timeout) || timeout < 0 ) timeout = 2500;

        // удаляем блок если уведомление уже показывается 
        if(notifyDiv) { 
            notifyDiv.remove();
            if(notifyTimeout) {
                clearTimeout(notifyTimeout);
                notifyTimeout = null;
            }
        }
        // создаем блок уведомлений
        notifyDiv = document.createElement('div');
        notifyDiv.className = 'notify-div '+status;
        // вставляем кнопку закрытия
        notifyDiv.append(document.createElement('i'));
        notifyDiv.firstChild.innerText = '✕';
        notifyDiv.firstChild.addEventListener('click', closeNotify);
        // вставляем блок для текста
        notifyDiv.append(document.createElement('div'));
        notifyDiv.lastChild.innerText = message;
        // добавляем в DOM
        document.body.append(notifyDiv);
        // двигаем к верхней границе окна
        notifyDiv.style.top = notifyDiv.clientHeight * -1 + 'px';
        // устанавливаем таймер закрытия
        if(timeout) notifyTimeout = setTimeout(closeNotify, timeout);
        // плавно открываем
        if(notifyDiv) notifyDiv.style.marginTop = notifyDiv.clientHeight + 20 + 'px';
    }
}
// функция для показа уведомления 
// параметры:
// 1. message: String текст уведомления 
// 2. status = 'info': String стиль уведомления - 'info','positive','negative' 
// 3. timeout = 2500: Number таймаут для скрытия в ms, 0 = не скрывать  
const notify = closureMakeNotify();
/* end notify *********************/


/* begin confirm *******************/
// замыкание 
function closureConfirm() {

    let confirmDiv;

    // закрывает и удаляет confirm из DOM 
    function closeConfirm() {
        if(confirmDiv) {
            confirmDiv.remove();
            confirmDiv = null;
        }
    };

    return function (options, yesCallback, noCallback) {

        const message = options.message || options;
        const yestext = options.yestext || 'Да';
        const notext = options.notext || 'Нет';

        // удаляем блок если уведомление уже показывается 
        if(confirmDiv) { 
            confirmDiv.remove();
        }
        // создаем фон
        confirmDiv = document.createElement('div');
        confirmDiv.className = 'confirm-background';
        // создаем блок уведомлений
        confirmDiv.append(document.createElement('div'));
        confirmDiv.firstChild.className = 'confirm-dialog';
        // вставляем кнопку закрытия
        confirmDiv.firstChild.append(document.createElement('i'));
        confirmDiv.firstChild.firstChild.innerText = '✕';
        confirmDiv.firstChild.firstChild.addEventListener('click', closeConfirm);
        // вставляем блок для текста
        confirmDiv.firstChild.append(document.createElement('div'));
        confirmDiv.firstChild.lastChild.innerText = message;
        // вставляем блок кнопок
        confirmDiv.firstChild.append(document.createElement('div'));
        confirmDiv.firstChild.lastChild.append(document.createElement('button'));
        confirmDiv.firstChild.lastChild.lastChild.innerText = yestext;
        confirmDiv.firstChild.lastChild.lastChild.addEventListener('click', function() {
            if(yesCallback) yesCallback();
            closeConfirm();
        });
        confirmDiv.firstChild.lastChild.append(document.createElement('button'));
        confirmDiv.firstChild.lastChild.lastChild.innerText = notext;
        confirmDiv.firstChild.lastChild.lastChild.addEventListener('click', function() {
            if(noCallback) noCallback();
            closeConfirm();
        });        
        // добавляем в DOM
        document.body.append(confirmDiv);

    }
}
// функция для замены confirm
// вызывает коллбэки по нажатию кнопок да/нет 
// параметры:
// 1. options: 
//    String - текст вопроса 
//    или 
//    Object { 
//      message: String - текст вопроса, 
//      yestext = 'Да': String - текст на 1 кнопке, 
//      notext = 'Нет': String - текст на 2 кнопке
//    }
// 2. yesCallback: Function - клик по 1 кнопке
// 3. noCallback: Function - клик по 2 кнопке
const confirmcb = closureConfirm();
/* end confirm *******************/

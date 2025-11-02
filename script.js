// script.js

/* begin notify *******************/
// функция - замыкание для создания уведомлений 
function closureMakeNotify() {

    let notifyDiv;
    let notifyTimeout;

    // сбрасывает таймер и удаляет уведомление из DOM 
    function closeNotify() {
        if(notifyTimeout) {
            clearTimeout(notifyTimeout);
            notifyTimeout = null;
        }
        if(notifyDiv) {
            notifyDiv.remove();
            notifyDiv = null;
        }
    };

    return function(message, status, timeout = 3500) {

        if(['info','positive','negative'].indexOf(status) === -1) status = 'info';
        if(isNaN(timeout) || timeout < 0 ) timeout = 3500;
        console.log(message);

        // если уведомление уже есть, сбрасываем таймер закрытия 
        if(notifyTimeout) { 
            clearTimeout(notifyTimeout);
            notifyTimeout = null;
        }

        if(!notifyDiv) {
            // создаем блок уведомлений
            notifyDiv = document.createElement('div');
            // вставляем кнопку
            notifyDiv.append(document.createElement('i'));
            notifyDiv.firstChild.innerText = '✕';
            notifyDiv.firstChild.addEventListener('click', closeNotify);
            // вставляем блок для текста
            notifyDiv.append(document.createElement('div'));
            // добавляем в DOM
            document.body.append(notifyDiv);
        }

        // обновляем классы
        notifyDiv.className = 'notify-div '+status;
        // обновляем текст
        notifyDiv.lastChild.innerText = message;
        // устанавливаем таймер закрытия
        if(timeout) notifyTimeout = setTimeout(closeNotify, timeout);
    }
 
}
// функция для вызова уведомления 
// параметры:
// message - текст уведомления 
// status - стиль уведомления: 'info','positive','negative' 
// timeout = 3500 - таймаут для скрытия ms, 0 = не скрывать  
const notify = closureMakeNotify();
/* end notify *********************/
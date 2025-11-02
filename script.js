// script.js

/* begin notify *******************/
/* функция - замыкание для создания уведомлений */
function makeNotify() {

    let notifyDiv;
    let notifyTimeout;

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

    return function(
            message /* текст уведомления */ 
            , status /* стиль уведомления: 'info','positive','negative' */
            , timeout = 3500 /* таймаут для скрытия ms, 0 = не скрывать */ ) {

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
            notifyDiv.classList.add('notify-div');
            // вставляем кнопку
            notifyDiv.append(document.createElement('i'));
            notifyDiv.firstChild.innerText = 'x';
            notifyDiv.firstChild.addEventListener('click', closeNotify);
            // вставляем блок для текста
            notifyDiv.append(document.createElement('div'));
            // добавляем в DOM
            document.body.append(notifyDiv);
        }

        // обновляем текст
        notifyDiv.lastChild.innerText = message;
        // устанавливаем таймер закрытия
        if(timeout) notifyTimeout = setTimeout(closeNotify, timeout);
    }
 
}
/* функция для вызова уведомления */
const notify = makeNotify();
/* end notify *********************/
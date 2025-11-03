// script.js

/* begin notify *******************/
// функция - замыкание для создания уведомлений 
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

    return function(message, status, timeout=2500) {

        if(['info','positive','negative'].indexOf(status) === -1) status = 'info';
        if(isNaN(timeout) || timeout < 0 ) timeout = 2500;

        // резко удаляем блок если уведомление уже есть 
        if(notifyDiv) { 
            notifyDiv.remove();
            notifyDiv = null;
            if(notifyTimeout) {
                clearTimeout(notifyTimeout);
                notifyTimeout = null;
            }
        }
        // создаем блок уведомлений
        notifyDiv = document.createElement('div');
        notifyDiv.className = 'notify-div '+status;
        // вставляем кнопку
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
        setTimeout(function () {
            if(notifyDiv) notifyDiv.style.marginTop = notifyDiv.clientHeight + 20 + 'px';
        }, 1);
    }
 
}
// функция для вызова уведомления 
// параметры:
// message - текст уведомления 
// status - стиль уведомления: 'info','positive','negative' 
// timeout = 2500 - таймаут для скрытия в ms, 0 = не скрывать  
const notify = closureMakeNotify();
/* end notify *********************/
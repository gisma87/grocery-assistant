// Подписаться на автора
function addSubscribtionHandler() {
  const subscribtionId = event.target.getAttribute('data-author-id');
  const iconElement = event.target;

  api.addSubscribtion(subscribtionId).then(() => {
    iconElement.textContent = 'Отписаться от автора';

    iconElement.removeEventListener('click', addSubscribtionHandler);
    iconElement.addEventListener('click', removeSubscribtionHandler);

  })
  .catch((err) => {
    console.log(err);
  });
}

// Отписаться от автора
function removeSubscribtionHandler() {
  const subscribtionId = event.target.getAttribute('data-author-id');
  const iconElement = event.target;

  api.removeSubscribtion(subscribtionId).then(() => {
    iconElement.textContent = 'Подписаться на автора';

    iconElement.removeEventListener('click', removeSubscribtionHandler);
    iconElement.addEventListener('click', addSubscribtionHandler);

  })
  .catch((err) => {
    console.log(err);
  });
}
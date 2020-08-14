// Подписаться на автора
function addSubscribtionHandler(event) {
  const iconElement = event.target;
  const subscribtionId = iconElement.getAttribute('data-author-id');

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
function removeSubscribtionHandler(event) {
  const iconElement = event.target;
  const subscribtionId = iconElement.getAttribute('data-author-id');

  api.removeSubscribtion(subscribtionId).then(() => {
    iconElement.textContent = 'Подписаться на автора';

    iconElement.removeEventListener('click', removeSubscribtionHandler);
    iconElement.addEventListener('click', addSubscribtionHandler);

  })
  .catch((err) => {
    console.log(err);
  });
}
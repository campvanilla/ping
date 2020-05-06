// Implementation inspired by https://github.com/jakearchibald/isserviceworkerready/blob/master/src/demos/sync/index.html

const statusCheckerBtn = document.getElementById('status-checker');
const container = document.getElementById('container');

if ('serviceWorker' in navigator) {
  navigator
    .serviceWorker
    .register('./sw.js', { scope: './' })
    .then(function (reg) {
      return reg.sync.getTags();
    })
    .then(function(tags) {
      if (tags.includes('poller')) {
        console.log("Already polling!");
      }
    })
    .catch(() => {
      console.log('[service worker] Registration Failed');
    });
}

function updateOnlineStatus() {
  if (navigator.onLine) {
    container.classList.remove('offline');
    container.classList.add('online');
  } else {
    container.classList.add('offline');
    container.classList.remove('online');
  }
}

updateOnlineStatus();

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

statusCheckerBtn.addEventListener('click', () => {
  new Promise(function (resolve, reject) {
    Notification.requestPermission(function (result) {
      if (result !== 'granted') return reject(Error("Denied notification permission"));
      resolve();
    })
  })
  .then(function () {
    return navigator.serviceWorker.ready;
  })
  .then(function (reg) {
    reg.showNotification("We'll let you know when the internet is back.");
    reg.sync.register('poller');
    return true;
  })
  .then(function () {
    console.log('Poller registered');
  })
  .catch(function (err) {
    console.log('Poller could not be registered.')
    console.log(err.message);
  });
});

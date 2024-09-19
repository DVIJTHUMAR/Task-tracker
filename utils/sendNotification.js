const messaging = require('../config/firebase');

const sendNotification = async (token, title, body) => {
  const message = {
    notification: {
      title,
      body,
    },
    token,
  };

  try {
    await messaging.send(message);
    console.log('Notification sent successfully');
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

module.exports = sendNotification;
const messaging = require('../config/firebase');

exports.sendNotification = async (req, res) => {
  const { token, title, body } = req.body;

  try {
    const message = {
      notification: {
        title,
        body,
      },
      token,
    };

    await messaging.send(message);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
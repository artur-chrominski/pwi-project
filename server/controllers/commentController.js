const db = require("../config/firebaseConfig");

exports.addComment = async (req, res) => {
  try {
    const { name, email, comment } = req.body;
    const docRef = await db.collection("comments").add({
      name,
      email,
      comment,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    res.status(200).send(`Comment added with ID: ${docRef.id}`);
  } catch (error) {
    res.status(500).send("Error adding comment: " + error);
  }
};

exports.getComments = async (req, res) => {
  try {
    const commentsSnapshot = await db.collection("comments").orderBy("createdAt", "desc").get();
    const comments = commentsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).send("Error getting comments: " + error);
  }
};

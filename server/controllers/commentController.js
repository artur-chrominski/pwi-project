const db = require("../config/firebaseConfig");

exports.addComment = async (req, res) => {
  try {
    const { name, email, comment } = req.body;
    const docRef = await db.collection("comments").add({
      name,
      email,
      comment,
      createdAt: new Date().toISOString() // Zamień na admin.firestore.FieldValue.serverTimestamp() jeśli to działało wcześniej
    });
    res.status(200).send(`Comment added with ID: ${docRef.id}`);
  } catch (error) {
    console.error("Error adding comment:", error);
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
    console.error("Error getting comments:", error);
    res.status(500).send("Error getting comments: " + error);
  }
};

const db = require("../config/firebaseConfig");

exports.addData = async (req, res) => {
  try {
    const { data } = req.body;
    const docRef = await db.collection("testCollection").add({ data });
    res.status(200).send(`Document written with ID: ${docRef.id}`);
  } catch (error) {
    res.status(500).send("Error adding document: " + error);
  }
};

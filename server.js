const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const noteSchema = new mongoose.Schema({
    title: String,
    content: String
});
const Note = mongoose.model('Note', noteSchema);

app.get('/notes', async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
});

app.post('/notes', async (req, res) => {
    const { title, content } = req.body;
    const note = new Note({ title, content });
    await note.save();
    res.json(note);
});

app.delete('/notes/:id', async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
  try {
    const note = await Note.find().sort({ createdAt: "desc" });
    res.status(200).json(note);
  } catch (error) {
    console.error("Error Getting All Notes: " + error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note Not Found" });
    }

    res.status(200).json(note);
  } catch (error) {
    console.error("Error Getting Note: " + error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });

    const savedNote = await note.save();
    res.status(201).json(note);
  } catch (error) {
    console.error("Error creating new Note: " + error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note Not Found" });
    }

    res.status(200).json("Updated Successfully: " + updatedNote);
  } catch (error) {
    console.error("Error updating Note: " + error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteNote(req, res) {
  try {
    const noteToDelete = await Note.findByIdAndDelete(req.params.id);

    if (!noteToDelete) {
      return res.status(404).json({ message: "Note Not Found" });
    }

    res.status(200).json("Note Deleted Successfully: " + noteToDelete);
  } catch (error) {
    console.error("Error deleting Note: " + error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

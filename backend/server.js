const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3001;
const dataPath = path.join(__dirname, "data.json");

app.use(cors());
app.use(express.json());

/**
 * Reads club data from disk to keep the prototype simple.
 * In production, a persistent database would be used instead.
 */
function loadDatabase() {
  const raw = fs.readFileSync(dataPath, "utf-8");
  const parsed = JSON.parse(raw);
  return {
    clubs: Array.isArray(parsed.clubs) ? parsed.clubs : [],
  };
}

function saveDatabase(db) {
  fs.writeFileSync(dataPath, JSON.stringify(db, null, 2), "utf-8");
}

function loadClubs() {
  return loadDatabase().clubs;
}

function buildShortDescription(fullDescription = "") {
  const normalized = fullDescription.trim();
  if (normalized.length <= 140) {
    return normalized;
  }
  return `${normalized.slice(0, 137)}...`;
}

app.get("/api/clubs", (_req, res) => {
  try {
    const clubs = loadClubs().map(({ id, name, short_description }) => ({
      id,
      name,
      short_description,
    }));
    res.json(clubs);
  } catch (error) {
    console.error("Failed to load clubs:", error);
    res.status(500).json({ error: "Failed to load clubs" });
  }
});

app.get("/api/clubs/:id", (req, res) => {
  try {
    const clubId = Number(req.params.id);
    const clubs = loadClubs();
    const club = clubs.find((entry) => entry.id === clubId);

    if (!club) {
      return res.status(404).json({ error: "Club not found" });
    }

    res.json(club);
  } catch (error) {
    console.error("Failed to load club:", error);
    res.status(500).json({ error: "Failed to load club" });
  }
});

app.post("/api/clubs", (req, res) => {
  try {
    const { name, full_description, contact_info } = req.body || {};

    if (!name || !full_description || !contact_info) {
      return res
        .status(400)
        .json({ error: "name, full_description and contact_info are required" });
    }

    const db = loadDatabase();
    const nextId =
      db.clubs.length > 0
        ? Math.max(...db.clubs.map((club) => club.id)) + 1
        : 1;

    const newClub = {
      id: nextId,
      name: name.trim(),
      full_description: full_description.trim(),
      contact_info: contact_info.trim(),
      short_description: buildShortDescription(full_description),
      events: [],
    };

    db.clubs.push(newClub);
    saveDatabase(db);

    res.status(201).json(newClub);
  } catch (error) {
    console.error("Failed to create club:", error);
    res.status(500).json({ error: "Failed to create club" });
  }
});

app.listen(PORT, () => {
  console.log(`UniLife backend listening on http://localhost:${PORT}`);
});

/* =====================================================================
   EPISODES  —  the ONLY file you need to edit when you publish something new
   =====================================================================

   HOW TO ADD A NEW EPISODE
   1. Copy the last line in the list below.
   2. Paste it right under it (new entries ALWAYS go at the END).
   3. Change the title, the link (and the tag, if you want one).
   4. Save and upload. Done.

   The episode list on the novel page AND the "new update" pop-up both update
   by themselves. The pop-up always announces the LAST entry in the list, and
   every visitor sees it once for each new last entry.

   EACH LINE LOOKS LIKE THIS
     { title: "Episode 12", tag: "Last", link: "https://drive.google.com/..." },

     title  (required)  what the list and the pop-up call it
     link   (required)  where "Read" takes the visitor
     tag    (optional)  a small label shown next to the title: "Last", "New",
                        "Bonus", ... Leave it out (or "") for no label.
     note   (optional)  custom sentence for the pop-up instead of the default
                        one, e.g. note: "The final episode is here!"

   EXAMPLES
     { title: "Episode 11", link: "https://..." },
     { title: "Episode 12", tag: "Last", link: "https://..." },
     { title: "Full PDF", tag: "Complete", link: "https://..." },

   NOTES
   - Don't forget the comma at the end of each line, and keep the quotes.
   - Titles starting with "Episode" get the "New episode" pop-up; anything else
     (like "Full PDF") gets a "New update" pop-up.
   - A dashed "Coming soon" placeholder shows after the last entry while
     `soon` is true. It hides itself automatically once an entry is tagged
     "Last", "Final" or "Complete", or when you set `soon: false`.
   - To change an old entry's title or tag you can edit it freely; that will
     NOT re-trigger the pop-up. Only a new last entry (or a changed link on
     the last entry) does.
   ===================================================================== */

const NOVELS = {
  maqsad: {
    title: "Maqsad",
    ur: "مقصد",
    soon: true,
    episodes: [
      { title: "Episode 1",  link: "https://drive.google.com/file/d/1bx4zuBng0N1-0Kgtf6HNzt00x6Wq-5lL/view?usp=sharing" },
      { title: "Episode 2",  link: "https://drive.google.com/file/d/1OEEJRFoJmDVyvtqVFHDKDjZs9TnBan23/view?usp=sharing" },
      { title: "Episode 3",  link: "https://drive.google.com/file/d/1Yf_c8aWoMLm1pVvbEmqT5jmGsJMyNctC/view?usp=sharing" },
      { title: "Episode 4",  link: "https://drive.google.com/file/d/1X86PeRNIQAtuKnuCAL43UAa-pipPEoVs/view?usp=sharing" },
      { title: "Episode 5",  link: "https://drive.google.com/file/d/1pMGpeNNVIUzq3EJyr7nTqzgWWmFjSKSU/view?usp=sharing" },
      { title: "Episode 6",  link: "https://drive.google.com/file/d/1sx9aydljQDLDxFqvg-YjTDd3z46A-15-/view?usp=sharing" },
      { title: "Episode 7",  link: "https://drive.google.com/file/d/18p9eopWk5Tr7UYdvEbOlhRxlOmE6dHyk/view?usp=sharing" },
      { title: "Episode 8",  link: "https://drive.google.com/file/d/1bShtsutpCmdxp9qCGZ7q53PRmSRwgUS3/view?usp=sharing" },
      { title: "Episode 9",  link: "https://drive.google.com/file/d/1LBqU7Tj4uKaKUPNqRQ6zY1dT3z03nZXC/view?usp=sharing" },
      { title: "Episode 10", link: "https://drive.google.com/file/d/1EVQJMXBtWCbxBgZZtOSQo__28JnDBrqe/view?usp=sharing" },
      { title: "Episode 11", link: "https://drive.google.com/file/d/1ahrMJ7skEF37CiAGjkUif5dBGKdsNazE/view?usp=sharing" },
      { title: "Episode 12", tag: "Last", link: "https://drive.google.com/file/d/1BGp5WJbE3QfWWbc-Vd90MMoDSRAVMOnc/view?usp=sharing" },
      { title: "Full PDF", tag: "Complete", link: "https://drive.google.com/file/d/1pHEkJcDUbv9RuHvgLR-Y1eKcbcimkxdN/view?usp=sharing" },
      // ↓↓ ADD NEW ENTRIES BELOW THIS LINE ↓↓

    ]
  }
};

// Which novel the pop-up announces:
const FEATURED = "maqsad";

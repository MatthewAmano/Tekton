var orchestra = {
  name: "Distant Worlds ",
  instruments: [
    { name: "violin", section: "string" },
    { name: "harp", section: "string" },
    { name: "trumpet", section: "brass" },
    { name: "clarinet", section: "woodwind" },
    { name: "saxophone", section: "woodwind" },
  ],
  director: "Nobuo Uematsu",
};

var woodwindItems = null;

function filterInstruments() {
  woodwindItems = orchestra.instruments.filter(
    (obj) => obj.section === "woodwind"
  );
}

function logInstruments() {
  var loop = orchestra.instruments;
  for (var i = 0; i < loop.length; i++) {
    if (loop[i].section === "woodwind") {
      console.log(loop[i].name);
    }
  }
}

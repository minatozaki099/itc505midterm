// === Shadows of Hollowvale ===
// Full Choose-Your-Own-Adventure Logic

const storyText = document.getElementById("storyText");
const choicesDiv = document.getElementById("choices");
const panelImage = document.getElementById("panelImage");
const ambience = document.getElementById("ambience");

// --- STORY DATA ---
const scenes = {
  start: {
    image: "images/mansion-front.png",
    text: "Rain needled the cobblestones as Hollowvale Manor loomed ahead—windows like cartoon eyes, smiling wrong. The iron gate creaked open by itself… inviting.",
    choices: [
      { text: "Step through the gate", consequence: "gate" },
      { text: "Circle the grounds", consequence: "grounds" }
    ]
  },
  gate: {
    image: "images/gate.png",
    text: "Inside the courtyard, gargoyles grin with too many teeth. A lantern flickers purple. Somewhere, a music box is playing… backwards.",
    choices: [
      { text: "Enter through the main doors", consequence: "foyer" },
      { text: "Peek through a cracked cellar door", consequence: "cellarDoor" }
    ]
  },
  grounds: {
    image: "images/hedge-maze.png",
    text: "You wander past hedges shaped like people mid-scream. The statue of a child points toward a side entrance… which was not there moments ago.",
    choices: [
      { text: "Follow the statue’s finger", consequence: "sideEntrance" },
      { text: "Turn back to the gate (bad idea)", consequence: "gateTrap" }
    ]
  },
  gateTrap: {
    image: "images/gate-eyes.png",
    text: "You turn to leave. The gate smiles wider… until the iron curls shut behind you like fangs.",
    endTitle: "Ending 1: Dinner for the Gate"
  },
  sideEntrance: {
    image: "images/side-door.png",
    text: "A cartoonishly long hallway stretches, doors multiplying the more you blink. From one, warm light; from another, cold whispers.",
    choices: [
      { text: "Open the warm-lit door", consequence: "nursery" },
      { text: "Follow the cold whispers", consequence: "library" }
    ]
  },
  foyer: {
    image: "images/foyer.png",
    text: "The foyer’s chandelier ticks like a clock. A portrait of the Lady watches you. Her painted eyes gleam… wet.",
    choices: [
      { text: "Inspect the portrait", consequence: "portrait" },
      { text: "Climb the grand staircase", consequence: "stairs" }
    ]
  },
  portrait: {
    image: "images/portrait.png",
    text: "Her smile widens. Your reflection in the varnish blinks out of sync.",
    choices: [
      { text: "Touch the paint", consequence: "portraitTrap" },
      { text: "Back away slowly", consequence: "stairs" }
    ]
  },
  portraitTrap: {
    image: "images/portrait-trap.png",
    text: "Your hand sinks through—cold syrup. A painted hand grabs yours.",
    endTitle: "Ending 2: Trapped in the Portrait"
  },
  stairs: {
    image: "images/stairs.png",
    text: "On the landing, a music box spins. The tune reverses when you breathe. Left: the nursery. Right: the attic ladder, already lowered.",
    choices: [
      { text: "Enter nursery", consequence: "nursery" },
      { text: "Climb to the attic", consequence: "attic" }
    ]
  },
  nursery: {
    image: "images/nursery.png",
    text: "Dusty stuffed animals face the wall. A jack-in-the-box cranks itself and stops… just before the pop.",
    choices: [
      { text: "Crank it the last click", consequence: "jack" },
      { text: "Search the toy chest", consequence: "toyKey" }
    ]
  },
  jack: {
    image: "images/jack.png",
    text: "POP! A tiny paper mask flutters out—smiling. It lands on your face.",
    endTitle: "Ending 3: The Jester’s New Face"
  },
  toyKey: {
    image: "images/key.png",
    text: "You find a brass key shaped like a teardrop. It hums in your palm, pointing somewhere… down.",
    choices: [
      { text: "Head to the library", consequence: "library" },
      { text: "Seek the cellar stairs", consequence: "cellarDoor" }
    ]
  },
  library: {
    image: "images/library.png",
    text: "Books shelved by heartbeat. A mirror stands shrouded. The whispering gathers around it like moths.",
    choices: [
      { text: "Unveil the mirror", consequence: "mirror" },
      { text: "Ignore it; pull a suspicious book", consequence: "secretPassage" }
    ]
  },
  mirror: {
    image: "images/mirror.png",
    text: "Your reflection looks relieved to see you—then mouths: ‘RUN.’ A hand prints from the inside of the glass.",
    choices: [
      { text: "Touch the mirror", consequence: "mirrorTrap" },
      { text: "Smash it", consequence: "mirrorShards" }
    ]
  },
  mirrorTrap: {
    image: "images/mirror-trap.png",
    text: "The glass ripples and swallows your shadow first. Your body follows, empty as a discarded coat.",
    endTitle: "Ending 4: Vanished in the Mirror"
  },
  mirrorShards: {
    image: "images/shards.png",
    text: "Shards scatter like teeth. Each shard shows you in a different room… one shows you smiling, not you.",
    choices: [
      { text: "Step away and head to cellar", consequence: "cellarDoor" },
      { text: "Try to rearrange shards into a door", consequence: "shardDoor" }
    ]
  },
  shardDoor: {
    image: "images/shard-door.png",
    text: "The pieces bite your fingers into a doorway. Beyond is a blue-lit corridor.",
    choices: [
      { text: "Go through", consequence: "ritualHall" },
      { text: "Chicken out", consequence: "cellarDoor" }
    ]
  },
  secretPassage: {
    image: "images/secret.png",
    text: "A shelf grinds open. Cold air sighs up a narrow stair. The key in your pocket buzzes like a wasp.",
    choices: [
      { text: "Descend", consequence: "cellarDoor" },
      { text: "Return to foyer", consequence: "foyer" }
    ]
  },
  attic: {
    image: "images/attic.png",
    text: "Strings of paper talismans. Childish drawings of the Lady with a crown of thorns. A trapdoor yawns to the roof.",
    choices: [
      { text: "Open the locked trunk", consequence: "atticTrunk" },
      { text: "Climb to roof and signal help", consequence: "roof" }
    ]
  },
  atticTrunk: {
    image: "images/trunk.png",
    text: "Inside: a caretaker’s mask and a ledger of names crossed out in red crayon.",
    choices: [
      { text: "Wear the mask", consequence: "caretaker" },
      { text: "Throw it aside and go down", consequence: "library" }
    ]
  },
  caretaker: {
    image: "images/caretaker-mask.png",
    text: "The mask seals. You feel custodial anger become yours. The manor purrs.",
    endTitle: "Ending 5: The New Caretaker"
  },
  roof: {
    image: "images/roof.png",
    text: "Lightning outlines the town. Your phone finds a single bar. A shadow rises behind you… taller than the house.",
    choices: [
      { text: "Jump to the soft hedge!", consequence: "escapeHedge" },
      { text: "Turn to face it", consequence: "roofShadow" }
    ]
  },
  escapeHedge: {
    image: "images/hedge-jump.png",
    text: "You tumble into the hedge’s arms. They’re… hands. But they toss you over the fence like a rebellious seed.",
    endTitle: "Ending 6: Escaped (Barely)"
  },
  roofShadow: {
    image: "images/shadow.png",
    text: "The shadow leans close. It whispers your name the way the ocean says shore. You whisper back.",
    endTitle: "Ending 7: Married to the Night"
  },
  cellarDoor: {
    image: "images/cellar.png",
    text: "The cellar smells of ink and thunder. Circles carved in the stone. A door at the end has a teardrop keyhole.",
    choices: [
      { text: "Use the brass teardrop key", consequence: "ritualHall" },
      { text: "Open the other, nailed door", consequence: "nailedDoor" }
    ]
  },
  nailedDoor: {
    image: "images/nailed.png",
    text: "You pry the boards. The room beyond is full of clocks—all set to your birthday. They begin to ring.",
    endTitle: "Ending 8: Time Eats Itself"
  },
  ritualHall: {
    image: "images/ritual.png",
    text: "Candles hover without wicks. Chalk whispers under your shoes. A book waits on a pedestal, pages turning to follow your eyes.",
    choices: [
      { text: "Read the incantation", consequence: "banishOrBind" },
      { text: "Snatch the book and run", consequence: "hallRun" }
    ]
  },
  hallRun: {
    image: "images/collapse.png",
    text: "The hall sighs and collapses behind you into a deeper dark. A final door ahead breathes.",
    choices: [
      { text: "Open the breathing door", consequence: "breathingDoor" },
      { text: "Backtrack to library", consequence: "library" }
    ]
  },
  breathingDoor: {
    image: "images/door-breath.png",
    text: "It inhales you. The room inside is your childhood bedroom, perfect and wrong. Someone sits on the bed wearing your face.",
    endTitle: "Ending 9: Replaced"
  },
  banishOrBind: {
    image: "images/grimoire.png",
    text: "The runes wriggle like tadpoles. The book offers two spells written in childish hand.",
    choices: [
      { text: "Banish the Lady", consequence: "banish" },
      { text: "Bind the Lady", consequence: "bind" }
    ]
  },
  banish: {
    image: "images/banish.png",
    text: "Light bursts through the cracks of the world. The Lady screams like a bell being cracked.",
    endTitle: "Ending 10: Cleansed Dawn"
  },
  bind: {
    image: "images/bind.png",
    text: "The manor kneels. The Lady bows. You become its master. It waits for your command.",
    endTitle: "Ending 11: The Bound Lord"
  }
};

// === MAIN GAME FUNCTIONS ===
let currentScene = "start";

function startGame() {
  currentScene = "start";
  showScene(currentScene);
}

function showScene(key) {
  const scene = scenes[key];
  if (!scene) return;

  // Fade image transition
  panelImage.classList.remove("show");
  setTimeout(() => {
    panelImage.src = scene.image;
    panelImage.onload = () => panelImage.classList.add("show");
  }, 200);

  // Update text
  storyText.textContent = scene.text;

  // Clear previous buttons
  choicesDiv.innerHTML = "";

  if (scene.endTitle) {
    const endDiv = document.createElement("div");
    endDiv.className = "end-card";
    endDiv.innerHTML = `<p class="end-title">${scene.endTitle}</p><p>${scene.text}</p>`;
    choicesDiv.appendChild(endDiv);
  } else {
    scene.choices.forEach(choice => {
      const btn = document.createElement("button");
      btn.className = "choice-btn";
      btn.textContent = choice.text;
      btn.addEventListener("click", () => showScene(choice.consequence));
      choicesDiv.appendChild(btn);
    });
  }
}

// === AMBIENCE AUDIO ===
document.getElementById("btnToggleAmbience").addEventListener("click", () => {
  if (ambience.paused) {
    ambience.play();
    document.getElementById("btnToggleAmbience").textContent = "Pause Ambience";
  } else {
    ambience.pause();
    document.getElementById("btnToggleAmbience").textContent = "Play Ambience";
  }
});

// === RESTART BUTTON ===
document.getElementById("btnRestart").addEventListener("click", startGame);

// === START GAME ===
document.addEventListener("DOMContentLoaded", startGame);

// === PARALLAX EFFECT ===
const panelImageWrap = document.querySelector(".panel-image-wrap");
if (panelImageWrap) {
  panelImageWrap.addEventListener("mousemove", (e) => {
    const rect = panelImageWrap.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    panelImage.style.transform = `scale(1.05) rotateY(${x}deg) rotateX(${y}deg)`; // less zoomed
  });
  panelImageWrap.addEventListener("mouseleave", () => {
    panelImage.style.transform = "scale(1.02) rotateY(0deg) rotateX(0deg)"; // relaxed reset
  });
}

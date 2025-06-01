let loadout = {
    scry: { //could also be called hint but hint sounds like easy mode and scry sounds cool
        description: "Tap to highlight two required pieces; recharges every 5 seconds.",
        hasButton: 1,
        img: null, //set in core.js preload
        trueimg: null,
        truedes: null //is just decription again
    },
    grind: {
        description: "When you solve a puzzle get 6 more seconds, but score fewer points.",
        hasButton: 0,
        img: null,
        trueimg: null,
        truedes: null
    },
    roulette: {
        description: "Tap to reroll the current puzzle; recharges every 7 seconds.",
        hasButton: 1,
        img: null,
        trueimg: null,
        truedes: null
    },
    conjure: {
        description: "Add 5 one-by-one pieces to every puzzle, but point scoring is slightly reduced.",
        hasButton: 0,
        img: null,
        trueimg: null,
        truedes: null
    },
    burnout: {
        description: "Loose 3 minutes, but point scoreing is increased exponentially.",
        hasButton: 0,
        img: null,
        trueimg: null,
        truedes: null
    },
    focus: {
        description: "The trick piece cannot be placed in the grid (it may still be picked up).",
        hasButton: 0,
        img: null,
        trueimg: null,
        truedes: null
    },
    slice: {
        description: "Tap to slice 2 pieces in half; recharges every 10 seconds (scales with grid size).",
        hasButton: 1,
        img: null,
        trueimg: null,
        truedes: null
    },
    fish: {
        description: "Tap for points; recharges at random; goes on cooldown if not pressed in time.",
        hasButton: 1,
        img: null,
        trueimg: null,
        truedes: null
    },
    void: {
        description: "If the last piece fits, complete the puzzle before having placed said piece.",
        hasButton: 0,
        img: null,
        trueimg: null,
        truedes: null
    }
}

let mode = {
    evolution: "Finishing two puzzles increases the grid size by 1 row and 1 column.",
    static: "Grid remains a four-by-four. Score less than if you were playing evolution.",
    zen: "Evolution but there's no time limit and your final score isn't saved."
}

let modeout = {
    l: "scry",
    m: "evolution"
}
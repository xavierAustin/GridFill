let loadout = {
    scry: { //could also be called hint but hint sounds like easy mode and scry sounds cool
        description: "Click to reveal two pieces that must be placed in the grid; recharges every 5 seconds.",
        hasButton: 1,
        img: null, //set in core.js preload
        trueimg: null
    },
    grind: {
        description: "Gain 6 seconds per correctly solved puzzle, but point scoreing reduced exponentially (scales with grid size).",
        hasButton: 0,
        img: null,
        trueimg: null
    },
    roulette: {
        description: "Click to reroll the current puzzle; recharges every 7 seconds.",
        hasButton: 1,
        img: null,
        trueimg: null
    },
    conjure: {
        description: "Add 5 one-by-one pieces to every puzzle, but point scoring is slightly reduced.",
        hasButton: 0,
        img: null,
        trueimg: null
    },
    burnout: {
        description: "Loose 3 minutes, but point scoreing is increased exponentially",
        hasButton: 0,
        img: null,
        trueimg: null
    },
    focus: {
        description: "The trick piece cannot be placed in the grid (it may still be picked up).",
        hasButton: 0,
        img: null,
        trueimg: null
    },
    slice: {
        description: "Click to slice 2 pieces in half; recharges every 10 seconds (scales with grid size).",
        hasButton: 1,
        img: null,
        trueimg: null
    },
    fish: {
        description: "Click to slightly increase point scoring; recharges at random and goes on cooldown if not pressed within 3/4ths a second",
        hasButton: 1,
        img: null,
        trueimg: null
    },
    void: {
        description: "If one of your last pieces would fit the grid, finish the current grid and recive the normal point scoring.",
        hasButton: 0,
        img: null,
        trueimg: null
    }
}

let mode = {
    evolution: "Finishing two puzzles changes the grid size; scoring increased.",
    static: "Grid remains a four-by-four.",
    zen: "Evolution but there's no time limit and your final score isn't saved."
}

let modeout = {
    l: "scry",
    m: "evolution"
}
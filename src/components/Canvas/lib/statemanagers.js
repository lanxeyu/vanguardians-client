// --------------------  STATE MANAGERS -----------------------------

import { audioManager } from "./audio";

const CHAR_STATES = {
    IDLE: 0,
    FORWARD: 1,
    ATTACKING: 2,
    FLEEING: 3,
};

const CHAR_MODES = {
    MODE_1: 0,
    MODE_2: 1,
};

const GAME_STATES = {
    MAIN_MENU: 0,
    PLAYING: 1,
    END_SCREEN: 2,
};

const GROUP_COMMANDS = {
    ADVANCE: 0,
    RETREAT: 1
}

let currentGameState = GAME_STATES.MAIN_MENU;
let currentGroupCommand = GROUP_COMMANDS.ADVANCE;

function setCurrentGameState(gameState) {
    currentGameState = gameState;
}

function setCurrentGroupCommand(groupCommand) {
    audioManager.playArSfx()
    currentGroupCommand = groupCommand;
}

function toggleGroupCommands() {
    switch(currentGroupCommand) {
        case GROUP_COMMANDS.ADVANCE:
            currentGroupCommand = GROUP_COMMANDS.RETREAT;
            break;
        case GROUP_COMMANDS.RETREAT:
            currentGroupCommand = GROUP_COMMANDS.ADVANCE;
            break;
        default:
            currentGroupCommand = GROUP_COMMANDS.ADVANCE;
    }
}

function getCurrentGameState() { return currentGameState }
function getCurrentGroupCommand() { return currentGroupCommand }

export { CHAR_STATES, CHAR_MODES, GAME_STATES, GROUP_COMMANDS, setCurrentGameState, getCurrentGameState, setCurrentGroupCommand, getCurrentGroupCommand, toggleGroupCommands }
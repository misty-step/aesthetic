// Poppycock's lobby as https://poppycock.mistystep.io/ shows it: the entrance (components/entrance.tsx) and the
// waiting room after a table exists (app/page.tsx), with the app's own strings, verbatim, from misty-step/poppycock
// at 904a8df (read 2026-10-30). Quoted strings keep their source punctuation; the "3–12" in the game details and
// the rules is Poppycock's.
// Not shown: the illustrated characters and the brand mark (the repository has no licence; neutral stand-ins are
// drawn in screens/lobby.ts), the QR code, and the avatar picker that "Change avatar" opens.
export const SHA = '904a8df433b9684dd749e5ba81b865f928c67e68';
export const PAGE_URL = 'https://poppycock.mistystep.io/';
export const SOURCES = {
  entrance: `https://github.com/misty-step/poppycock/blob/${SHA}/components/entrance.tsx`,
  room: `https://github.com/misty-step/poppycock/blob/${SHA}/app/page.tsx`,
};

// vendor/parlor/packages/core: room codes are four characters from this alphabet; a name is NFKC-normalised, trimmed,
// its spaces collapsed, and must be 1 to 24 code points.
export const ROOM_CODE_ALPHABET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
export const ROOM_CODE_LENGTH = 4;
export const ROOM_CODE = new RegExp(`^[${ROOM_CODE_ALPHABET}]{${ROOM_CODE_LENGTH}}$`);
export const MAX_SEATS = 12;
export function displayName(value: string): string | null {
  const name = value.normalize('NFKC').trim().replace(/\s+/gu, ' ');
  const length = [...name].length;
  return length >= 1 && length <= 24 ? name : null;
}
// The render's sample state: the canonical markup's sample name (site/primitives.html) and a code from the alphabet.
export const SAMPLE = { name: 'Phaedrus', code: 'K7PM' };

export const BRAND = { label: 'Poppycock', name: 'poppycock', bang: '!' };
export const SKIP = 'Skip to game';
export const HOW_TO_PLAY = 'How to play';

export const ENTRANCE = {
  title: 'Your friends are full of it.',
  intro: 'Invent a convincing answer to a weird question. Fool your friends, then find the truth hiding among the bluffs.',
  details: 'Game details',
  facts: ['3–12 players', 'Six untimed rounds', 'One phone each'],
  panelTitle: 'Pull up a chair.',
  panelIntro: 'Create a table or join one with your room code.',
  modes: 'Choose how to play',
  create: 'Create table',
  join: 'Join table',
  name: 'Your name',
  nameHelp: 'Shown to other players.',
  nameInstruction: 'Enter a name between 1 and 24 characters.',
  code: 'Room code',
  codeHelp: 'The four-character code on your host’s screen.',
  codeInstruction: 'Enter the four-character room code from your host.',
  creating: 'Creating table.',
  joining: 'Joining table.',
  bluffFor: 'Example bluff for “What was a knocker-up?”',
  bluff: '“A carpenter who tested door knockers.”',
};

// lib/game-error.ts. The lab has no tables, so joining any well-formed code meets ROOM_NOT_FOUND, as it would live.
export const ROOM_NOT_FOUND = 'No table has that room code. Check the code with your host.';

export const ROOM = {
  controls: 'Table controls',
  room: 'Room',
  roomLabel: (code: string) => `Room ${code}. Invite friends`,
  options: 'Table options',
  invite: 'Invite friends',
  leave: 'Leave table',
  title: 'Your table of tall tales',
  intro: 'Invite your favorite troublemakers. One phone each.',
  inviteTitle: 'Invite your friends',
  inviteIntro: 'Friends use this code to join your table.',
  roomCode: 'Room code',
  copy: 'Copy invite link',
  copied: 'Link copied',
  copiedStatus: 'Invite link copied.',
  manualStatus: 'Select and copy the invite link below.',
  manualLabel: 'Copy this invite link',
  rosterTitle: 'Your fellow fibbers',
  count: (n: number) => `${n} of ${MAX_SEATS} players`,
  you: '(you)',
  host: 'Host',
  player: 'Player',
  start: 'Start game',
  needMore: (n: number) => `You need ${n} more ${n === 1 ? 'player' : 'players'} to start.`,
  ready: 'Start when everyone is here. Each game has six rounds.',
};

export const INVITE_DIALOG = { title: 'Invite friends', description: 'Share this code or link. Each player joins on their own phone.' };

export const RULES_DIALOG = {
  title: 'How to play',
  description: '3–12 players. Six rounds. No time limit.',
  steps: [
    ['Write an answer', 'Everyone gets the same question. Invent a believable answer and submit it. You can\'t change it afterward.'],
    ['Find the truth', 'The real answer is mixed with everyone\'s bluffs. Choose one, then lock your vote. You can\'t vote for your own bluff.'],
    ['See who you fooled', 'Reveal the truth, the bluffs, and the scores. Any player can start the next round when the table is ready.'],
  ] as [string, string][],
  scoring: 'Scoring',
  points: [
    ['Vote for the truth', '+2 points'],
    ['Each player who votes for your bluff', '+1 point'],
    ['Write the exact truth (you don\'t vote that round)', '+2 points'],
  ] as [string, string][],
};

export const LEAVE_DIALOG = {
  title: 'Leave this table?',
  lastPlayer: 'You\'re the last player. Leaving closes the table and ends any game still in progress.',
  confirm: 'Leave table',
  cancel: 'Stay',
};

export const FOOTER = {
  line: 'Good friends. Questionable answers.',
  credit: [
    ['A ', null], ['Misty Step', 'https://mistystep.io'], [' game. Built with ', null], ['Parlor', 'https://parlor.mistystep.io'], ['. ', null], ['Changelog', 'https://poppycock.mistystep.io/changelog'],
  ] as [string, string | null][],
  newTab: ' (opens in a new tab)',
};

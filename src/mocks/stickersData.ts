export interface Sticker {
  id: string;
  country: string;
  player: string;
  emoji: string;
}

const stickers: Sticker[] = [
  // Argentina
  { id: 'arg-1', country: '🇦🇷 Argentina', player: 'Messi', emoji: '🐐' },
  { id: 'arg-2', country: '🇦🇷 Argentina', player: 'Di María', emoji: '⚡' },
  { id: 'arg-3', country: '🇦🇷 Argentina', player: 'Martínez', emoji: '🧤' },
  { id: 'arg-4', country: '🇦🇷 Argentina', player: 'Escudo', emoji: '🛡️' },
  { id: 'arg-5', country: '🇦🇷 Argentina', player: 'Fans', emoji: '🎉' },
  // Brasil
  { id: 'bra-1', country: '🇧🇷 Brasil', player: 'Neymar', emoji: '💃' },
  { id: 'bra-2', country: '🇧🇷 Brasil', player: 'Vini Jr', emoji: '⚡' },
  { id: 'bra-3', country: '🇧🇷 Brasil', player: 'Alisson', emoji: '🧤' },
  { id: 'bra-4', country: '🇧🇷 Brasil', player: 'Escudo', emoji: '🛡️' },
  { id: 'bra-5', country: '🇧🇷 Brasil', player: 'Fans', emoji: '🎉' },
  // Alemania
  { id: 'ger-1', country: '🇩🇪 Alemania', player: 'Musiala', emoji: '🌟' },
  { id: 'ger-2', country: '🇩🇪 Alemania', player: 'Wirtz', emoji: '⚡' },
  { id: 'ger-3', country: '🇩🇪 Alemania', player: 'Neuer', emoji: '🧤' },
  { id: 'ger-4', country: '🇩🇪 Alemania', player: 'Escudo', emoji: '🛡️' },
  { id: 'ger-5', country: '🇩🇪 Alemania', player: 'Fans', emoji: '🎉' },
  // Francia
  { id: 'fra-1', country: '🇫🇷 Francia', player: 'Mbappé', emoji: '🐢' },
  { id: 'fra-2', country: '🇫🇷 Francia', player: 'Griezmann', emoji: '🎯' },
  { id: 'fra-3', country: '🇫🇷 Francia', player: 'Maignan', emoji: '🧤' },
  { id: 'fra-4', country: '🇫🇷 Francia', player: 'Escudo', emoji: '🛡️' },
  { id: 'fra-5', country: '🇫🇷 Francia', player: 'Fans', emoji: '🎉' },
  // Inglaterra
  { id: 'eng-1', country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Inglaterra', player: 'Kane', emoji: '⚽' },
  { id: 'eng-2', country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Inglaterra', player: 'Bellingham', emoji: '🌟' },
  { id: 'eng-3', country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Inglaterra', player: 'Pickford', emoji: '🧤' },
  { id: 'eng-4', country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Inglaterra', player: 'Escudo', emoji: '🛡️' },
  { id: 'eng-5', country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Inglaterra', player: 'Fans', emoji: '🎉' },
  // España
  { id: 'esp-1', country: '🇪🇸 España', player: 'Pedri', emoji: '✨' },
  { id: 'esp-2', country: '🇪🇸 España', player: 'Gavi', emoji: '🔥' },
  { id: 'esp-3', country: '🇪🇸 España', player: 'Unai Simón', emoji: '🧤' },
  { id: 'esp-4', country: '🇪🇸 España', player: 'Escudo', emoji: '🛡️' },
  { id: 'esp-5', country: '🇪🇸 España', player: 'Fans', emoji: '🎉' },
];

export default stickers;
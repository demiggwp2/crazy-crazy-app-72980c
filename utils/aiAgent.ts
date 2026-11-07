const motivationalQuotes = [
  'You are the chosen one. The apocalypse is just a to-do list away.',
  'Every task you complete is a step toward saving humanity.',
  'The matrix has you. But your todo app is stronger.',
  'Do not fear the end. It will be completed by you.',
];

export const getAIQuote = () => {
  return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
};

module.exports = {
  './src/index.html': {
    title: 'Главная страница',
    chunks: [
      'styles',
      'app',
    ],
  },
  './src/form.html': {
    title: 'Формы',
    chunks: [
      'styles',
      'registration',
    ],
  },
};

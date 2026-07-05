module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    // Production çıktısını küçültür (dosya boyutu + gzip kazancı)
    require('cssnano')({ preset: 'default' }),
  ]
};

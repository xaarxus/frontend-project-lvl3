import 'bootstrap';

export default () => {
  const conteiner = document.querySelector('#rss_agregator');
  const div = document.createElement('div');
  const row = document.createElement('div');
  const col8 = document.createElement('div');
  const col4 = document.createElement('div');
  row.append(col8);
  row.append(col4);
  div.append(row);
  conteiner.append(div);
};

import React from 'react';
import MovieSelect from './components/movieSelect';
import MovieTable from './components/movieTable';

React.render(<MovieSelect />, document.getElementById('select-wrapper'));
React.render(<MovieTable />, document.getElementById('table-wrapper'));

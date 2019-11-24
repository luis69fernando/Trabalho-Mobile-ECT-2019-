import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

import Livros from './Home'
import CadastrarLivros from './Cadastro'
import Perfil from './Perfil'

const drawerNavigation = createDrawerNavigator({
    Livros,
    CadastrarLivros,
    Perfil
});

export default createAppContainer(drawerNavigation);
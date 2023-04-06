import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PaginaPadrao from './components/PaginaPadrao/PaginaPadrao'
import Anuncie from './pages/Anuncie/Anuncie';
import Carrinho from './pages/Carrinho/Carrinho';
import Categoria from './pages/Categoria/Categoria';
import Home from './pages/Home/Home'
import Pagamento from './pages/Pagamento/Pagamento';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PaginaPadrao />}>
          <Route index element={<Home />} />
          <Route path='/categorias/:nomeCategoria' element={<Categoria />} />
          <Route path='/carrinho' element={<Carrinho />} />
          <Route path='/anuncie/:nomeCategoria' element={<Anuncie />} />
          <Route path='/anuncie' element={<Anuncie />} />
          <Route path='pagamento' element={<Pagamento />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
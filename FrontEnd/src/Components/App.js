import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Navbar from './router/Navbar/Navbar';
import Home from './router/Home/Home'
import About from './About/About'
import Register from './User/Register/Register'
import Login from './User/Register/Login'
import { ListUsers } from './User/ListUsers';
import Contact from './Contact/Contact';
import { Account } from './Account/Account'
import WritePost from './PublishNew/WriteNew/WritePost'
import SinglePost from './PublishNew/singlePost/SinglePost';
import WriteEvents from './PublishEvent/WriteEvent/WriteEvents'
import SingleEvents from './PublishEvent/SingleEvents/SingleEvents';
import WriteCirculares from './PublishCirculares/WriteCirculares/WriteCirculares'
import SingleCirculares from './PublishCirculares/SingleCirculares/SingleCirculares'
import FromsPrematricula from './Prematricula/FormsPrematricula/FormsPrematricula'
import { ListPrematricula } from './Prematricula/List/ListPrematricula';
import { Voucher } from './Prematricula/Voucher/Voucher';
import { Consult } from './Prematricula/Voucher/Consult';
import { ListEdit } from './Prematricula/List/ListEdit'
import { ListContacts } from './Contact/ListContacts'
import { ForgotPassword } from './User/Register/ForgotPassword';
//import { ControlAusencias } from './Ausencias/ControlAusencias';
import { UpdateStatus } from './Contact/UpdateStatus';
import { UpdateStatusRol } from './User/UpdateStatusRol';
import { Control } from './Teacher/Control';
import { ListControl } from './Teacher/ListControl';
import { ConsultAttendance } from './Teacher/ConsultAttendance';
import { Error404 } from './router/Error404';
import { Footer } from './footer/Footer';


const App = () => {

  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' component={Home} exact> <Home /> </Route>
          <Route path='/about' component={About} exact> <About /> </Route>
          <Route path='/register' component={Register} exact> <Register /> </Route>
          <Route path='/login' component={Login} exact > <Login /> </Route>
          <Route path='/listUsers' component={ListUsers} exact > <ListUsers /> </Route>
          <Route path='/contact' component={Contact} exact > <Contact /> </Route>
          <Route path='/account' component={Account} exact > <Account /> </Route>
          <Route path='/write' component={WritePost} exact> <WritePost /> </Route>
          <Route path='/post/:id' component={SinglePost} exact > <SinglePost /> </Route>
          <Route path='/events' component={WriteEvents} exact> <WriteEvents /> </Route>
          <Route path='/postEvent/:id' component={SingleEvents} exact> <SingleEvents /> </Route>
          <Route path='/circulares' component={WriteCirculares} exact> <WriteCirculares /> </Route>
          <Route path='/circu/:id' component={SingleCirculares} exact> <SingleCirculares /> </Route>
          <Route path='/prematricula' component={FromsPrematricula} exact > <FromsPrematricula /> </Route>
          <Route path='/listPrematricula' component={ListPrematricula} exact> <ListPrematricula /> </Route>
          <Route path='/listContacts' component={ListContacts} exact> <ListContacts /> </Route>
          <Route path='/listedit/:id' component={ListEdit} exact> <ListEdit /> </Route>
          <Route path='/voucher/:id' component={Voucher} exact> <Voucher /> </Route>
          <Route path='/forgotPassword' component={ForgotPassword} exact> <ForgotPassword /> </Route>
          {/*<Route path='/controlAusencia' component={ControlAusencias} exact> <ControlAusencias /> </Route>*/}
          <Route path='/status/:id' component={UpdateStatus} exact> <UpdateStatus /> </Route>
          <Route path='/statusrol/:id' component={UpdateStatusRol} exact> <UpdateStatusRol /> </Route>
          <Route path='/consultPrematricula' component={Consult} exact> <Consult /> </Route>
          <Route path='/control' component={Control} exact> <Control /> </Route>
          <Route path='/listControl' component={ListControl} exact> <ListControl /> </Route>
          <Route path='*' component={Error404}/>

        </Switch>
        <Footer />
      </Router>
    </>

  );
}

export default App
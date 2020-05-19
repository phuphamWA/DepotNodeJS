import React from 'react';
import Layout from './Layout';
import { Route, Switch } from 'react-router-dom';
import { SignInPage } from './components/SignInPage';
import { Home } from './components/Home'
import { SignUpPage } from './components/SignUpPage';
import { ForgotEmail } from './components/ForgotEmail';
import { ForgotPassword } from './components/ForgotPassword';
import { ManagePage } from './components/ManageUser'
import { Product } from './components/Product';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { SignIn_SignUp } from './components/SignIn_SignUp';
import { BrowsingList } from './components/BrowsingList';
import { Vendors } from './components/Vendors';

export default () => (
    <Layout>
        {/*  <Route render={({ location }) => (
            <TransitionGroup>
                <CSSTransition
                    key={location.key}
                    timeout={500}
                    classNames="item">*/}
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/signin' component={SignInPage} />
                        <Route path='/signuppage' component={SignUpPage} />
                        <Route path='/forgotemail' component={ForgotEmail} />
                        <Route path='/forgotpassword' component={ForgotPassword} />
                        <Route path='/manageuser' component={ManagePage} />
                        <Route path="/products/:idv" component={Vendors} />
                        <Route path='/browsing' component={BrowsingList} />
                        <Route path='/signinpage' component={SignIn_SignUp} />

                        <Route path="/offer/:id" component={Product} />
                    </Switch>
        {/*       </CSSTransition>
            </TransitionGroup>
        )} />*/}

    </Layout>
    );
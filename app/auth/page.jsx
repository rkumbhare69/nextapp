
import SignIn from '../../component/sign-in/sign-in.component';
import SignUp from '../../component/sign-up/sign-up.component';
import style from './page.module.scss';

const UserAuthenticationPage = async () => {

    return (
        <div className={style['auth-page']}>
            <div className={style['auth-container']}>
                <SignIn />
                <SignUp />
            </div>
        </div>
    )
}

export default UserAuthenticationPage;
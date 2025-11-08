import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from '../../app/api/auth/[...nextauth]/route';

import NavLink from '../nav-link/nav-link.component';
import SignOut from '../sign-out/sign-out.component';

import logoImage from '@/assets/logo.png';
import style from './main-header.module.css';

const MainHeader = async () => {
    const session = await getServerSession(authOptions);
    console.log(session ? session : 'no session found');

    return (
        <header className={style.header}>
            <div className={style.logo}>
                <Link href="/">
                    <Image src={logoImage} alt="A plate with food on it" priority />
                </Link>
            </div>

            <nav className={style.nav}>
                <ul>
                    <li><NavLink href='/recipes'>Recipes</NavLink></li>
                    <li><NavLink href='/meals'>Brows Meals</NavLink></li>
                    <li><NavLink href='/community'>foodies Community</NavLink></li>
                    {!session &&
                        <li><NavLink href='/auth'>Sign In</NavLink></li>
                    }
                    {session &&
                        <li><SignOut /></li>
                    }
                </ul>
            </nav>
        </header>
    )
}

export default MainHeader;
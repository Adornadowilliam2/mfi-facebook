import React from 'react'
import { useSelector } from 'react-redux';
import Login from './Login';

export default function Home() {
    const user = useSelector((state) => state.auth.user);
    
    return (
        <>
            {
                user ? (
                    <div>
                        <h1>Home</h1>
                        <div>
                            {user.username}
                        </div>
                    </div>
                ) : (
                    <Login />
                )
            }
        </>
    )
}

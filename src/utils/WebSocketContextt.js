import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import ApiManager from '../ApiManager/ApiManager';
import { useAuth } from '../utils/AuthContext';

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const { user, updateBalance } = useAuth();
    const stompClientRef = useRef(null);
    const [round, setRound] = useState(null);
    const [roundHistory, setRoundHistory] = useState(null);
    const [timeLeft, setTimeLeft] = useState(0);
    const [error, setError] = useState('');
    const [balance, setBalance] = useState();

    useEffect(() => {
        if (balance !== undefined)
            updateBalance(balance);
    }, [balance]);

    const fetchInitialData = async () => {
        try {
            const currRound = await ApiManager.fetchCurrentRound();
            setRound(currRound);
            setTimeLeft(currRound.timeRemaining);

            const history = await ApiManager.fetchRoundHistory();
            setRoundHistory(history);
        } catch (error) {
            setError(error.message);
        }
    };
    useEffect(() => {

        if (user) {

            fetchInitialData();

            const socket = new SockJS('https://colorstake-backend-production.up.railway.app/ws');
            const stompClient = new Client({
                webSocketFactory: () => socket,
                reconnectDelay: 5000,
                // debug: (str) => console.log(str),
                onConnect: () => {

                    stompClient.subscribe('/topic/newRound', (response) => {
                        const newRound = JSON.parse(response.body);
                        setRound(newRound);
                        setTimeLeft(newRound.timeRemaining);
                    });

                    stompClient.subscribe('/topic/lockRound', (response) => {
                        const lockedRound = JSON.parse(response.body);
                        setRound(lockedRound);
                        setTimeLeft(lockedRound.timeRemaining);
                    });

                    stompClient.subscribe('/topic/latestRounds', (response) => {
                        setRoundHistory(JSON.parse(response.body));
                    });

                    if (user?.id) {
                        stompClient.subscribe(`/topic/balance-update/${user.id}`, (response) => {
                            setBalance(JSON.parse(response.body));
                        });
                    }
                },
                onStompError: (frame) => {
                    console.error('WebSocket Error:', frame.body);
                },
            })


            stompClient.activate();
            stompClientRef.current = stompClient;

            return () => {
                stompClient.deactivate();
            };
        }
    }, [user]);


    return (
        <WebSocketContext.Provider value={{ round, roundHistory, timeLeft, error, setError, fetchInitialData }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => useContext(WebSocketContext);

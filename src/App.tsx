import React, { useState, useEffect } from 'react';
import './App.css';
import styled from 'styled-components';
import initialLists from './initial-data.json';
import useLocalStorage from 'react-use-localstorage';
import { BiReset } from 'react-icons/bi';

import { Random } from './Random';
import { ListView } from './ListView';
import { Button } from './Button';

const Header = styled.header`
    display: flex;
    justify-content: center;
    background: rgb(10, 10, 40);
`;

const Headline = styled.h1`
    font-size: 120%;
    text-align: center;
`;

const Name = styled.p`
    font-size: 200%;
    text-align: center;
`;

const array_pick = (items: string[]) => items[Math.floor(Math.random() * items.length)];

const mc = () => (Math.floor(Math.random() * 10) === 0 ? 'Mc' : '');

const App = (): JSX.Element => {
    const [jsonlists, setLists] = useLocalStorage('lists', JSON.stringify(initialLists));
    const lists = JSON.parse(jsonlists);
    const reset = () => setLists(JSON.stringify(initialLists));

    const [name, setName] = useState({
        first: array_pick(lists[0]),
        last: `${array_pick(lists[1])}${array_pick(lists[2])}`,
    });

    const newName = () => {
        setName({
            first: array_pick(lists[0]),
            last: `${mc()}${array_pick(lists[1])}${array_pick(lists[2])}`,
        });
    };

    useEffect(() => {
        newName();
    }, [jsonlists]);

    return (
        <>
            <Header>
                <Headline>Mr. Playstation&lsquo;s Name Generator</Headline>
                <Random onClick={newName}></Random>
                <Button onClick={reset}>
                    <BiReset />
                </Button>
            </Header>
            <main>
                <Name>
                    {name.first} {name.last}
                </Name>

                <ListView lists={lists} setLists={setLists} />
            </main>
        </>
    );
};

export default App;

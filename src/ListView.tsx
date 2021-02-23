import React from 'react';
import styled from 'styled-components';
import ContentEditable from 'react-contenteditable';

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    max-width: 30em;
    margin: auto;
    background: black;
    gap: 1ex;

    div {
        padding: 1ex;
        border: 0;
        background-color: rgb(10, 10, 40);
        color: white;
        white-space: pre;
    }

    div div {
        margin: 0;
        padding: 0;
    }
`;

const List = ({
    list,
    index,
    setList,
}: {
    list: string[];
    index: number;
    setList: (newValue: string, index: number) => void;
}): JSX.Element => {
    const handleChange = (event: { target: { value: string } }) => {
        const { value } = event.target;
        setList(value, index);
    };
    return (
        <ContentEditable
            // innerRef={this.contentEditable}
            html={list.join('\n')}
            onChange={handleChange} // handle innerHTML change
        />
    );
};

export const ListView = ({ lists, setLists }: { lists: string[][]; setLists: (s: string) => void }): JSX.Element => {
    const setList = (value: string, index: number) => {
        const clean = value.replace(/<br[^>]*>/g, '\n').replace(/<\/?div[^>]*>/g, '\n');
        const newLists = [...lists];
        newLists[index] = clean
            .split('\n')
            .map((x) => x.trim())
            .filter((x) => !x.match(/^\s*$/));
        setLists(JSON.stringify(newLists));
    };

    return (
        <Container>
            {lists.map((list, index) => (
                <List list={list} index={index} key={index} setList={setList} />
            ))}
        </Container>
    );
};

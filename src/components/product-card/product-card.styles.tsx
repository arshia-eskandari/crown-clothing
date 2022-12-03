import styled from 'styled-components';
import Button from '../button/button.component';

export const SizeBtn = styled(Button)`
    width: 10px;
    min-width: 40px;
`;

export const SizeBtnContainer = styled.div`
    display: flex;
`;

export const ProductCartContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 350px;
    align-items: center;
    position: relative;
    img {
        width: 100%;
        height: 95%;
        object-fit: cover;
        margin-bottom: 5px;
    }
    button {
        width: 80%;
        opacity: 0.7;
        position: absolute;
        top: 255px;
        display: none;
    }
    ${SizeBtnContainer} {
        width: 80%;
        opacity: 0.7;
        position: absolute;
        top: 20px;
        display: none;

        ${SizeBtn} {
            opacity: 0.7;
            position: relative;
            top: 0;
        }
    }
    &:hover {
        img {
            opacity: 0.8;
        }
        button,
        ${SizeBtnContainer} {
            opacity: 0.9;
            display: flex;
        }
    }

    @media screen and (max-width: 800px) {
        img {
            opacity: 1;
        }
        &:hover {
            img {
                opacity: 1;
            }
        }
        width: 40vw;
        ${SizeBtnContainer}, ${SizeBtn} {
            opacity: 0.9;
            display: block;
        }
        &:hover {
            ${SizeBtnContainer} {
                display: block;
            }
        }
        ${SizeBtn} {
            max-width: 50px;
        }
        button {
            display: block;
            opacity: 0.9;
            min-width: unset;
            padding: 0 10px;
            &:hover {
                img {
                    opacity: unset;
                }
                button,
                ${SizeBtnContainer} {
                    opacity: unset;
                }
            }
        }
    }

    @media screen and (max-width: 400px) {
        width: 80vw;
        margin: auto;
    }
`;

export const Footer = styled.div`
    width: 100%;
    height: 5%;
    display: flex;
    justify-content: space-between;
    font-size: 18px;
`;

export const Name = styled.span`
    width: 90%;
    margin-bottom: 15px;
`;

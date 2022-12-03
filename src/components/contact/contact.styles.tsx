import styled from 'styled-components';

export const ContactContainer = styled.div`
    text-align: center;
`;

type BackgroundImageProps = {
    imageUrl: string;
};

export const BackgroundImage = styled.div<BackgroundImageProps>`
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-image: ${({ imageUrl }) => `url(${imageUrl})`};
`;

export const Body = styled.div`
    height: 300px;
    width: 500px;
    padding: 0 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    background-color: white;
    opacity: 0.9;
    position: absolute;
    h2 {
        font-weight: bold;
        margin: 0 6px 0;
        font-size: 22px;
        color: black;
        text-transform: uppercase;
    }
    p {
        font-weight: lighter;
        font-size: 16px;
    }

    @media screen and (max-width: 800px) {
        width: 340px;
        height: 375px
    }
`;

export const StyledAnchorTag = styled.a`
    border-bottom: 2px solid black !important;
`;

export const DescContainer = styled.div`
    min-width: 30%;
    height: 340px;
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    margin: 0 7.5px 15px;
    overflow: hidden;
    p {
        font-weight: bold;
    }
    &:hover {
        cursor: pointer;
        & ${BackgroundImage} {
            transform: scale(1.1);
            transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
        }
        & ${Body} {
            opacity: 0.9;
        }
    }
    &:first-child {
        margin-right: 7.5px;
    }
    &:last-child {
        margin-left: 7.5px;
    }

    @media screen and (max-width: 800px) {
        height: 500px;
    }
`;
